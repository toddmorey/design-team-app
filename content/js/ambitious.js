// Open Right Panel Function
function openRightPanel() {
  if ($('.right-details-panel').hasClass('show')) {
    
  } else {
    $('.right-details-panel').addClass('show')
    $('.center-panel-wrapper').addClass('open')
    $('.add-new-section').addClass('open')
    $('.content-wrapper').addClass('noscroll');
    $('.mobile-nav-wrapper').addClass('hide');
  }
}

function switchTabs() {
  $('#right-details-tabs .tabs').not(this).closest('#right-details-tabs .tabs').removeClass('active')
  $('.right-panel-tab-content .tab-pane').not(this).closest('.right-panel-tab-content .tab-pane').removeClass('active').removeClass('in')
}

// Close Right Panel Function
function closeRightPanel() {
  $('.center-panel-wrapper').removeClass('open')
  $('section').removeClass('active')
  $('.right-details-panel').removeClass('show')
  $('.add-new-section').removeClass('open')
  $('.content-wrapper').removeClass('noscroll');
  $('.mobile-nav-wrapper').removeClass('hide');
}

// Trigger close right panel
$('#close-right-panel').click(function (e) {
  e.preventDefault();
  closeRightPanel();
});

// Open Comments Panel
$('.section-comment').click(function (e) {
  e.preventDefault();
  openRightPanel();
  switchTabs();
  $('#right-details-tabs .comments-tab').addClass('active');
  $('.right-panel-tab-content .comments-tab-pane').addClass('active').addClass('in');
  $('section').not(this).closest('section').removeClass('active')
  $(this).closest('section').addClass('active')
});

// Toggle New item mid section
$('.add-item-mid').click(function(e) {
  e.preventDefault();
  var parent = $(this).closest('.new-item-wrapper');
  if ($(".new-item-section",parent).hasClass('active')) { 
    $(this).removeClass('active');
    $(".new-item-section",parent).removeClass('active');
    $('.provide-btn',parent).removeClass('active');
    $('.add-item-hidden',parent).removeClass('show')

  } else {
    $(this).addClass('active');
    $(".new-item-section",parent).addClass('active');
    $('.new-item-input',parent).focus();
  }
});

// Open Actions Panel
// $('.edit-item-icon').click(function (e) {
//   e.preventDefault();
//   openRightPanel();
//   switchTabs();
//   $('#right-details-tabs .actions-tab').addClass('active');
//   $('.right-panel-tab-content .actions-tab-pane').addClass('active').addClass('in');
//   $('section').not(this).closest('section').removeClass('active')
//   $(this).closest('section').addClass('active');
// });


// Right Details Tabs
$('#right-details-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

// New Item Tabs
$('#new-item-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

// Prevent page scrolling when in right panel
$('.show-comments-wrapper').on('DOMMouseScroll mousewheel', function(ev) {
    var $this = $(this),
        scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = $this.height(),
        delta = (ev.type == 'DOMMouseScroll' ?
            ev.originalEvent.detail * -40 :
            ev.originalEvent.wheelDelta),
        up = delta > 0;

    var prevent = function() {
        ev.stopPropagation();
        ev.preventDefault();
        ev.returnValue = false;
        return false;
    }
    
    if (!up && -delta > scrollHeight - height - scrollTop) {
        // Scrolling down, but this will take us past the bottom.
        $this.scrollTop(scrollHeight);
        return prevent();
    } else if (up && delta > scrollTop) {
        // Scrolling up, but this will take us past the top.
        $this.scrollTop(0);
        return prevent();
    }
});

// Disable hover states on touch devices
function removeHoverCSSRule() {
  if ('createTouch' in document) {
    try {
      var ignore = /:hover/;
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (!sheet.cssRules) {
          continue;
        }
        for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
          var rule = sheet.cssRules[j];
          if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
            sheet.deleteRule(j);
          }
        }
      }
    }
    catch(e) {
    }
  }
}

// Dropdowns
$('.dropdown-toggle').dropdown()

// Tooltips enabled, not on mobile
 if(!('ontouchstart' in window)) {
  $('[data-toggle="tooltip"]').tooltip({
    delay: { "show": 1000 }
  })
 }


// Datepicker
$(".date-picker").datepicker();

$(".date-picker").on("change", function () {
    var id = $(this).attr("id");
    var val = $("label[for='" + id + "']").text();
    $("#msg").text(val + " changed");
});

// Toggle mobile nav
$('#mobile-nav').click(function (e) {
  e.preventDefault()
  if ($(".sidebar").hasClass('show')) {
    $(".sidebar").removeClass('show');
    $('.mobile-nav-wrapper .login-wrapper').show();
  } else {
    $(".sidebar").addClass('show');
    $('.mobile-nav-wrapper .login-wrapper').hide();
  }
});

// Hide mobile nav when profile avatar is clicked
$('#profile-avatar').click(function (e) {
  e.preventDefault()
  $(".sidebar").removeClass('show');
});

// More details on New Project form
$('#show-more-details').click(function () {
	$('#submit-new-hidden-fields').toggleClass('opened');
});

// Show "That's all we need" instructions when you type in textarea on new proejct form
function newProjectInstructions() {
	if (!$("#projectNotes").val()) {
	    $('#more-details-wrapper').hide();
	} else {
		$('#more-details-wrapper').show().addClass('slideInUp');
	}
};
$('#projectNotes').keyup(function(){
  newProjectInstructions()
});

// Close Add New Items modal
$('#close-newItems').click(function(e) {
  e.preventDefault();
  $('#newItemModal').modal('hide');
  $('.provide-btn').removeClass('active');
  $('.add-item-hidden').removeClass('show')
});

// Show Add Item inputs
$('.provide-text').click(function (e) {
  console.log('clicked');
  e.preventDefault()
  $('.add-item-hidden').not(this).closest('.add-item-hidden').removeClass('show')
  $('.provide-btn').not(this).closest('.provide-btn').removeClass('active')
  $(".provide-text-input").addClass('show');
  $(this).addClass('active');
});
$('.provide-image').click(function (e) {
  e.preventDefault()
  $('.add-item-hidden').not(this).closest('.add-item-hidden').removeClass('show')
  $('.provide-btn').not(this).closest('.provide-btn').removeClass('active')
  $(".provide-image-input").addClass('show');
  $(this).addClass('active');
});
$('.provide-file').click(function (e) {
  e.preventDefault()
  $('.add-item-hidden').not(this).closest('.add-item-hidden').removeClass('show')
  $('.provide-btn').not(this).closest('.provide-btn').removeClass('active')
  $(".provide-file-input").addClass('show');
  $(this).addClass('active');
});