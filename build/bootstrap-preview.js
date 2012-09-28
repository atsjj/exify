/* ==========================================================
 * bootstrap-preview.js v0.0.1
 * http://summit.com
 * ==========================================================
 * Copyright 2012 Summit Electric Supply
 * ========================================================== */

!function ($) {

  "use strict"; // jshint ;_;

  /* PREVIEW CLASS DEFINITION
   * ======================== */

  var Filepreview = function (file, options) {
    this.$file = $(file)
    this.$preview = $(options.preview)

    this.options = options
    this.options.open && this.open()
    
    this.$file.on('change', $.proxy(this.read, this))
  }

  Filepreview.prototype = {
    open: function () {
      this.$file.click()
    },

    read: function (e) {
      var stream = new FileReader()
        , $preview = this.$preview
        , file = e.currentTarget.files[0]
        
      if (!file.type.match('image.*')) return this

      stream.onload = (function (f) {
        return function (e) {
          $preview.attr('src', e.target.result)
        }
      })(file)

      stream.readAsDataURL(file)
    }
  }

  /* PREVIEW PLUGIN DEFINITION
   * ========================= */

  $.fn.filepreview = function (option) {
    return this.each(function () {
      var $file = $(this)
        , data = $file.data('file-preview')
        , options = $.extend({}, $.fn.filepreview.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.file
        
      if (!data) $file.data('file-preview', (data = new Filepreview(this, options)))
      if (action) data[action]()
    })
  }

  $.fn.filepreview.Constructor = Filepreview

  $.fn.filepreview.defaults = {
    file: null,
    preview: null
  }

  /* PREVIEW DATA-API
   * ================ */
   
  $(function () {
    $('body').on('.filepreview.data-api', '[data-preview]', function (e) {
      var $file = $(this).filepreview()
        , $preview = $($file.attr('data-preview'))
        , options = $.extend({}, $file.data(), $preview.data(), { preview: $preview })
        
        $file.filepreview(options)
        e.preventDefault()
    })
    
    $('body').on('click.filepreview.data-api', '[data-file]', function (e) {
      var $button = $(this), targetID
          , $file = $($button.attr('data-target') || (targetID = $button.attr('href')) && targetID.replace(/.*(?=#[^\s]+$)/, ''))
          , $preview = $($file.attr('data-preview'))
          , options = $.extend({}, $file.data(), $button.data(), { preview: $preview })
        
        $file.filepreview(options)
        e.preventDefault()
    })
  })
}(window.jQuery);
