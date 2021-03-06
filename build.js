(function() {
  var Exify, ExifyArray, Table,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Exify = (function() {

    Exify.debug = false;

    function Exify(options) {
      this.options = options;
    }

    return Exify;

  })();

  Table = (function(_super) {

    __extends(Table, _super);

    function Table(table) {
      this.table = table;
    }

    Table.prototype.lookup = function(key) {
      if (!this.table[key]) {
        this.table[key];
      }
      if (Table.__super__.lookup.apply(this, arguments).debug) {
        return console.log("No such record, " + key);
      }
    };

    return Table;

  })(Exify);

  ExifyArray = (function() {

    function ExifyArray(buffer) {
      this["x"] = __bind(this["x"], this);

      this["X"] = __bind(this["X"], this);

      this["@"] = __bind(this["@"], this);

      this["Q"] = __bind(this["Q"], this);

      this["L"] = __bind(this["L"], this);

      this["S"] = __bind(this["S"], this);

      this["C"] = __bind(this["C"], this);
      this.parameter = /([CSLQXx\@])([0-9]{0,})/g;
      this.buffer = buffer || new Uint8Array();
    }

    ExifyArray.prototype.pack = function(templateString) {
      var branch, data, dir, length, node, template, tree;
      if (templateString == null) {
        templateString = "";
      }
      if (!this.parameter.test(templateString)) {
        return false;
      }
      this.cursor = 0;
      data = dir = tree = [];
      tree = templateString.match(this.parameter);
      dir = (function() {
        var _results;
        _results = [];
        for (branch in tree) {
          _results.push((function() {
            var _results1;
            _results1 = [];
            for (node in tree[branch].match(this.parameter)) {
              _results1.push([tree[branch], node]);
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }).call(this);
      data = (function() {
        var _i, _len, _results;
        _results = [];
        for (length = _i = 0, _len = dir.length; _i < _len; length = ++_i) {
          template = dir[length];
          console.log(template, length);
          if (this[template] != null) {
            _results.push(this[template](length));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }).call(this);
      return data;
    };

    ExifyArray.prototype["C"] = function() {
      var cursor;
      cursor = this.cursor;
      this.cursor++;
      console.log(this.buffer[cursor]);
      return this.buffer[cursor];
    };

    ExifyArray.prototype["S"] = function() {
      var cursor, short;
      cursor = this.cursor;
      this.cursor++;
      short = (this.buffer[cursor] << 8) + this.buffer[cursor++];
      if (int < 0) {
        short += 65536;
      }
      return short;
    };

    ExifyArray.prototype["L"] = function() {};

    ExifyArray.prototype["Q"] = function() {};

    ExifyArray.prototype["@"] = function(cursor) {
      this.cursor = cursor != null ? cursor : 0;
    };

    ExifyArray.prototype["X"] = function(cursor) {
      if (cursor == null) {
        cursor = 1;
      }
      return this.cursor += cursor;
    };

    ExifyArray.prototype["x"] = function(cursor) {
      if (cursor == null) {
        cursor = 1;
      }
      return this.cursor -= cursor;
    };

    return ExifyArray;

  })();

  window.ExifyArray = ExifyArray;

  new Table('gps', {
    0x0000: "gps_version_id",
    0x0001: "gps_latitude_ref",
    0x0002: "gps_latitude",
    0x0003: "gps_longitude_ref",
    0x0004: "gps_longitude",
    0x0005: "gps_altitude_ref",
    0x0006: "gps_altitude",
    0x0007: "gps_timestamp",
    0x0008: "gps_satellites",
    0x0009: "gps_status",
    0x000a: "gps_measure_mode",
    0x000b: "gps_dop",
    0x000C: "gps_speed_ref",
    0x000D: "gps_speed",
    0x000E: "gps_track_ref",
    0x000F: "gps_track",
    0x0010: "gps_img_direction_ref",
    0x0011: "gps_img_direction",
    0x0012: "gps_map_datum",
    0x0013: "gps_dest_latitude_ref",
    0x0014: "gps_dest_latitude",
    0x0015: "gps_dest_longitude_ref",
    0x0016: "gps_dest_longitude",
    0x0017: "gps_dest_bearing_ref",
    0x0018: "gps_dest_bearing",
    0x0019: "gps_dest_distance_ref",
    0x001a: "gps_dest_distance",
    0x001b: "gps_processing_method",
    0x001C: "gps_area_information",
    0x001D: "gps_date_stamp",
    0x001E: "gps_differential"
  });

  new Table('jpeg', {
    0x0100: "image_width",
    0x0101: "image_height",
    0x8769: "ExifIFDPointer",
    0x8825: "GPSInfoIFDPointer",
    0xA005: "InteroperabilityIFDPointer",
    0x0102: "bits_per_sample",
    0x0103: "compression",
    0x0106: "photometric_interpretation",
    0x0112: "orientation",
    0x0115: "samples_per_pixel",
    0x011C: "planar_configuration",
    0x0212: "ycb_cr_sub_sampling",
    0x0213: "ycb_cr_positioning",
    0x011A: "x_resolution",
    0x011B: "y_resolution",
    0x0128: "resolution_unit",
    0x0111: "strip_offsets",
    0x0116: "rows_per_strip",
    0x0117: "strip_byte_counts",
    0x0201: "jpeg_interchange_format",
    0x0202: "jpeg_interchange_format_length",
    0x012D: "transfer_function",
    0x013E: "white_point",
    0x013F: "primary_chromaticities",
    0x0211: "ycb_cr_coefficients",
    0x0214: "reference_black_white",
    0x0132: "date_time",
    0x010E: "image_description",
    0x010F: "make",
    0x0110: "model",
    0x0131: "software",
    0x013B: "artist",
    0x8298: "copyright"
  });

  new Table('tiff', {
    0x9000: "exif_version",
    0xA000: "flashpix_version",
    0xA001: "color_space",
    0xA002: "pixel_x_dimension",
    0xA003: "pixel_y_dimension",
    0x9101: "components_configuration",
    0x9102: "compressed_bits_per_pixel",
    0x927c: "maker_note",
    0x9286: "user_comment",
    0xA004: "related_sound_file",
    0x9003: "date_time_original",
    0x9004: "date_time_digitized",
    0x9290: "subsec_time",
    0x9291: "subsec_time_original",
    0x9292: "subsec_time_digitized",
    0x829a: "exposure_time",
    0x829d: "f_number",
    0x8822: "exposure_program",
    0x8824: "spectral_sensitivity",
    0x8827: "iso_speed_ratings",
    0x8828: "oecf",
    0x9201: "shutter_speed_value",
    0x9202: "aperture_value",
    0x9203: "brightness_value",
    0x9204: "exposure_bias",
    0x9205: "max_aperture_value",
    0x9206: "subject_distance",
    0x9207: "metering_mode",
    0x9208: "light_source",
    0x9209: "flash",
    0x9214: "subject_area",
    0x920a: "focal_length",
    0xA20b: "flash_energy",
    0xA20c: "spatial_frequency_response",
    0xA20e: "focal_plane_x_resolution",
    0xA20f: "focal_plane_y_resolution",
    0xA210: "focal_plane_resolutionunit",
    0xA214: "subject_location",
    0xA215: "exposure_index",
    0xA217: "sensing_method",
    0xA300: "file_source",
    0xA301: "scene_type",
    0xA302: "cfa_pattern",
    0xA401: "custom_rendered",
    0xA402: "exposure_mode",
    0xA403: "white_balance",
    0xA404: "digital_zoom_ration",
    0xA405: "focal_length_in_35mm_film",
    0xA406: "scene_capture_type",
    0xA407: "gain_control",
    0xA408: "contrast",
    0xA409: "saturation",
    0xA40a: "sharpness",
    0xA40b: "device_setting_description",
    0xA40c: "subject_distance_range",
    0xA005: "interoperability_ifd_pointer",
    0xA420: "image_unique_id"
  });

}).call(this);
