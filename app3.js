var APIurl = 'https://randomuser.me/api/?results=12'; // API to fetch

$.ajax( APIurl, {
  success: function(data){
    var gallery = $('#gallery');   // select gallery div
    let index = 0;  // counter for id attribute and array index

    // build HTML to insert in
    var userHTML = "";
    $.each(data.results, function(i, user){
      userHTML += '<div class="card" id="' + index + '"><div class="card-img-container">';
      userHTML += '<img class="card-img" src="' + user.picture.large + '" alt="profile picture">';
      userHTML += '</div>';
      userHTML += '<div class="card-info-container">';
      userHTML += '<h3 id="name" class="card-name cap">' + user.name.first + '</h3>';
      userHTML += '<p class="card-text">' + user.email + '</p>';
      userHTML += '<p class="card-text">' + user.location.city + ' ' + user.location.state + '</p>';
      userHTML += '</div>';
      userHTML += '</div>';
      index += 1;
      $('#gallery').html(userHTML);  // append to gallery div
    });

  gallery.on('click', function(e){
    const userID = e.target.parentNode.parentNode.id;
    // check if target is the picture or name
    if (e.target.className === 'card-img' || e.target.id === 'name'){
        // build HTML for Modal window
        var modalString = "";
        modalString += '<div class="modal-container"><div class="modal"><button type="button" id="modal-close-button" class="modal-close-btn"><strong>X</strong></button>';
        modalString += '<div class="modal-info-container" id="' + index + '">';
        modalString += '<img class="modal-img" src="' + data.results[userID].picture.large + '" alt="profile picture">';
        modalString += '<h3 id="name" class="modal-name cap">' + data.results[userID].name.first + '</h3>';
        modalString += '<p class="modal-text">' + data.results[userID].email + '</p>';
        modalString += '<p class="modal-text">' + data.results[userID].location.city + '</p><hr>';
        modalString += '<p class="modal-text">' + data.results[userID].phone + '</p>';
        modalString += '<p class="modal-text">' + data.results[userID].location.street + ' ' + data.results[userID].location.city + data.results[userID].location.state + data.results[userID].location.postcode + '</p>';
        modalString += '<p class="modal-text">' + data.results[userID].dob.date + '</p>';
        modalString += '</div></div></div>';
    }
      $('body').append(modalString);   // append modal to body
        let x = document.getElementById('modal-close-button');   // close button
      x.addEventListener('click', function(e){
        $('.modal-container').remove();  // remove modal div upon click

      });

  });
  } // end success
});
