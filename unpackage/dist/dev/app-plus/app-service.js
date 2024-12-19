if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const pages = [
    {
      path: "pages/Mock/Mock",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/Home/Home",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/TradingMarkets/TradingMarkets",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/Mine/Mine",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/Ground/Ground",
      style: {
        navigationStyle: "custom"
      }
    }
  ];
  const globalStyle = {};
  const uniIdRouter = {};
  const e = {
    pages,
    globalStyle,
    uniIdRouter
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, l2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, h2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = l2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += i3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(h3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = h2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], A2 = e4[t4 + 14], C2 = e4[t4 + 15], P2 = i3[0], T2 = i3[1], x2 = i3[2], O2 = i3[3];
        P2 = u2(P2, T2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, T2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, T2, p2, 17, a2[2]), T2 = u2(T2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, T2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, T2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, T2, y2, 17, a2[6]), T2 = u2(T2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, T2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, T2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, T2, I2, 17, a2[10]), T2 = u2(T2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, T2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, T2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, T2, A2, 17, a2[14]), P2 = l2(P2, T2 = u2(T2, x2, O2, P2, C2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = l2(O2, P2, T2, x2, y2, 9, a2[17]), x2 = l2(x2, O2, P2, T2, S2, 14, a2[18]), T2 = l2(T2, x2, O2, P2, o3, 20, a2[19]), P2 = l2(P2, T2, x2, O2, m2, 5, a2[20]), O2 = l2(O2, P2, T2, x2, I2, 9, a2[21]), x2 = l2(x2, O2, P2, T2, C2, 14, a2[22]), T2 = l2(T2, x2, O2, P2, g2, 20, a2[23]), P2 = l2(P2, T2, x2, O2, v2, 5, a2[24]), O2 = l2(O2, P2, T2, x2, A2, 9, a2[25]), x2 = l2(x2, O2, P2, T2, f2, 14, a2[26]), T2 = l2(T2, x2, O2, P2, w2, 20, a2[27]), P2 = l2(P2, T2, x2, O2, k2, 5, a2[28]), O2 = l2(O2, P2, T2, x2, p2, 9, a2[29]), x2 = l2(x2, O2, P2, T2, _2, 14, a2[30]), P2 = h2(P2, T2 = l2(T2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = h2(O2, P2, T2, x2, w2, 11, a2[33]), x2 = h2(x2, O2, P2, T2, S2, 16, a2[34]), T2 = h2(T2, x2, O2, P2, A2, 23, a2[35]), P2 = h2(P2, T2, x2, O2, c3, 4, a2[36]), O2 = h2(O2, P2, T2, x2, g2, 11, a2[37]), x2 = h2(x2, O2, P2, T2, _2, 16, a2[38]), T2 = h2(T2, x2, O2, P2, I2, 23, a2[39]), P2 = h2(P2, T2, x2, O2, k2, 4, a2[40]), O2 = h2(O2, P2, T2, x2, o3, 11, a2[41]), x2 = h2(x2, O2, P2, T2, f2, 16, a2[42]), T2 = h2(T2, x2, O2, P2, y2, 23, a2[43]), P2 = h2(P2, T2, x2, O2, v2, 4, a2[44]), O2 = h2(O2, P2, T2, x2, b2, 11, a2[45]), x2 = h2(x2, O2, P2, T2, C2, 16, a2[46]), P2 = d2(P2, T2 = h2(T2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, T2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, T2, A2, 15, a2[50]), T2 = d2(T2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, T2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, T2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, T2, I2, 15, a2[54]), T2 = d2(T2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, T2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, T2, x2, C2, 10, a2[57]), x2 = d2(x2, O2, P2, T2, y2, 15, a2[58]), T2 = d2(T2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, T2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, T2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, T2, p2, 15, a2[62]), T2 = d2(T2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + T2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", l = "CLIENT_DB", h = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== h;
      }
    }
    exec() {
      return this.needRetry ? (this.status = h, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", A = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), C = b, P = I('{\n    "address": [\n        "127.0.0.1",\n        "2.0.0.1",\n        "169.254.37.199",\n        "192.168.137.1",\n        "192.168.65.1",\n        "192.168.1.31"\n    ],\n    "debugPort": 9001,\n    "initialLaunchType": "local",\n    "servePort": 7001,\n    "skipFiles": [\n        "<node_internals>/**",\n        "D:/HBuilderX/HBuilderX/plugins/unicloud/**/*.js"\n    ]\n}\n'), T = I('[{"provider":"aliyun","spaceName":"fun-cloud-city-game","spaceId":"mp-4de62d5a-2380-467f-b109-457713276d05","clientSecret":"ZD2WgXn3K1WSmV78nmjvUQ==","endpoint":"https://api.next.bspapp.com"}]') || [];
  let O = "";
  try {
    O = "__UNI__1B67F5F";
  } catch (e2) {
  }
  let E = {};
  function L(e2, t2 = {}) {
    var n2, s2;
    return n2 = E, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e2] = t2), E[e2];
  }
  E = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
  function N(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = U[e3][t3];
        s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function D(e2, t2) {
    U[e2] || (U[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = U[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete U[e2];
  }
  function M(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function q(e2, t2) {
    return U[e2] && U[e2][t2] || [];
  }
  function F(e2) {
    N("callObject", e2);
  }
  const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", J = "cloudobject";
  function z(e2) {
    return K[e2] || (K[e2] = []), K[e2];
  }
  function V(e2, t2) {
    const n2 = z(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function G(e2, t2) {
    const n2 = z(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Y(e2, t2) {
    const n2 = z(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Q, X = false;
  function Z() {
    return Q || (Q = new Promise((e2) => {
      X && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (X = true, e2());
        }
        X || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Q);
  }
  function ee(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class te extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var ne = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
  function se(e2) {
    return e2 && se(e2.__v_raw) || e2;
  }
  function re() {
    return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
  }
  function ie({ token: e2, tokenExpired: t2 } = {}) {
    e2 && ne.setStorageSync("uni_id_token", e2), t2 && ne.setStorageSync("uni_id_token_expired", t2);
  }
  let oe, ae;
  function ce() {
    return oe || (oe = uni.getSystemInfoSync()), oe;
  }
  function ue() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  let le = {};
  function he() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ae)
      return { ...le, ...ae, locale: e2, LOCALE: e2 };
    const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
    for (const e3 in t2)
      Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
    return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...le, ...ae, locale: e2, LOCALE: e2 };
  }
  var de = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new te({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var pe = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return de.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: l2, signature: h2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: l2, Signature: h2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = de.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var fe = { init(e2) {
    const t2 = new pe(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ge = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var me;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(me || (me = {}));
  var ye = function() {
  }, _e = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], l2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], l3 = n3[5], h2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & l3 ^ ~a3 & h2) + c2[p2] + u2[p2];
          d2 = h2, h2 = l3, l3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + l3 | 0, n3[6] = n3[6] + h2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(l2), t3.HmacSHA256 = i2._createHmacHelper(l2);
    }(Math), n2.SHA256);
  }), we = _e, ve = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const Ie = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function Se(e2) {
    return void 0 === e2;
  }
  function be(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  var ke;
  function Ae(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(ke || (ke = {}));
  const Ce = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
  class Te extends ye {
    constructor() {
      super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Ce.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Ce.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Ce.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Ce.adapter.root.tcbObject;
    }
  }
  function xe(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Te();
      case "none":
        return new Te();
      default:
        return t2.sessionStorage || new Te();
    }
  }
  class Oe {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Ce.adapter.primaryStorage || e2.persistence, this._storage = xe(this._persistence, Ce.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = xe(e2, Ce.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Pe.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        Se(r2) || be(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Ee = {}, Le = {};
  function Re(e2) {
    return Ee[e2];
  }
  class Ue {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ne extends Ue {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const De = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ne)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new Ue(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function Me(e2, t2) {
    De.on(e2, t2);
  }
  function qe(e2, t2 = {}) {
    De.fire(e2, t2);
  }
  function Fe(e2, t2) {
    De.off(e2, t2);
  }
  const Ke = "loginStateChanged", je = "loginStateExpire", $e = "loginTypeChanged", Be = "anonymousConverted", We = "refreshAccessToken";
  var He;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(He || (He = {}));
  const Je = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ze = { "X-SDK-Version": "1.3.5" };
  function Ve(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function Ge() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...ze, "x-seqid": e2 } };
  }
  class Ye {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Re(this.config.env), this._localCache = (t2 = this.config.env, Le[t2]), Ve(this._reqClass, "post", [Ge]), Ve(this._reqClass, "upload", [Ge]), Ve(this._reqClass, "download", [Ge]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new te({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === He.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          qe(je), this._cache.removeStore(n2);
        }
        throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return qe(We), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new te({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === Je.indexOf(e2)) {
        const { refreshTokenKey: e3 } = this._cache.keys;
        this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(ge, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (p2 += h2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new te({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}, n2 = {}) {
      const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === s2.data.code && -1 === Je.indexOf(e2)) {
        await this.refreshAccessToken();
        const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
        if (s3.data.code)
          throw new te({ code: s3.data.code, message: s3.data.message });
        return s3.data;
      }
      if (s2.data.code)
        throw new te({ code: s2.data.code, message: s2.data.message });
      return s2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const Qe = {};
  function Xe(e2) {
    return Qe[e2];
  }
  class Ze {
    constructor(e2) {
      this.config = e2, this._cache = Re(e2.env), this._request = Xe(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class et {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Re(this._envId), this._request = Xe(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class tt {
    constructor(e2) {
      if (!e2)
        throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Re(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new et(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === He.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === He.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === He.WECHAT || this.loginType === He.WECHAT_OPEN || this.loginType === He.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class nt extends Ze {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), qe(Ke), qe($e, { env: this.config.env, loginType: He.ANONYMOUS, persistence: "local" });
        const e3 = new tt(this.config.env);
        return await e3.user.refresh(), e3;
      }
      throw new te({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), qe(Be, { env: this.config.env }), qe($e, { loginType: He.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new te({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, He.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class st extends Ze {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), qe(Ke), qe($e, { env: this.config.env, loginType: He.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new tt(this.config.env);
      throw new te({ message: "自定义登录失败" });
    }
  }
  class rt extends Ze {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), qe(Ke), qe($e, { env: this.config.env, loginType: He.EMAIL, persistence: this.config.persistence }), new tt(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class it extends Ze {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: He.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), qe(Ke), qe($e, { env: this.config.env, loginType: He.USERNAME, persistence: this.config.persistence }), new tt(this.config.env);
      throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
    }
  }
  class ot {
    constructor(e2) {
      this.config = e2, this._cache = Re(e2.env), this._request = Xe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Me($e, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new nt(this.config);
    }
    customAuthProvider() {
      return new st(this.config);
    }
    emailAuthProvider() {
      return new rt(this.config);
    }
    usernameAuthProvider() {
      return new it(this.config);
    }
    async signInAnonymously() {
      return new nt(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new rt(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new it(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new nt(this.config)), Me(Be, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === He.ANONYMOUS)
        throw new te({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), qe(Ke), qe($e, { env: this.config.env, loginType: He.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      Me(Ke, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      Me(je, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      Me(We, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      Me(Be, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      Me($e, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e2 } = this._cache.keys;
      return this._cache.getStore(e2) ? new tt(this.config.env) : null;
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new st(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const at = function(e2, t2) {
    t2 = t2 || Ie();
    const n2 = Xe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ct = function(e2, t2) {
    t2 = t2 || Ie();
    const n2 = Xe(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ut = function({ fileList: e2 }, t2) {
    if (t2 = t2 || Ie(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return Xe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, lt = function({ fileList: e2 }, t2) {
    t2 = t2 || Ie(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return Xe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ht = async function({ fileID: e2 }, t2) {
    const n2 = (await lt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = Xe(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, dt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
    const a2 = o2 || Ie();
    let c2;
    try {
      c2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
    return Xe(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
      if (e3.code)
        a2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          a2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            a2(new te({ message: "response data must be json" }));
          }
      }
      return a2.promise;
    }).catch((e3) => {
      a2(e3);
    }), a2.promise;
  }, pt = { timeout: 15e3, persistence: "session" }, ft = {};
  class gt {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...pt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new gt(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Ce.adapter.primaryStorage || pt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Ee[t3] = new Oe(e3), Le[t3] = new Oe({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, Qe[n2.env] = new Ye(n2), this.authObj = new ot(this.config), this.authObj;
    }
    on(e2, t2) {
      return Me.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return Fe.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return dt.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return ut.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return lt.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return ht.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return at.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return ct.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      ft[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = ft[e2];
      if (!n2)
        throw new te({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = Ae(e2) || {};
      t2 && (Ce.adapter = t2), n2 && (Ce.runtime = n2);
    }
  }
  var mt = new gt();
  function yt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class _t {
    post(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        ne.request({ url: yt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: yt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const wt = { setItem(e2, t2) {
    ne.setStorageSync(e2, t2);
  }, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
    ne.removeStorageSync(e2);
  }, clear() {
    ne.clearStorageSync();
  } };
  var vt = { genAdapter: function() {
    return { root: {}, reqClass: _t, localStorage: wt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  mt.useAdapters(vt);
  const It = mt, St = It.init;
  It.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = St.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ee(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var bt = It;
  async function kt(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        ne.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function At(e2, t2) {
    let n2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      const r2 = e2[s2];
      if (await kt(r2, t2)) {
        n2 = r2;
        break;
      }
    }
    return { address: n2, port: t2 };
  }
  const Ct = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
  var Pt = class {
    constructor(e2) {
      if (["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), !e2.endpoint)
        throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
      this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = ne;
    }
    async request(e2, t2 = true) {
      const n2 = t2;
      return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : de.wrappedRequest(e2, this.adapter.request));
    }
    requestLocal(e2) {
      return new Promise((t2, n2) => {
        this.adapter.request(Object.assign(e2, { complete(e3) {
          if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
            const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
            return n2(new te({ code: t3, message: s2 }));
          }
          t2({ success: true, result: e3.data });
        } }));
      });
    }
    setupRequest(e2) {
      const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
      n2["x-serverless-sign"] = de.sign(t2, this.config.clientSecret);
      const s2 = he();
      n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
      const { token: r2 } = re();
      return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
    }
    async setupLocalRequest(e2) {
      const t2 = he(), { token: n2 } = re(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await At(r2, i2);
      return { url: `http://${o2}:${i2}/${Ct[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(t2, false);
    }
    getUploadFileOptions(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    reportUploadFile(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
          const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
            e3 && e3.statusCode < 400 ? t4(e3) : r3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
          }, fail(e3) {
            r3(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
          } });
          "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
            s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
          });
        });
      }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(t2).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(n2).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var Tt = { init(e2) {
    const t2 = new Pt(e2), n2 = { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, xt = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Ot() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
      var t2 = 16 * Math.random() | 0;
      return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
    });
  }
  function Et(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = Ot(), l2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), h2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = we(e3.body).toString(xt), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = we(r3).toString(xt), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = ve(o3, e3.secretKey).toString(xt);
      return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
    }({ path: d2, query: p2, method: r2, headers: l2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: h2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, l2, { Authorization: f2 }) };
  }
  function Lt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
    return new Promise((i2, o2) => {
      ne.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return o2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Rt(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Et(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return Lt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function Ut(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function Nt(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  class Dt {
    constructor(e2) {
      this.config = e2;
    }
    signedURL(e2, t2 = {}) {
      const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Ot(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
        return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
      }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", we(i2).toString(xt)].join("\n"), a2 = ve(o2, this.config.secretKey).toString(xt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
      return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
    }
  }
  var Mt = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new Dt(this.config);
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
        r2 && (a2["x-function-invoke-type"] = "async");
        const { url: c2, headers: u2 } = Et("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return Lt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
          let t3 = 0;
          if (r2) {
            const n3 = e4.data || {};
            t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
          }
          if (0 !== t3)
            throw new te({ code: t3, message: e4.errMsg, requestId: e4.requestId });
          return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
        }).catch((e4) => {
          throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Rt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e2.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
        const s2 = [];
        for (const t3 of e2) {
          "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
          const e3 = Ut.call(this, t3);
          s2.push({ file_id: e3, expire: 600 });
        }
        Rt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: Nt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
    async connectWebSocket(e2) {
      const { name: t2, query: n2 } = e2;
      return ne.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
      } });
    }
  };
  var qt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Mt(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Ft({ data: e2 }) {
    let t2;
    t2 = he();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = re();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Kt(e2 = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
    return new Promise((t3, n3) => {
      ne.request({ method: "POST", url: i2, data: { name: e2.name, platform: C, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: t3, message: n3 }) => {
      if (0 !== t3) {
        switch (t3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR":
            console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
            break;
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction(e2);
      }
      return new Promise((t4, n4) => {
        const r3 = Ft.call(this, { data: e2.data });
        ne.request({ method: "POST", url: o2, data: { provider: s2, platform: C, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new te({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
          n4(new te({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const jt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var $t = /[\\^$.*+?()[\]{}|]/g, Bt = RegExp($t.source);
  function Wt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Bt.test(s2) ? s2.replace($t, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Jt = "request", zt = "response", Vt = "both";
  const En = { code: 2e4, message: "System error" }, Ln = { code: 20101, message: "Invalid client" };
  function Nn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || En.code, message: r2 || o2, cause: a2 });
  }
  let Mn;
  function $n({ secretType: e2 } = {}) {
    return e2 === Jt || e2 === zt || e2 === Vt;
  }
  function Bn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function Wn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = A;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const l2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!l2)
      return false;
    if ((c2[l2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), Nn(Ln);
  }
  function Hn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Jn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ft.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = $n(n3), o2 = Bn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Hn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Hn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = Wt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = Wt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: jt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && T ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Kt), o2 = Kt) : o2 = n2, o2 = o2.bind(e2), Bn(t3))
        a2 = n2.call(e2, t3);
      else if ($n(t3)) {
        a2 = new Mn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (Wn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new Mn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
    };
  }
  Mn = class {
    constructor() {
      throw Nn({ message: `Platform ${C} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const zn = Symbol("CLIENT_DB_INTERNAL");
  function Vn(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function Gn(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const Yn = ["db.Geo", "db.command", "command.aggregate"];
  function Qn(e2, t2) {
    return Yn.indexOf(`${e2}.${t2}`) > -1;
  }
  function Xn(e2) {
    switch (f(e2 = se(e2))) {
      case "array":
        return e2.map((e3) => Xn(e3));
      case "object":
        return e2._internalType === zn || Object.keys(e2).forEach((t2) => {
          e2[t2] = Xn(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function Zn(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class es {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: Xn(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Zn(e2), n2 = Zn(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === Zn(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = Zn(e2), n2 = Zn(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return ts({ $method: e2, $param: Xn(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: Xn(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function ts(e2, t2, n2) {
    return Vn(new es(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), Qn(s2, t3) ? ts({ $method: t3 }, e3, n2) : function() {
        return ts({ $method: t3, $param: Xn(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function ns({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function ss(e2, t2 = {}) {
    return Vn(new e2(t2), { get: (e3, t3) => Qn("db", t3) ? ts({ $method: t3 }, null, e3) : function() {
      return ts({ $method: t3, $param: Xn(Array.from(arguments)) }, null, e3);
    } });
  }
  class rs extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Gn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Gn(this._dbCallBacks)), this.env = Vn({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Vn({}, { get: (e3, t3) => ns({ path: ["Geo"], method: t3 }) }), this.serverDate = ns({ path: [], method: "serverDate" }), this.RegExp = ns({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), M(q(o2, "fail"), e3).then(() => M(q(o2, "complete"), e3)).then(() => (r2(null, e3), Y(j, { type: W, content: e3 }), Promise.reject(e3)));
      }
      const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
        const l2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < l2.length; t4++) {
          const { prop: n4, tips: s4 } = l2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return M(q(o2, "success"), e4).then(() => M(q(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const is = "token无效，跳转登录页面", os = "token过期，跳转登录页面", as = { TOKEN_INVALID_TOKEN_EXPIRED: os, TOKEN_INVALID_INVALID_CLIENTID: is, TOKEN_INVALID: is, TOKEN_INVALID_WRONG_TOKEN: is, TOKEN_INVALID_ANONYMOUS_USER: is }, cs = { "uni-id-token-expired": os, "uni-id-check-token-failed": is, "uni-id-token-not-exist": is, "uni-id-check-device-feature-failed": is };
  function us(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function ls(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(us(t2, e3.path)) : false === e3.needLogin && s2.push(us(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function hs(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function ds() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function ps() {
    return hs(ds());
  }
  function fs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = hs(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const gs = !!e.uniIdRouter;
  const { loginPage: ms, routerNeedLogin: ys, resToLogin: _s, needLoginPage: ws, notNeedLoginPage: vs, loginPageInTabBar: Is } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ls(t2), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ls(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: fs(i2, r2) };
  }();
  if (ws.indexOf(ms) > -1)
    throw new Error(`Login page [${ms}] should not be "needLogin", please check your pages.json`);
  function Ss(e2) {
    const t2 = ps();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function bs(e2) {
    const t2 = hs(Ss(e2));
    return !(vs.indexOf(t2) > -1) && (ws.indexOf(t2) > -1 || ys.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function ks({ redirect: e2 }) {
    const t2 = hs(e2), n2 = hs(ms);
    return ps() !== n2 && t2 !== n2;
  }
  function As({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !ks({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(ms, t2);
    Is ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function Cs({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = re();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: cs[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: cs[e4] };
      }
      return n3;
    }();
    if (bs(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (z($).length > 0)
        return setTimeout(() => {
          Y($, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Ps() {
    !function() {
      const e3 = ds(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Cs({ url: e3 });
      t2 || n2 && As({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Cs({ url: e3.url });
        return t3 ? e3 : s2 ? (As({ api: n2, redirect: Ss(e3.url) }), false) : e3;
      } });
    }
  }
  function Ts() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in cs;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in as;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = z($);
        Z().then(() => {
          const n3 = ds();
          if (n3 && ks({ redirect: n3 }))
            return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (ms && As({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function xs(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        V(j, e4);
      }, e3.offResponse = function(e4) {
        G(j, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        V($, e4);
      }, e3.offNeedLogin = function(e4) {
        G($, e4);
      }, gs && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
        Ps.call(e3);
      }), _s && Ts.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        V(B, e4);
      }, e3.offRefreshToken = function(e4) {
        G(B, e4);
      };
    }(e2);
  }
  let Os;
  const Es = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ls = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Rs() {
    const e2 = re().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Os(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Os = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ls.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = Es.indexOf(e2.charAt(i2++)) << 18 | Es.indexOf(e2.charAt(i2++)) << 12 | (n2 = Es.indexOf(e2.charAt(i2++))) << 6 | (s2 = Es.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Us = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), Ns = t(Us);
  const Ds = "manual";
  function Ms(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === Ds)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const l2 = t2.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function qs(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await M(q(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...l2) {
          let h2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: l2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            h2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, h2 = { result: new te(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: l2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...l2);
                }
              }
            const n3 = new te({ subject: f2, code: g2, message: m2, requestId: h2.requestId });
            throw n3.detail = h2.result, Y(j, { type: J, content: n3 }), n3;
          }
          return Y(j, { type: J, content: h2.result }), h2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Fs(e2) {
    return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Ks({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Fs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${C}\``);
  }
  async function js(e2) {
    const t2 = Fs(this);
    return t2.initPromise || (t2.initPromise = Ks.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function $s(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return js.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Bs(e2) {
    !function(e3) {
      le = e3;
    }(e2);
  }
  function Ws(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class Hs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ws("getSystemInfo")(), Ws("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Js(e2) {
    {
      const { osName: e3, osVersion: t3 } = ce();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await At(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === C.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function zs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const Vs = { tcb: bt, tencent: bt, aliyun: fe, private: Tt, dcloud: Tt, alipay: qt };
  let Gs = new class {
    init(e2) {
      let t2 = {};
      const n2 = Vs[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === C;
        const n3 = P;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Js(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), zs(t2), Jn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = ss(rs, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = ss(rs, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Rs, e3.chooseAndUploadFile = Ns.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Ms(e3);
        } }), e3.SSEChannel = Hs, e3.initSecureNetworkByWeixin = $s(e3), e3.setCustomClientInfo = Bs, e3.importObject = qs(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ee(n4), l2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : M(q(t3, "success"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (r2 && Y(j, { type: H, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : M(q(t3, "fail"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (Y(j, { type: H, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return l2;
            l2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = T;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], Gs = Gs.init(t2), Gs._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        Gs[e3] = function() {
          return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Gs, { get mixinDatacom() {
      return Ms(Gs);
    } }), xs(Gs), Gs.addInterceptor = N, Gs.removeInterceptor = D, Gs.interceptObject = F;
  })();
  var Ys = Gs;
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e2) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e2) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.hasInjectionContext() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o2) {
    return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e2) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e2) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a2 = document.createElement("a");
    a2.download = name;
    a2.rel = "noopener";
    if (typeof blob === "string") {
      a2.href = blob;
      if (a2.origin !== location.origin) {
        if (corsEnabled(a2.href)) {
          download(blob, name, opts);
        } else {
          a2.target = "_blank";
          click(a2);
        }
      } else {
        click(a2);
      }
    } else {
      a2.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a2.href);
      }, 4e4);
      setTimeout(function() {
        click(a2);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a2 = document.createElement("a");
        a2.href = blob;
        a2.target = "_blank";
        setTimeout(function() {
          click(a2);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o2) {
    return "_a" in o2 && "install" in o2;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o2) {
    return !!(vue.isRef(o2) && o2.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v2) => Object.assign(provideCache, v2)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  class Cache {
    // 设置缓存
    static setCache(key, value) {
      uni.setStorageSync(key, value);
    }
    // 获取缓存
    static getCache(key) {
      const value = uni.getStorageSync(key);
      if (value) {
        return value;
      }
      return null;
    }
    // 移除缓存
    static removeCache(key) {
      uni.removeStorageSync(key);
    }
    // 清除所有缓存
    static clearAllCache() {
      uni.clearStorageSync();
    }
  }
  const getCache = Cache.getCache;
  Cache.setCache;
  const useGameInfoStore = defineStore("gameInfo", {
    state: () => {
      return {
        id: getCache(ID) | "",
        userName: getCache(USERNAME),
        phone: "",
        avatar: getCache(AVATAR) | "",
        isFirst: getCache(ISFIRST),
        bgm: uni.createInnerAudioContext(),
        assets: {},
        isLoad: false,
        translateX: -340,
        translateY: -320,
        bgmIsOpen: true
      };
    }
  });
  const ID = "id";
  const USERNAME = "userName";
  const PHONE = "phone";
  const AVATAR = "avatar";
  const ISFIRST = "isFirst";
  const ASSETS = "assets";
  const POWERSTONE = "powerStone";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$k = {
    __name: "Mock",
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const setCache = Cache.setCache;
      const getCache2 = Cache.getCache;
      gameInfo.bgm.stop();
      const assetsDB = Ys.importObject("assets");
      async function addAssets(userId, type, number) {
        await assetsDB.update(userId, type, number);
        if (gameInfo.assets[type] += number < 0)
          return;
        gameInfo.assets[type] += number;
      }
      async function toGame() {
        const phone = 15182344075, avatar2 = "https://ts1.cn.mm.bing.net/th?id=OIP-C.1PjYL0WYwiZAYSWtOQryjwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2";
        setCache(PHONE, phone);
        setCache(AVATAR, avatar2);
        gameInfo.isLoad = 0;
        uni.navigateTo({
          url: "/pages/Home/Home"
        });
      }
      const __returned__ = { gameInfo, setCache, getCache: getCache2, assetsDB, addAssets, toGame, get ASSETS() {
        return ASSETS;
      }, get AVATAR() {
        return AVATAR;
      }, get ID() {
        return ID;
      }, get ISFIRST() {
        return ISFIRST;
      }, get PHONE() {
        return PHONE;
      }, get USERNAME() {
        return USERNAME;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get Cache() {
        return Cache;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        type: "primary",
        onClick: _cache[0] || (_cache[0] = () => {
          $setup.addAssets("672864e999c624e44f8ecb57", "meteorite", 70);
        })
      }, "加一"),
      vue.createElementVNode("button", {
        type: "primary",
        onClick: $setup.toGame
      }, "点击进入云城")
    ]);
  }
  const PagesMockMock = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__file", "D:/HBuilderProjects/Game/pages/Mock/Mock.vue"]]);
  const _sfc_main$j = {
    __name: "assetsHeader",
    props: ["judge"],
    setup(__props, { expose: __expose }) {
      __expose();
      const assets = ["powerStone", "diamond", "resourceStone"];
      const assetsMap = ["能", "金", "源"];
      const gameInfo = useGameInfoStore();
      const props = __props;
      const getCache2 = Cache.getCache;
      const assetsDB = Ys.importObject("assets");
      const userDB = Ys.importObject("user");
      vue.onMounted(async () => {
        if (gameInfo.isLoad)
          return;
        const phone = getCache2(PHONE);
        const res1 = await userDB.select(phone);
        const id = res1.res.data[0]._id;
        const res2 = await assetsDB.select(id);
        gameInfo.assets = res2.res.data[0];
        gameInfo.isLoad = true;
      });
      function getImageUrl(name) {
        return `../static/assetsHeader/${name}.png`;
      }
      const __returned__ = { assets, assetsMap, gameInfo, props, getCache: getCache2, assetsDB, userDB, getImageUrl, onMounted: vue.onMounted, reactive: vue.reactive, ref: vue.ref, watch: vue.watch, get PHONE() {
        return PHONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get Cache() {
        return Cache;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $setup.props.judge === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "assetsBar1"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.assets, (item, index) => {
            return vue.createElementVNode(
              "view",
              {
                class: "asset",
                key: index,
                style: vue.normalizeStyle(`background: url(${$setup.getImageUrl(item)}) no-repeat center center / contain;`)
              },
              [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString($setup.gameInfo.assets[item]),
                  1
                  /* TEXT */
                )
              ],
              4
              /* STYLE */
            );
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true),
      $setup.props.judge === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "assetsBar2"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.assets, (item, index) => {
            return vue.createElementVNode(
              "view",
              {
                class: "asset",
                key: index,
                style: vue.normalizeStyle(`background: url(${$setup.getImageUrl(item)}) no-repeat center center / contain;`)
              },
              [
                vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString($setup.gameInfo.assets[item]),
                  1
                  /* TEXT */
                )
              ],
              4
              /* STYLE */
            );
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const assetsHeader = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-618629f7"], ["__file", "D:/HBuilderProjects/Game/components/assetsHeader.vue"]]);
  const _sfc_main$i = {
    __name: "avatar",
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const avatar2 = uni.getStorageSync("avatar");
      const __returned__ = { gameInfo, avatar: avatar2, ref: vue.ref, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "avatar" }, [
      $setup.avatar ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "avatarImg",
          style: vue.normalizeStyle(`background-image: url(${$setup.avatar});`)
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "userName" }, [
        vue.createElementVNode(
          "text",
          null,
          vue.toDisplayString($setup.gameInfo.userName),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const avatar = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-32a3f906"], ["__file", "D:/HBuilderProjects/Game/components/avatar.vue"]]);
  const _imports_0 = "/static/toolsBar/arrowRight.png";
  const _imports_1 = "/static/toolsBar/arrowLeft.png";
  const _sfc_main$h = {
    __name: "toolsBar",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const imgList = ["setting", "warehouse", "shop", "announcement", "rule"];
      const imgMap = ["设置", "仓库", "商店", "公告", "玩法"];
      const needFold = vue.ref(true);
      const props = __props;
      function toggleFold() {
        needFold.value = !needFold.value;
      }
      const __returned__ = { imgList, imgMap, needFold, props, toggleFold, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "toolsBar" }, [
      vue.createElementVNode("view", {
        class: "controll",
        onClick: $setup.toggleFold
      }, [
        $setup.needFold ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: _imports_0,
          mode: "widthFix",
          class: "arrow"
        })) : (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          src: _imports_1,
          mode: "widthFix",
          class: "arrow"
        }))
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "toolsWrap",
          style: vue.normalizeStyle(`width:${!$setup.needFold ? "0" : "80vw"}`)
        },
        [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.imgList, (item, index) => {
              return vue.createElementVNode("view", {
                class: "tool",
                key: index,
                style: vue.normalizeStyle(`background: url('../static/toolsBar/${$setup.imgList[index]}.png') no-repeat center center / contain;`),
                onClick: () => {
                  $setup.props.handleShow(index, true);
                }
              }, [
                vue.withDirectives(vue.createElementVNode(
                  "span",
                  null,
                  vue.toDisplayString($setup.imgMap[index]),
                  513
                  /* TEXT, NEED_PATCH */
                ), [
                  [vue.vShow, $setup.needFold]
                ])
              ], 12, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const toolsBar = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-aed0e88d"], ["__file", "D:/HBuilderProjects/Game/components/toolsBar.vue"]]);
  const _sfc_main$g = {
    name: "cloudTip",
    data() {
      return {};
    },
    methods: {
      toTradingMarket() {
        formatAppLog("log", "at components/cloudTip.vue:28", "hhhh");
        uni.navigateTo({
          url: "/pages/TradingMarkets/TradingMarkets"
        });
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "cloudWrap" }, [
      vue.createElementVNode("view", {
        class: "mine item",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.toTradingMarket && $options.toTradingMarket(...args))
      }, [
        vue.createElementVNode("text", null, "矿洞")
      ]),
      vue.createElementVNode("view", { class: "ground item" }, [
        vue.createElementVNode("text", null, "地皮管理")
      ]),
      vue.createElementVNode("view", { class: "mart item" }, [
        vue.createElementVNode("text", null, "交易中心")
      ]),
      vue.createElementVNode("view", { class: "talentCenter item" }, [
        vue.createElementVNode("text", null, "人才中心")
      ])
    ]);
  }
  const cloudTip = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-04c56f99"], ["__file", "D:/HBuilderProjects/Game/components/cloudTip.vue"]]);
  const _sfc_main$f = {
    name: "dynamicPeople",
    data() {
      return {};
    },
    mounted() {
    },
    methods: {}
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "peopleWrap" }, [
      vue.createElementVNode("view", { class: "flowers" }, [
        vue.createElementVNode("view", { class: "flower f1" }),
        vue.createElementVNode("view", { class: "flower f2" }),
        vue.createElementVNode("view", { class: "flower f3" }),
        vue.createElementVNode("view", { class: "flower f4" })
      ]),
      vue.createElementVNode("view", { class: "talentCenter" }, [
        vue.createElementVNode("view", { class: "p1 person" }),
        vue.createCommentVNode(' <view class="p2 person"></view> '),
        vue.createCommentVNode(' <view class="p3 person"></view> '),
        vue.createCommentVNode(' <view class="p4 person"></view> '),
        vue.createCommentVNode(' <view class="p5 person"></view> '),
        vue.createCommentVNode(' <view class="p6 person"></view> ')
      ]),
      vue.createElementVNode("view", { class: "ground" }, [
        vue.createElementVNode("view", { class: "person p7" }),
        vue.createElementVNode("view", { class: "person p8" }),
        vue.createElementVNode("view", { class: "person p9" }),
        vue.createElementVNode("view", { class: "person p10" })
      ]),
      vue.createElementVNode("view", { class: "mineArea" }, [
        vue.createElementVNode("view", { class: "mine m1" }),
        vue.createElementVNode("view", { class: "mine m2" }),
        vue.createCommentVNode(' <view class="mine m3"></view> ')
      ])
    ]);
  }
  const dynamicPeople = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-2a3805e5"], ["__file", "D:/HBuilderProjects/Game/components/dynamicPeople.vue"]]);
  const _sfc_main$e = {
    __name: "clickMask",
    props: ["handleShowTanlentPop"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      function toMine() {
        uni.navigateTo({
          url: "/pages/Mine/Mine"
        });
      }
      function toGround() {
        uni.navigateTo({
          url: "/pages/Ground/Ground"
        });
      }
      function toTanlentCenter() {
        props.handleShowTanlentPop(true);
      }
      function toTradingMarket() {
        uni.navigateTo({
          url: "/pages/TradingMarkets/TradingMarkets"
        });
      }
      const __returned__ = { props, toMine, toGround, toTanlentCenter, toTradingMarket };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "clickMaskWrap" }, [
      vue.createElementVNode("view", {
        class: "item tradingMarket",
        onClick: $setup.toTradingMarket
      }),
      vue.createElementVNode("view", {
        class: "item talentCenter",
        onClick: $setup.toTanlentCenter
      }),
      vue.createElementVNode("view", {
        class: "item ground",
        onClick: $setup.toGround
      }),
      vue.createElementVNode("view", {
        class: "item mine",
        onClick: $setup.toMine
      })
    ]);
  }
  const clickMask = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-37646fb3"], ["__file", "D:/HBuilderProjects/Game/components/clickMask.vue"]]);
  const _sfc_main$d = {
    __name: "userInfoPop",
    props: ["closeInfo"],
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const avatar2 = Cache.getCache(AVATAR);
      const userName = vue.ref(Cache.getCache(USERNAME));
      const isShowEditPop = vue.ref(false);
      const isShowTip = vue.ref(false);
      const newName = vue.ref("");
      const isFirstEdit = vue.ref(gameInfo.isFirst === 0);
      function openEditNamePop() {
        isShowEditPop.value = true;
      }
      function closeEditNamePop() {
        isShowEditPop.value = false;
      }
      function updateName(e2) {
        newName.value = e2.detail.value;
      }
      function confirm() {
        if (newName.value === "")
          return;
        if (!isFirstEdit.value && gameInfo.assets.powerStone < 100) {
          isShowTip.value = true;
          return;
        }
        if (!isFirstEdit.value) {
          gameInfo.assets.powerStone -= 100;
          const assetsDB = Ys.importObject("assets");
          assetsDB.update(gameInfo.id, POWERSTONE, -100);
        }
        const user = Ys.importObject("user");
        const id = uni.getStorageSync("id");
        user.changeName(id, newName.value);
        uni.setStorageSync("userName", newName.value);
        gameInfo.userName = newName.value;
        userName.value = newName.value;
        gameInfo.isFirst = 1;
        isShowEditPop.value = false;
        isFirstEdit.value = false;
      }
      const __returned__ = { gameInfo, props, avatar: avatar2, userName, isShowEditPop, isShowTip, newName, isFirstEdit, openEditNamePop, closeEditNamePop, updateName, confirm, ref: vue.ref, get AVATAR() {
        return AVATAR;
      }, get POWERSTONE() {
        return POWERSTONE;
      }, get USERNAME() {
        return USERNAME;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get Cache() {
        return Cache;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "userInfoWrap" }, [
      vue.createElementVNode("view", { class: "infoBgc" }, [
        vue.createElementVNode("view", {
          class: "closeBtn",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.props.closeInfo && $setup.props.closeInfo(...args))
        }),
        vue.createElementVNode(
          "view",
          {
            class: "avatar",
            style: vue.normalizeStyle(`background-image: url(${$setup.avatar});`)
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", { class: "userName" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.userName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "desc" }, [
          $setup.isFirstEdit ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "(首次免费修改)")) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "(修改需消耗100能量石)"))
        ]),
        vue.createElementVNode("view", {
          class: "editName",
          onClick: $setup.openEditNamePop
        }, [
          vue.createElementVNode("text", null, "修改")
        ]),
        vue.createElementVNode("view", { class: "assetsArea" })
      ]),
      $setup.isShowEditPop ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "editPop"
      }, [
        vue.createElementVNode("view", { class: "bgc" }, [
          vue.createElementVNode("view", {
            class: "close",
            onClick: $setup.closeEditNamePop
          }),
          vue.createElementVNode("view", {
            class: "confirm",
            onClick: $setup.confirm
          }, [
            vue.createElementVNode("text", null, "确定修改")
          ]),
          vue.createElementVNode("view", { class: "inputBgc" }, [
            vue.createElementVNode("input", {
              type: "text",
              value: $setup.newName,
              maxlength: "6",
              onInput: $setup.updateName,
              "auto-focus": true,
              placeholder: "名字最大长度为6"
            }, null, 40, ["value"])
          ]),
          $setup.isShowTip ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tip"
          }, [
            vue.createElementVNode("text", null, "能量石余额不足")
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const userInfoPop = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-13ced562"], ["__file", "D:/HBuilderProjects/Game/components/userInfoPop.vue"]]);
  const openImg = "../static/toolsBar/switchOn.png";
  const closeImg = "../static/toolsBar/switchOff.png";
  const _sfc_main$c = {
    __name: "settingPop",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const bgm = useGameInfoStore().bgm;
      function handleImg() {
        gameInfo.bgmIsOpen = !gameInfo.bgmIsOpen;
        if (gameInfo.bgmIsOpen)
          bgm.play();
        else
          bgm.pause();
      }
      function exit() {
        bgm.stop();
        bgm.onStop(() => {
          formatAppLog("log", "at components/settingPop.vue:36", "音乐停止播放");
        });
        uni.navigateTo({
          url: "/pages/Mock/Mock"
        });
      }
      const __returned__ = { gameInfo, props, openImg, closeImg, bgm, handleImg, exit, ref: vue.ref, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "settingWrap" }, [
      vue.createElementVNode("view", { class: "bgc" }, [
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.props.handleShow(0, false);
          })
        }),
        vue.createElementVNode(
          "view",
          {
            class: "switch",
            onClick: _cache[1] || (_cache[1] = () => {
              $setup.handleImg();
            }),
            style: vue.normalizeStyle(`background-image: url(${$setup.gameInfo.bgmIsOpen ? $setup.openImg : $setup.closeImg});`)
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "exit",
          onClick: $setup.exit
        }, [
          vue.createElementVNode("text", null, "退出游戏")
        ])
      ])
    ]);
  }
  const settingPop = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-9e95edd8"], ["__file", "D:/HBuilderProjects/Game/components/settingPop.vue"]]);
  const _sfc_main$b = {
    __name: "rulePop",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "ruleWrap" }, [
      vue.createElementVNode("view", { class: "pop" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "玩法")
        ]),
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.props.handleShow(4, false);
          })
        })
      ])
    ]);
  }
  const rulePop = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-961e39f0"], ["__file", "D:/HBuilderProjects/Game/components/rulePop.vue"]]);
  const _sfc_main$a = {
    __name: "announcementPop",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "announcementWrap" }, [
      vue.createElementVNode("view", { class: "pop" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "公告")
        ]),
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.props.handleShow(3, false);
          })
        })
      ])
    ]);
  }
  const announcementPop = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-c26e9d23"], ["__file", "D:/HBuilderProjects/Game/components/announcementPop.vue"]]);
  const _sfc_main$9 = {
    __name: "talentCenterPop",
    props: ["handleShowTanlentPop"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const names = ["艾伦", "索菲亚", "杰克"];
      const desc = ["每日自动签到", "加成效率30%", "加成效率50%"];
      const price = [38, 288, 588, 988];
      const __returned__ = { props, names, desc, price };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "talentWrap" }, [
      vue.createElementVNode("view", {
        class: "close",
        onClick: _cache[0] || (_cache[0] = ($event) => $props.handleShowTanlentPop(false))
      }),
      vue.createElementVNode("view", { class: "board" }, [
        vue.createElementVNode("view", { class: "listArea" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.names, (item, index) => {
              return vue.createElementVNode("view", { class: "itemWrap" }, [
                vue.createElementVNode("view", { class: "avatarwrap" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "avatar",
                      style: vue.normalizeStyle(`background-image: url(../static/workersAvatar/worker${index + 1 + ""}.png);`)
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ]),
                vue.createElementVNode("view", { class: "nameAndDesc" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "name" },
                    vue.toDisplayString(item),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "desc" },
                    vue.toDisplayString($setup.desc[index]),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "price" },
                    " 招募价格: " + vue.toDisplayString($setup.price[index]) + " 能量石 ",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "btn" }, [
                  vue.createElementVNode("text", { class: "text" }, "招募")
                ])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const talentCenterPop = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-52356c3d"], ["__file", "D:/HBuilderProjects/Game/components/talentCenterPop.vue"]]);
  const _sfc_main$8 = {
    __name: "Home",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const screenWidth = vue.ref(0);
      const screenHeight = vue.ref(0);
      const mapWidth = vue.ref(0);
      const mapHeight = vue.ref(0);
      const startX = vue.ref(0);
      const startY = vue.ref(0);
      const translateX = vue.ref(-340);
      const translateY = vue.ref(-320);
      const isShowInfo = vue.ref(false);
      const isShowSettingPop = vue.ref(false);
      const isShowRulePop = vue.ref(false);
      const isShowAnnouncementPop = vue.ref(false);
      const isShowTalentPop = vue.ref(false);
      const gameInfo = useGameInfoStore();
      const bgm = gameInfo.bgm;
      const setCache = Cache.setCache;
      const getCache2 = Cache.getCache;
      translateX.value = gameInfo.translateX;
      translateY.value = gameInfo.translateY;
      getVwVhInPx();
      const systemInfo = uni.getSystemInfoSync();
      screenWidth.value = systemInfo.screenWidth;
      screenHeight.value = systemInfo.screenHeight;
      function getVwVhInPx() {
        const systemInfo2 = uni.getSystemInfoSync();
        const screenWidthValue = systemInfo2.screenWidth;
        const vw = screenWidthValue / 100;
        mapWidth.value = 300 * vw;
        mapHeight.value = 300 * vw;
      }
      function handleTouchStart(event) {
        startX.value = event.touches[0].clientX;
        startY.value = event.touches[0].clientY;
      }
      function handleTouchMove(event) {
        let currentX = event.touches[0].clientX;
        let currentY = event.touches[0].clientY;
        if (currentX > mapWidth.value)
          currentX = mapWidth.value;
        else if (currentX < 0)
          currentX = 0;
        if (currentY > mapHeight.value)
          currentY = mapHeight.value;
        else if (currentY < 0)
          currentY = 0;
        const deltaX = currentX - startX.value;
        const deltaY = currentY - startY.value;
        let temX = translateX.value + deltaX;
        let temY = translateY.value + deltaY;
        if (temX > 0)
          temX = 0;
        else if (temX < -(mapWidth.value - screenWidth.value)) {
          temX = -(mapWidth.value - screenWidth.value);
        }
        if (temY > 0)
          temY = 0;
        else if (temY < -(mapHeight.value - screenHeight.value)) {
          temY = -(mapHeight.value - screenHeight.value);
        }
        translateX.value = temX;
        translateY.value = temY;
        gameInfo.translateX = temX;
        gameInfo.translateY = temY;
        startX.value = currentX;
        startY.value = currentY;
      }
      function handleTouchEnd() {
      }
      function handleShow(type, bool) {
        if (type === 0)
          isShowSettingPop.value = bool;
        if (type === 3)
          isShowAnnouncementPop.value = bool;
        if (type === 4)
          isShowRulePop.value = bool;
      }
      function handleInfo(type) {
        isShowInfo.value = type;
      }
      function handleShowTanlentPop(type) {
        isShowTalentPop.value = type;
      }
      vue.onMounted(async () => {
        if (gameInfo.isLoad)
          return;
        bgm.src = "/static/bgm/bgm.mp3";
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.play();
        bgm.onError((err) => {
          formatAppLog("log", "at pages/Home/Home.vue:149", err);
        });
        const phone = getCache2(PHONE), avatar2 = getCache2(AVATAR);
        const user = Ys.importObject("user");
        const assets = Ys.importObject("assets");
        const res1 = await user.select(phone);
        if (res1.res.affectedDocs === 0) {
          formatAppLog("log", "at pages/Home/Home.vue:163", "该用户没有激活过云城", res1);
          const res2 = await user.init(phone, avatar2);
          await assets.init(res2.res.id);
          setCache(USERNAME, "趣选云城");
          setCache(ISFIRST, 0);
          gameInfo.userName = "趣选云城";
          gameInfo.isFirst = 0;
        } else {
          formatAppLog("log", "at pages/Home/Home.vue:172", "该用户已经激活过云城(在mock页面中)", res1);
          const data = res1.res.data[0];
          gameInfo.userName = data.userName;
          gameInfo.isFirst = data.isFirst;
          gameInfo.id = data._id;
          setCache(USERNAME, data.userName);
          setCache(ID, data._id);
          setCache(ISFIRST, data.isFirst);
        }
      });
      const __returned__ = { keyword, screenWidth, screenHeight, mapWidth, mapHeight, startX, startY, translateX, translateY, isShowInfo, isShowSettingPop, isShowRulePop, isShowAnnouncementPop, isShowTalentPop, gameInfo, bgm, setCache, getCache: getCache2, systemInfo, getVwVhInPx, handleTouchStart, handleTouchMove, handleTouchEnd, handleShow, handleInfo, handleShowTanlentPop, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, ref: vue.ref, assetsHeader, avatar, toolsBar, cloudTip, dynamicPeople, clickMask, userInfoPop, settingPop, rulePop, announcementPop, talentCenterPop, get ASSETS() {
        return ASSETS;
      }, get AVATAR() {
        return AVATAR;
      }, get ID() {
        return ID;
      }, get ISFIRST() {
        return ISFIRST;
      }, get PHONE() {
        return PHONE;
      }, get USERNAME() {
        return USERNAME;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get Cache() {
        return Cache;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "pages" }, [
      vue.createCommentVNode(" 头像, 资源, 工具栏 "),
      vue.createVNode($setup["avatar"], {
        onClick: _cache[0] || (_cache[0] = () => {
          $setup.handleInfo(true);
        })
      }),
      vue.createVNode($setup["assetsHeader"], { judge: 1 }),
      vue.createVNode($setup["toolsBar"], { handleShow: $setup.handleShow }),
      vue.createCommentVNode(" 弹出组件 "),
      $setup.isShowInfo ? (vue.openBlock(), vue.createBlock($setup["userInfoPop"], {
        key: 0,
        closeInfo: () => {
          $setup.handleInfo(false);
        }
      }, null, 8, ["closeInfo"])) : vue.createCommentVNode("v-if", true),
      $setup.isShowSettingPop ? (vue.openBlock(), vue.createBlock($setup["settingPop"], {
        key: 1,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowRulePop ? (vue.openBlock(), vue.createBlock($setup["rulePop"], {
        key: 2,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowAnnouncementPop ? (vue.openBlock(), vue.createBlock($setup["announcementPop"], {
        key: 3,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowTalentPop ? (vue.openBlock(), vue.createBlock($setup["talentCenterPop"], {
        key: 4,
        handleShowTanlentPop: $setup.handleShowTanlentPop
      })) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: "map-container",
          onTouchstart: $setup.handleTouchStart,
          onTouchmove: $setup.handleTouchMove,
          onTouchend: $setup.handleTouchEnd
        },
        [
          vue.createElementVNode(
            "view",
            {
              ref: "mapRef",
              class: "map-image",
              style: vue.normalizeStyle({ transform: `translate(${$setup.translateX}px, ${$setup.translateY}px)` })
            },
            [
              vue.createVNode($setup["dynamicPeople"]),
              vue.createVNode($setup["cloudTip"]),
              vue.createVNode($setup["clickMask"], { handleShowTanlentPop: $setup.handleShowTanlentPop })
            ],
            4
            /* STYLE */
          )
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-7ffebbf4"], ["__file", "D:/HBuilderProjects/Game/pages/Home/Home.vue"]]);
  function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
  }
  const _sfc_main$7 = {
    __name: "marketPublish",
    props: ["controlPublish", "title", "gemItems", "gemImgName", "updateData"],
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const selectIndex = vue.ref(0);
      const inputNumValue = vue.ref(0);
      const inputPriceValue = vue.ref(0);
      const isShowNotEnough = vue.ref(false);
      const marketDB = Ys.importObject("market");
      const assetsDB = Ys.importObject("assets");
      const expectedNum = vue.computed(() => {
        if (inputPriceValue.value < 0.2 || inputPriceValue.value > 10)
          return 0;
        const product = inputNumValue.value * inputPriceValue.value * 0.95;
        return roundToOneDecimal(product);
      });
      const needPowerStoneNum = vue.computed(() => {
        if (inputPriceValue.value < 0.2 || inputPriceValue.value > 10)
          return 0;
        return roundToOneDecimal(inputNumValue.value * inputPriceValue.value);
      });
      const isShowWran = vue.computed(() => {
        return inputPriceValue.value < 0.2 || inputPriceValue.value > 10;
      });
      const isSell = vue.computed(() => {
        return props.title === "出售";
      });
      const confirmFun = vue.computed(() => {
        return props.title === "出售" ? confirmSellPublish : confirmNeedPublish;
      });
      function getGemImg(item) {
        return `../../static/market/${item}.png`;
      }
      function handleIndex(index) {
        selectIndex.value = index;
        inputNumValue.value = 0;
        inputPriceValue.value = 0;
        isShowNotEnough.value = false;
      }
      function setPriceValue(price) {
        inputPriceValue.value = price;
      }
      function setNumValue(num) {
        inputNumValue.value = num;
      }
      function handleSellNum(num) {
        const max = gameInfo.assets[props.gemImgName[selectIndex.value]] | 0;
        if (num === true) {
          inputNumValue.value = max;
          return;
        }
        const tem = inputNumValue.value + num;
        if (tem < 0)
          return;
        if (tem > max && isSell.value)
          return;
        inputNumValue.value += num;
      }
      async function confirmSellPublish() {
        if (inputPriceValue.value < 0.2 || inputPriceValue.value > 10 || inputNumValue.value <= 0)
          return;
        if (inputNumValue.value > gameInfo.assets[props.gemImgName[selectIndex.value]]) {
          isShowNotEnough.value = true;
          return;
        }
        const gemType = props.gemImgName[selectIndex.value];
        formatAppLog("log", "at components/marketPublish.vue:149", inputPriceValue.value);
        await marketDB.publishSellRequirement(gameInfo.id, gemType, inputNumValue.value, inputPriceValue.value);
        await assetsDB.update(gameInfo.id, gemType, -inputNumValue.value);
        gameInfo.assets[gemType] -= inputNumValue.value;
        formatAppLog("log", "at components/marketPublish.vue:155", "这里是卖出:");
        props.controlPublish(false);
        props.updateData();
      }
      async function confirmNeedPublish() {
        if (inputPriceValue.value < 0.2 || inputPriceValue.value > 10 || inputNumValue.value <= 0)
          return;
        const gemType = props.gemImgName[selectIndex.value];
        const totalPrice = roundToOneDecimal(inputNumValue.value * inputPriceValue.value);
        if (totalPrice > gameInfo.assets[POWERSTONE]) {
          isShowNotEnough.value = true;
          return;
        }
        await marketDB.publishBuyRequirement(gameInfo.id, gemType, inputNumValue.value, inputPriceValue.value);
        await assetsDB.update(gameInfo.id, POWERSTONE, -totalPrice);
        gameInfo.assets[POWERSTONE] = roundToOneDecimal(gameInfo.assets[POWERSTONE] - totalPrice);
        formatAppLog("log", "at components/marketPublish.vue:173", "这里是需求:");
        props.controlPublish(false);
        props.updateData();
      }
      const __returned__ = { gameInfo, props, selectIndex, inputNumValue, inputPriceValue, isShowNotEnough, marketDB, assetsDB, expectedNum, needPowerStoneNum, isShowWran, isSell, confirmFun, getGemImg, handleIndex, setPriceValue, setNumValue, handleSellNum, confirmSellPublish, confirmNeedPublish, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "publishWrap" }, [
      vue.createElementVNode("view", { class: "board" }, [
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $props.controlPublish(false);
          })
        }),
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode(
            "text",
            null,
            "发布" + vue.toDisplayString($props.title),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "gems" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.gemItems, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "gemItem" }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass({ "imgWrap": true, "active": index === $setup.selectIndex }),
                  onClick: () => {
                    $setup.handleIndex(index);
                  }
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "gemImg",
                      style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($props.gemImgName[index])});`)
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ], 10, ["onClick"]),
                vue.createElementVNode("view", { class: "name" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item),
                    1
                    /* TEXT */
                  )
                ])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "publishNum" }, [
          vue.createElementVNode("view", {
            class: "sub",
            onClick: _cache[1] || (_cache[1] = () => {
              $setup.handleSellNum(-1);
            })
          }),
          vue.createElementVNode("view", { class: "inputWrap" }, [
            vue.createElementVNode("input", {
              type: "number",
              value: $setup.inputNumValue,
              onInput: _cache[2] || (_cache[2] = (res) => {
                $setup.setNumValue(res.detail.value);
              })
            }, null, 40, ["value"])
          ]),
          vue.createElementVNode("view", {
            class: "add",
            onClick: _cache[3] || (_cache[3] = () => {
              $setup.handleSellNum(1);
            })
          }),
          $setup.isSell ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "max",
            onClick: _cache[4] || (_cache[4] = () => {
              $setup.handleSellNum(true);
            })
          }, [
            vue.createElementVNode("text", null, "最大")
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "price" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($props.title) + "单价(限价:0.2~10):",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "gemImg" }),
          vue.createElementVNode("view", { class: "priceInputWrap" }, [
            vue.createElementVNode("input", {
              type: "digit",
              value: $setup.inputPriceValue,
              onInput: _cache[5] || (_cache[5] = (res) => {
                $setup.setPriceValue(res.detail.value);
              })
            }, null, 40, ["value"])
          ])
        ]),
        vue.createElementVNode("view", { class: "wran" }, [
          vue.withDirectives(vue.createElementVNode(
            "text",
            null,
            "(请输入限制范围内的单价)",
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.isShowWran]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "text",
            null,
            "(" + vue.toDisplayString($props.gemItems[$setup.selectIndex]) + "不足)",
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vue.vShow, $setup.isShowNotEnough && $setup.isSell]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "text",
            null,
            "(金刚石余额不足)",
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $setup.isShowNotEnough && !$setup.isSell]
          ])
        ]),
        vue.createElementVNode("view", { class: "tip" }, [
          $setup.isSell ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "own item"
          }, [
            vue.createElementVNode("text", null, "可出售"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($props.gemImgName[$setup.selectIndex])});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.gameInfo.assets[$props.gemImgName[$setup.selectIndex]] | 0),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          $setup.isSell ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "premium item"
          }, [
            vue.createElementVNode("text", null, "手续费"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode("text", null, "5%")
          ])) : vue.createCommentVNode("v-if", true),
          $setup.isSell ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "obtain item"
          }, [
            vue.createElementVNode("text", null, "预获得"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.expectedNum),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true),
          !$setup.isSell ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "needPowerStone item"
          }, [
            vue.createElementVNode("text", null, "需要扣除"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.needPowerStoneNum),
              1
              /* TEXT */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", {
          class: "confirmBtn",
          onClick: _cache[6] || (_cache[6] = (...args) => $setup.confirmFun && $setup.confirmFun(...args))
        }, [
          vue.createElementVNode("text", null, "确认发布")
        ])
      ])
    ]);
  }
  const marketPublish = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-16940c0f"], ["__file", "D:/HBuilderProjects/Game/components/marketPublish.vue"]]);
  const _sfc_main$6 = {
    __name: "buyCellPop",
    props: [
      "controlShowPop",
      "gemName",
      "gemChName",
      "marketName",
      "certainItem",
      "updateData"
    ],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const inputNumValue = vue.ref(0);
      const isShowWarn = vue.ref(false);
      const assetsDB = Ys.importObject("assets");
      const marketDB = Ys.importObject("market");
      const gameInfo = useGameInfoStore();
      const isSellMarket = vue.computed(() => {
        return props.marketName === "出售";
      });
      const totalPrice = vue.computed(() => {
        formatAppLog(
          "log",
          "at components/buyCellPop.vue:143",
          roundToOneDecimal(inputNumValue.value * props.certainItem.sellPrice)
        );
        return roundToOneDecimal(inputNumValue.value * props.certainItem.sellPrice);
      });
      const expected = vue.computed(() => {
        return roundToOneDecimal(
          inputNumValue.value * props.certainItem.buyPrice * 0.95
        );
      });
      const btnWord = vue.computed(() => {
        return props.marketName === "出售" ? "购买" : "出售";
      });
      const confirmFun = vue.computed(() => {
        return props.marketName === "出售" ? confirmSellPublish : confirmNeedPublish;
      });
      function getGemImg(item) {
        return `../static/market/${item}.png`;
      }
      function setNumValue(num) {
        inputNumValue.value = num;
      }
      function handleShowWran(type) {
        isShowWarn.value = type;
      }
      function handleSellNum(num) {
        const max = props.certainItem.sellNum | props.certainItem.buyNum;
        if (num === true) {
          inputNumValue.value = max;
          return;
        }
        const tem = inputNumValue.value + num;
        if (tem < 0)
          return;
        if (tem > max)
          return;
        inputNumValue.value += num;
      }
      async function confirmSellPublish() {
        if (inputNumValue.value <= 0)
          return;
        const sellNum = props.certainItem.sellNum;
        const id = props.certainItem._id;
        props.certainItem.sellPrice;
        const demType = props.certainItem.demType;
        if (totalPrice.value > gameInfo.assets[POWERSTONE]) {
          handleShowWran(true);
          return;
        }
        await marketDB.addTransactionRecord(
          gameInfo.id,
          props.certainItem.sellerId,
          1,
          id,
          inputNumValue.value
        );
        if (sellNum === inputNumValue.value)
          await marketDB.finishSellRequirement(id);
        else {
          await marketDB.subSellNum(id, sellNum - inputNumValue.value);
        }
        await assetsDB.update(
          gameInfo.id,
          POWERSTONE,
          -totalPrice.value
        );
        await assetsDB.update(gameInfo.id, demType, inputNumValue.value);
        gameInfo.assets[demType] += inputNumValue.value;
        gameInfo.assets[POWERSTONE] = roundToOneDecimal(
          gameInfo.assets[POWERSTONE] - totalPrice.value
        );
        formatAppLog(
          "log",
          "at components/buyCellPop.vue:214",
          "这里是卖出",
          totalPrice.value,
          gameInfo.assets[POWERSTONE],
          gameInfo.assets[POWERSTONE] - totalPrice.value
        );
        props.controlShowPop(false);
        props.updateData();
      }
      async function confirmNeedPublish() {
        if (inputNumValue.value <= 0)
          return;
        const buyNum = props.certainItem.buyNum;
        const id = props.certainItem._id;
        props.certainItem.buyPrice;
        const demType = props.certainItem.demType;
        if (inputNumValue.value > gameInfo.assets[demType]) {
          handleShowWran(true);
          return;
        }
        await marketDB.addTransactionRecord(
          props.certainItem.buyerId,
          gameInfo.id,
          2,
          id,
          inputNumValue.value
        );
        if (inputNumValue.value === buyNum) {
          await marketDB.finishBuyRequirement(id);
        } else {
          await marketDB.subBuyNum(id, buyNum - inputNumValue.value);
        }
        await assetsDB.update(
          gameInfo.id,
          demType,
          -inputNumValue.value
        );
        await assetsDB.update(gameInfo.id, POWERSTONE, expected.value);
        gameInfo.assets[demType] -= inputNumValue.value;
        gameInfo.assets[POWERSTONE] = roundToOneDecimal(
          gameInfo.assets[POWERSTONE] + expected.value
        );
        formatAppLog("log", "at components/buyCellPop.vue:258", "这里是需求");
        props.controlShowPop(false);
        props.updateData();
      }
      const __returned__ = { props, inputNumValue, isShowWarn, assetsDB, marketDB, gameInfo, isSellMarket, totalPrice, expected, btnWord, confirmFun, getGemImg, setNumValue, handleShowWran, handleSellNum, confirmSellPublish, confirmNeedPublish, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "buyCellPopWrap" }, [
      vue.createElementVNode("view", { class: "board" }, [
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $props.controlShowPop(false);
          })
        }),
        vue.createElementVNode(
          "view",
          {
            class: "gemImg",
            style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($props.gemName)});`)
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", { class: "gemChName" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($props.gemChName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "publishNum" }, [
          vue.createElementVNode("view", {
            class: "sub",
            onClick: _cache[1] || (_cache[1] = () => {
              $setup.handleSellNum(-1);
            })
          }),
          vue.createElementVNode("view", { class: "inputWrap" }, [
            vue.createElementVNode("input", {
              type: "number",
              value: $setup.inputNumValue,
              onInput: _cache[2] || (_cache[2] = (res) => {
                $setup.setNumValue(res.detail.value);
              })
            }, null, 40, ["value"])
          ]),
          vue.createElementVNode("view", {
            class: "add",
            onClick: _cache[3] || (_cache[3] = () => {
              $setup.handleSellNum(1);
            })
          }),
          vue.createElementVNode("view", {
            class: "max",
            onClick: _cache[4] || (_cache[4] = () => {
              $setup.handleSellNum(true);
            })
          }, [
            vue.createElementVNode("text", null, "最大")
          ])
        ]),
        vue.createCommentVNode(" 求购市场 "),
        !$setup.isSellMarket ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "tip"
        }, [
          vue.createElementVNode("view", { class: "own item" }, [
            vue.createElementVNode("text", null, "可出售"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($props.gemName)});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.gameInfo.assets[$props.gemName]),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "premium item" }, [
            vue.createElementVNode("text", null, "手续费"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode("text", null, "5%")
          ]),
          vue.createElementVNode("view", { class: "obtain item" }, [
            vue.createElementVNode("text", null, "预获得"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.expected),
              1
              /* TEXT */
            )
          ])
        ])) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createCommentVNode(" 出售市场 "),
            vue.createElementVNode("view", { class: "tip" }, [
              vue.createElementVNode("view", { class: "premium item" }, [
                vue.createElementVNode("text", null, "购买单价"),
                vue.createElementVNode(
                  "view",
                  {
                    class: "itemImg",
                    style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($props.certainItem.sellPrice),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "obtain item" }, [
                vue.createElementVNode("text", null, "购买总价"),
                vue.createElementVNode(
                  "view",
                  {
                    class: "itemImg",
                    style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("powerStone")});`)
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($setup.totalPrice),
                  1
                  /* TEXT */
                )
              ])
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        )),
        $setup.isShowWarn ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "warn"
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.isSellMarket ? "(能量石不足)" : `${$props.gemChName}不足`),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "confirmBtn",
          onClick: _cache[5] || (_cache[5] = (...args) => $setup.confirmFun && $setup.confirmFun(...args))
        }, [
          vue.createElementVNode(
            "text",
            null,
            "确认" + vue.toDisplayString($setup.btnWord),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const buyCellPop = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-f77da028"], ["__file", "D:/HBuilderProjects/Game/components/buyCellPop.vue"]]);
  const _sfc_main$5 = {
    __name: "TradingMarkets",
    setup(__props, { expose: __expose }) {
      __expose();
      const marketCurrentIndex = vue.ref(0);
      const itemCurrentIndex = vue.ref(0);
      const itemCertainIndex = vue.ref(0);
      const isShowMarketPublish = vue.ref(false);
      const isShowBuySellPop = vue.ref(false);
      const gemItems = ["金刚石", "资源石", "无球粒陨石"];
      const gemImgName = ["diamond", "resourceStone", "meteorite"];
      const marketItems = ["出售", "求购"];
      const buttonWord = ["购买", "出售"];
      const marketDB = Ys.importObject("market");
      const assetsDB = Ys.importObject("assets");
      const sellRequirement = vue.ref({});
      const buyRequirement = vue.ref({});
      const showListData = vue.computed(() => {
        const itemName = gemImgName[itemCurrentIndex.value];
        return marketCurrentIndex.value === 0 ? sellRequirement.value[itemName] : buyRequirement.value[itemName];
      });
      const numName = vue.computed(() => {
        return marketCurrentIndex.value === 0 ? "sellNum" : "buyNum";
      });
      const priceName = vue.computed(() => {
        return marketCurrentIndex.value === 0 ? "sellPrice" : "buyPrice";
      });
      const certainRequirement = vue.computed(() => {
        const itemName = gemImgName[itemCurrentIndex.value];
        const list = marketCurrentIndex.value === 0 ? sellRequirement.value : buyRequirement.value;
        return list[itemName][itemCertainIndex.value];
      });
      function setItemIndex(index) {
        itemCurrentIndex.value = index;
      }
      function setMarketIndex(index) {
        marketCurrentIndex.value = index;
      }
      function back() {
        uni.navigateBack({
          delta: 1
        });
      }
      function getGemImg(item) {
        return `../../static/market/${item}.png`;
      }
      function controlPublish(bool) {
        isShowMarketPublish.value = bool;
      }
      function controlShowPop(bool) {
        isShowBuySellPop.value = bool;
      }
      function setCertainIndex(index) {
        itemCertainIndex.value = index;
      }
      async function updateData() {
        gemImgName.forEach(async (item) => {
          const res1 = await marketDB.selectSellRequirement(item);
          const res2 = await marketDB.selectBuyRequirement(item);
          sellRequirement.value[item] = res1.data;
          buyRequirement.value[item] = res2.data;
        });
      }
      vue.onMounted(async () => {
        await updateData();
      });
      const __returned__ = { marketCurrentIndex, itemCurrentIndex, itemCertainIndex, isShowMarketPublish, isShowBuySellPop, gemItems, gemImgName, marketItems, buttonWord, marketDB, assetsDB, sellRequirement, buyRequirement, showListData, numName, priceName, certainRequirement, setItemIndex, setMarketIndex, back, getGemImg, controlPublish, controlShowPop, setCertainIndex, updateData, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, assetsHeader1: assetsHeader, marketPublish, buyCellPop };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    return vue.openBlock(), vue.createElementBlock("view", { class: "tradingMarketWrap" }, [
      vue.createElementVNode("view", {
        class: "return",
        onClick: $setup.back
      }),
      vue.createVNode($setup["assetsHeader1"], { judge: 2 }),
      $setup.isShowMarketPublish ? (vue.openBlock(), vue.createBlock($setup["marketPublish"], {
        key: 0,
        controlPublish: $setup.controlPublish,
        title: $setup.marketItems[$setup.marketCurrentIndex],
        gemItems: $setup.gemItems,
        gemImgName: $setup.gemImgName,
        updateData: $setup.updateData
      }, null, 8, ["title"])) : vue.createCommentVNode("v-if", true),
      $setup.isShowBuySellPop ? (vue.openBlock(), vue.createBlock($setup["buyCellPop"], {
        key: 1,
        controlShowPop: $setup.controlShowPop,
        gemName: $setup.gemImgName[$setup.itemCurrentIndex],
        gemChName: $setup.gemItems[$setup.itemCurrentIndex],
        marketName: $setup.marketItems[$setup.marketCurrentIndex],
        certainItem: $setup.certainRequirement,
        updateData: $setup.updateData
      }, null, 8, ["gemName", "gemChName", "marketName", "certainItem"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 出售求购 "),
      vue.createElementVNode("view", { class: "topWrap" }, [
        vue.createElementVNode("view", { class: "markets" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.marketItems, (item, index) => {
              return vue.createElementVNode("view", {
                class: vue.normalizeClass({ "marketItem": true, "active": $setup.marketCurrentIndex === index }),
                onClick: () => {
                  $setup.setMarketIndex(index);
                }
              }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(item) + "市场",
                  1
                  /* TEXT */
                )
              ], 10, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", {
          class: "publish",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.controlPublish(true);
          })
        }, [
          vue.createElementVNode(
            "text",
            null,
            "发布" + vue.toDisplayString($setup.marketItems[$setup.marketCurrentIndex]),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 资源石 "),
      vue.createElementVNode("view", { class: "gemstones" }, [
        vue.createElementVNode("view", { class: "tabs" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.gemItems, (item, index) => {
              return vue.createElementVNode("view", {
                class: vue.normalizeClass({ "gemItem": true, "active": $setup.itemCurrentIndex === index }),
                onClick: () => {
                  $setup.setItemIndex(index);
                }
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "gemImg",
                    style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[index])});`)
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(item),
                  1
                  /* TEXT */
                )
              ], 10, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "contentWrap" }, [
          vue.createElementVNode("view", { class: "content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.showListData, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                  vue.createElementVNode("view", { class: "numWrap" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "gemImg",
                        style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[$setup.itemCurrentIndex])});`)
                      },
                      null,
                      4
                      /* STYLE */
                    ),
                    vue.createElementVNode("view", { class: "num" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($setup.marketItems[$setup.marketCurrentIndex]) + " : " + vue.toDisplayString(item[$setup.numName]) + "个",
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "priceWrap" }, [
                    vue.createElementVNode("view", { class: "priceImg" }),
                    vue.createElementVNode("view", { class: "price" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item[$setup.priceName]) + "/个",
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", {
                    class: "button",
                    onClick: () => {
                      $setup.setCertainIndex(index);
                      $setup.controlShowPop(true);
                    }
                  }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($setup.buttonWord[$setup.marketCurrentIndex]),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            ((_a = $setup.showListData) == null ? void 0 : _a.length) === 5 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "tip"
            }, [
              vue.createElementVNode("text", null, "最多只展示前五条数据")
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ])
    ]);
  }
  const PagesTradingMarketsTradingMarkets = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "D:/HBuilderProjects/Game/pages/TradingMarkets/TradingMarkets.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mineWrap" }, " 这是矿洞 ");
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/HBuilderProjects/Game/pages/Mine/Mine.vue"]]);
  const _sfc_main$3 = {
    __name: "worker",
    props: ["type", "delay"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "wholewrap" }, [
      vue.createElementVNode("view", { class: "whole" }, [
        vue.createElementVNode(
          "view",
          {
            class: "workerWrap",
            style: vue.normalizeStyle(`animation-delay: ${$props.delay + ""}s;`)
          },
          [
            vue.createElementVNode("view", { class: "black" }),
            vue.createCommentVNode(' <view class="cloud"></view> '),
            vue.createElementVNode(
              "view",
              {
                class: "leg-back",
                style: vue.normalizeStyle(`background-image: url(/static/worker${$props.type}/leg-back.png);`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "hand-back",
                style: vue.normalizeStyle(`background-image: url(/static/worker${$props.type}/hand-back.png);`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "body",
                style: vue.normalizeStyle(`background-image: url(/static/worker${$props.type}/body.png);`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "leg-front",
                style: vue.normalizeStyle(`background-image: url(/static/worker${$props.type}/leg-front.png);`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "hand-front",
                style: vue.normalizeStyle(`background-image: url(/static/worker${$props.type}/hand-front.png);`)
              },
              null,
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        )
      ])
    ]);
  }
  const workerVue = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-9daf811a"], ["__file", "D:/HBuilderProjects/Game/components/worker.vue"]]);
  const _sfc_main$2 = {
    __name: "buyGroundPop",
    props: ["groundType", "closePop", "offset"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const groundMap = {
        1: "小地皮",
        2: "稀缺地皮",
        3: "大地皮",
        4: "资源地皮",
        5: "黑土地皮",
        6: "钻石地皮"
      };
      const __returned__ = { props, groundMap };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "groundPopWrap" }, [
      vue.createElementVNode(
        "view",
        {
          class: "board",
          style: vue.normalizeStyle(`transform: translateY(${$props.offset});`)
        },
        [
          vue.createElementVNode("view", {
            class: "close",
            onClick: _cache[0] || (_cache[0] = (...args) => $props.closePop && $props.closePop(...args))
          }),
          vue.createElementVNode(
            "view",
            { class: "title" },
            vue.toDisplayString($setup.groundMap[$props.groundType]),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "desc" }),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode("text", null, "租用")
          ])
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const buyGroundPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-002acaef"], ["__file", "D:/HBuilderProjects/Game/components/buyGroundPop.vue"]]);
  const _sfc_main$1 = {
    __name: "Ground",
    setup(__props, { expose: __expose }) {
      __expose();
      const clickGroundType = vue.ref("1");
      const isShowGroundPop = vue.ref(false);
      function back() {
        uni.navigateBack({
          delta: 1
        });
      }
      function handleClickGround(type) {
        clickGroundType.value = type;
      }
      function handleIsShowGroundPop(flag) {
        isShowGroundPop.value = flag;
      }
      const __returned__ = { clickGroundType, isShowGroundPop, back, handleClickGround, handleIsShowGroundPop, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, ref: vue.ref, assetsHeader, workerVue, buyGroundPopVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "groundWrap" }, [
      vue.createCommentVNode(" 地皮购买弹窗 "),
      $setup.isShowGroundPop ? (vue.openBlock(), vue.createBlock($setup["buyGroundPopVue"], {
        key: 0,
        groundType: $setup.clickGroundType,
        closePop: () => {
          $setup.handleIsShowGroundPop(false);
        },
        offset: _ctx.scorllOffset
      }, null, 8, ["groundType", "closePop", "offset"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 绝对定位 "),
      vue.createVNode($setup["assetsHeader"], { judge: 2 }),
      vue.createElementVNode("view", {
        class: "return",
        onClick: $setup.back
      }),
      vue.createCommentVNode(" 树木动图 "),
      vue.createElementVNode("view", { class: "treesWrap1" }, [
        vue.createElementVNode("view", { class: "left" }, [
          vue.createElementVNode("view", { class: "lTree1 item1" }),
          vue.createElementVNode("view", { class: "lTree2 item1" }),
          vue.createElementVNode("view", { class: "lTree3 item1" }),
          vue.createElementVNode("view", { class: "lTree4 item1" }),
          vue.createElementVNode("view", { class: "lTree5 item1" })
        ])
      ]),
      vue.createElementVNode("view", { class: "treesWrap2" }, [
        vue.createElementVNode("view", { class: "right" }, [
          vue.createElementVNode("view", { class: "rTree1 item2" }),
          vue.createElementVNode("view", { class: "rTree2 item2" }),
          vue.createElementVNode("view", { class: "rTree3 item2" }),
          vue.createElementVNode("view", { class: "rTree4 item2" }),
          vue.createElementVNode("view", { class: "rTree5 item2" })
        ])
      ]),
      vue.createCommentVNode(" 地皮 "),
      vue.createElementVNode("view", { class: "grounds" }, [
        vue.createElementVNode("view", { class: "item small" }, [
          vue.createElementVNode("view", { class: "realGround type1" }, [
            vue.createElementVNode("view", { class: "personWrap" }, [
              vue.createVNode($setup["workerVue"], {
                type: "2",
                delay: 0
              })
            ])
          ])
        ]),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(3, (item) => {
            return vue.createElementVNode("view", { class: "item scarce" }, [
              vue.createElementVNode("view", { class: "realGround type2" }, [
                vue.createElementVNode("view", { class: "personWrap" }, [
                  vue.createVNode($setup["workerVue"], {
                    type: "1",
                    delay: -item
                  }, null, 8, ["delay"])
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  {
                    class: "lockGround",
                    onClick: _cache[0] || (_cache[0] = () => {
                      $setup.handleClickGround(2);
                      $setup.handleIsShowGroundPop(true);
                    })
                  },
                  [
                    vue.createElementVNode("view", { class: "title" }, [
                      vue.createElementVNode("text", null, "稀缺地皮")
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, false]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        )),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(5, (item) => {
            return vue.createElementVNode("view", { class: "item big" }, [
              vue.createElementVNode("view", { class: "realGround type3" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: "3",
                      delay: -item
                    }, null, 8, ["delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, false]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  {
                    class: "lockGround",
                    onClick: _cache[1] || (_cache[1] = () => {
                      $setup.handleClickGround(3);
                      $setup.handleIsShowGroundPop(true);
                    })
                  },
                  [
                    vue.createElementVNode("view", { class: "title" }, [
                      vue.createElementVNode("text", { style: { "color": "brown" } }, "大地皮")
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, true]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        )),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(6, (item) => {
            return vue.createElementVNode("view", { class: "item resource" }, [
              vue.createElementVNode("view", { class: "realGround type4" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: "3",
                      delay: -item
                    }, null, 8, ["delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, false]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  {
                    class: "lockGround",
                    onClick: _cache[2] || (_cache[2] = () => {
                      $setup.handleClickGround(4);
                      $setup.handleIsShowGroundPop(true);
                    })
                  },
                  [
                    vue.createElementVNode("view", { class: "title" }, [
                      vue.createElementVNode("text", null, "资源地皮")
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, true]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        )),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(8, (item) => {
            return vue.createElementVNode("view", { class: "item black" }, [
              vue.createElementVNode("view", { class: "realGround type5" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: "3",
                      delay: -item
                    }, null, 8, ["delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, false]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  {
                    class: "lockGround",
                    onClick: _cache[3] || (_cache[3] = () => {
                      $setup.handleClickGround(5);
                      $setup.handleIsShowGroundPop(true);
                    })
                  },
                  [
                    vue.createElementVNode("view", { class: "title" }, [
                      vue.createElementVNode("text", { style: { "color": "black" } }, "黑土地皮")
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, true]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        )),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(3, (item) => {
            return vue.createElementVNode("view", { class: "item diamond" }, [
              vue.createElementVNode("view", { class: "realGround type6" }, [
                vue.createElementVNode("view", { class: "diamonds" }, [
                  vue.createElementVNode("view", { class: "d1 item" }),
                  vue.createElementVNode("view", { class: "d2 item" }),
                  vue.createElementVNode("view", { class: "d3 item" })
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: "3",
                      delay: -item
                    }, null, 8, ["delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, false]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  {
                    class: "lockGround",
                    onClick: _cache[4] || (_cache[4] = () => {
                      $setup.handleClickGround(6);
                      $setup.handleIsShowGroundPop(true);
                    })
                  },
                  [
                    vue.createElementVNode("view", { class: "title" }, [
                      vue.createElementVNode("text", { style: {} }, "钻石地皮")
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, true]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 云朵 "),
      vue.createElementVNode("view", { class: "cloudsLeft clouds" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(12, (item) => {
            return vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "leftItem1 leftItem" }),
              vue.createElementVNode("view", { class: "leftItem2 leftItem" })
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "cloudsRight clouds" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(12, (item) => {
            return vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "rightItem1 rightItem" }),
              vue.createElementVNode("view", { class: "rightItem2 rightItem" })
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesGroundGround = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/HBuilderProjects/Game/pages/Ground/Ground.vue"]]);
  __definePage("pages/Mock/Mock", PagesMockMock);
  __definePage("pages/Home/Home", PagesHomeHome);
  __definePage("pages/TradingMarkets/TradingMarkets", PagesTradingMarketsTradingMarkets);
  __definePage("pages/Mine/Mine", PagesMineMine);
  __definePage("pages/Ground/Ground", PagesGroundGround);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/Game/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    return {
      Pinia,
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
