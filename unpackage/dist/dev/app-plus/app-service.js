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
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const pages = [
    {
      path: "pages/login/login",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/MerchantCenter/MerchantCenter",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/HomePage/HomePage",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/Mock/Mock",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/GameHome/GameHome",
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
    },
    {
      path: "pages/UserMerchantCenter/UserMerchantCenter",
      style: {
        navigationStyle: "custom"
      }
    }
  ];
  const globalStyle = {};
  const uniIdRouter = {};
  const e$1 = {
    pages,
    globalStyle,
    uniIdRouter
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t$1(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n$1(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s$1 = n$1(function(e2, t2) {
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
  }), r$1 = s$1, i$1 = (n$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r$1, function(e3) {
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
  }), n$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r$1, void function() {
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
  }), n$1(function(e2, t2) {
    e2.exports = r$1.HmacMD5;
  })), o$1 = n$1(function(e2, t2) {
    e2.exports = r$1.enc.Utf8;
  }), a$1 = n$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r$1, function() {
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
  const c$1 = "FUNCTION", u$1 = "OBJECT", l$1 = "CLIENT_DB", h$1 = "pending", d$1 = "fulfilled", p$1 = "rejected";
  function f$1(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g$1(e2) {
    return "object" === f$1(e2);
  }
  function m$1(e2) {
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
  let v$1 = class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p$1;
        case w:
          return this.status !== h$1;
      }
    }
    exec() {
      return this.needRetry ? (this.status = h$1, this.promise = this.createPromise().then((e2) => (this.status = d$1, Promise.resolve(e2)), (e2) => (this.status = p$1, Promise.reject(e2))), this.promise) : this.promise;
    }
  };
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b$1 = "app", A = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), C$1 = b$1, P = I('{\n    "address": [\n        "127.0.0.1",\n        "2.0.0.1",\n        "169.254.37.199",\n        "192.168.137.1",\n        "192.168.65.1",\n        "172.16.40.200"\n    ],\n    "debugPort": 9001,\n    "initialLaunchType": "remote",\n    "servePort": 7001,\n    "skipFiles": [\n        "<node_internals>/**",\n        "D:/HBuilderX/HBuilderX/plugins/unicloud/**/*.js"\n    ]\n}\n'), T = I('[{"provider":"aliyun","spaceName":"fun-cloud-city-game","spaceId":"mp-4de62d5a-2380-467f-b109-457713276d05","clientSecret":"ZD2WgXn3K1WSmV78nmjvUQ==","endpoint":"https://api.next.bspapp.com"}]') || [];
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
    U[e2] || (U[e2] = {}), g$1(t2) && Object.keys(t2).forEach((n2) => {
      R.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = U[e3][t3];
        s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m$1(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function D(e2, t2) {
    U[e2] || (U[e2] = {}), g$1(t2) ? Object.keys(t2).forEach((n2) => {
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
      m$1(s2) && (t2[n2] = y(s2));
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
    }), n2 = n2.slice(1), i$1(n2, t2).toString();
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
    return a$1.stringify(o$1.parse(e2));
  } };
  var pe = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v$1({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
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
      if ("string" !== f$1(t2))
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
  }, _e = n$1(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r$1, function(e3) {
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
  }), we = _e, ve = n$1(function(e2, t2) {
    e2.exports = r$1.HmacSHA256;
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
  } }, xt = n$1(function(e2, t2) {
    e2.exports = r$1.enc.Hex;
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
      if ("string" !== f$1(t2))
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
          "string" !== f$1(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
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
      ne.request({ method: "POST", url: i2, data: { name: e2.name, platform: C$1, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
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
        ne.request({ method: "POST", url: o2, data: { provider: s2, platform: C$1, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new te({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
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
      throw Nn({ message: `Platform ${C$1} is not enabled, please check whether secure network module is enabled in your manifest.json` });
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
    switch (f$1(e2 = se(e2))) {
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
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l$1, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
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
  const gs = !!e$1.uniIdRouter;
  const { loginPage: ms, routerNeedLogin: ys, resToLogin: _s, needLoginPage: ws, notNeedLoginPage: vs, loginPageInTabBar: Is } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e$1) {
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
  var Us = n$1(function(e2, t2) {
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
  }), Ns = t$1(Us);
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
          const d2 = { name: t2, type: u$1, data: { method: c2, params: l2 } };
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
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${C$1}\``);
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
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === C$1.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function zs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v$1({ createPromise: function() {
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
        e3.__dev__ = t3, t3.debugLog = "app" === C$1;
        const n3 = P;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v$1({ createPromise: function() {
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
              const e5 = n4 && n4.type || c$1;
              s2 = e5 !== c$1;
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
        phone: null,
        avatar: getCache(AVATAR) | "",
        isFirst: getCache(ISFIRST),
        bgm: uni.createInnerAudioContext(),
        assets: {},
        isLoad: false,
        translateX: -340,
        translateY: -320,
        bgmIsOpen: true,
        ownGrounds: null,
        workersMeta: {
          "1": {
            "workerType": 1,
            "name": "艾伦",
            "ability": "每日自动签到",
            // 人才的能力描述
            "retainerPrice": 38,
            // 人才的聘用价格
            "retainerDuration": 10
            // 人才的雇佣时间    
          },
          "2": {
            "workerType": 2,
            "name": "索菲亚",
            "ability": "加成效率30%",
            "retainerPrice": 288,
            "retainerDuration": 10
          },
          "3": {
            "workerType": 3,
            "name": "杰克",
            "ability": "加成效率50%",
            "retainerPrice": 588,
            "retainerDuration": 10
          },
          "4": {
            "workerType": 4,
            "name": "莱塔",
            "ability": "加成效率70%",
            "retainerPrice": 988,
            "retainerDuration": 10
          },
          "5": {
            "workerType": 5,
            "name": "亚历山大",
            "ability": "加成效率90%",
            "retainerPrice": 1988,
            "retainerDuration": 10
          }
        },
        groundsMeta: {
          "1": {
            "groundName": "一级土地",
            "unlockFunds": 98,
            // 解锁租金 
            "duration": 30,
            // 租用时限
            "dailyEarnings": 5.6,
            // 每日收益
            "directPushEarnings": 0.1,
            // 直推收益
            "inDepthReturns": 0.01
            // 间推收益
          },
          "2": {
            "groundName": "资源地皮",
            "unlockFunds": 298,
            "duration": 48,
            "dailyEarnings": 10.3,
            "directPushEarnings": 0.12,
            "inDepthReturns": 0.02
          },
          "3": {
            "groundName": "二级土地",
            "unlockFunds": 698,
            "duration": 118,
            "dailyEarnings": 10.7,
            "directPushEarnings": 0.15,
            "inDepthReturns": 0.03
          },
          "4": {
            "groundName": "三级土地",
            "unlockFunds": 1690,
            "duration": 240,
            "dailyEarnings": 12.5,
            "directPushEarnings": 0.2,
            "inDepthReturns": 0.04
          },
          "5": {
            "groundName": "四级土地",
            "unlockFunds": 5980,
            "duration": 450,
            "dailyEarnings": 35.3,
            "directPushEarnings": 0.25,
            "inDepthReturns": 0.05
          },
          "6": {
            "groundName": "五级土地",
            "unlockFunds": 15980,
            "duration": 900,
            "dailyEarnings": 50,
            "directPushEarnings": 0.3,
            "inDepthReturns": 0.07
          }
        }
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
  const DIAMOND = "diamond";
  const JEWEL = "jewel";
  async function updateOwnGrounds() {
    const gameInfo = useGameInfoStore();
    const userId = uni.getStorageSync("id");
    try {
      if (!userId) {
        formatAppLog("error", "at utils/updateOwnGrounds.js:9", "用户 ID 为空");
        return;
      }
      const res = await Ys.callFunction({
        name: "selectGrounds",
        // 云函数名称
        data: { userId }
        // 传入参数
      });
      formatAppLog("log", "at utils/updateOwnGrounds.js:19", "云函数返回结果:", res);
      if (res.result.code === 0) {
        const classifyGrounds = res.result.data;
        gameInfo.ownGrounds = classifyGrounds;
      } else {
        formatAppLog("error", "at utils/updateOwnGrounds.js:25", "云函数调用失败:", res.result.message);
      }
    } catch (error) {
      formatAppLog("error", "at utils/updateOwnGrounds.js:28", "updateOwnGrounds 出错:", error.message);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$I = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const phone = vue.ref("");
      const password = vue.ref("");
      const repeatPassword = vue.ref("");
      const inviteCode = vue.ref("");
      const isLogin = vue.ref(true);
      const gameInfo = useGameInfoStore();
      function switchTab(tab) {
        isLogin.value = tab === "login";
      }
      function handleInput(field, event) {
      }
      function handleLogin() {
        if (!phone.value || !password.value) {
          uni.showToast({
            title: "请输入手机号和密码",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "登录中...",
          mask: true
          // 防止用户点击穿透
        });
        Ys.callFunction({
          name: "login",
          data: {
            phone: phone.value,
            password: password.value
          }
        }).then((res) => {
          uni.hideLoading();
          const { code, message, data } = res.result;
          if (code === 200) {
            uni.showToast({
              title: "登录成功",
              icon: "success"
            });
            uni.setStorageSync("userInfo", data);
            uni.setStorageSync(PHONE, data.phone);
            uni.setStorageSync(USERNAME, data.userName);
            uni.setStorageSync(PHONE, data.phone);
            uni.setStorageSync(ID, data.userId);
            uni.setStorageSync(AVATAR, data.avatar);
            uni.setStorageSync("wechat", data.wechat || "");
            uni.setStorageSync("gameID", data.gameID);
            gameInfo.id = data.userId;
            gameInfo.userName = data.userName;
            gameInfo.phone = data.phone;
            gameInfo.isFirst = data.isFirst;
            gameInfo.avatar = data.avatar;
            gameInfo.wechat = data.wechat || "";
            updateOwnGrounds();
            uni.navigateTo({
              url: "/pages/HomePage/HomePage"
            });
          } else {
            uni.showToast({
              title: message || "登录失败，请重试",
              icon: "none"
            });
          }
        }).catch((err) => {
          uni.hideLoading();
          formatAppLog("error", "at pages/login/login.vue:147", "登录失败:", err);
          uni.showToast({
            title: "登录失败，服务器错误",
            icon: "none"
          });
        });
      }
      function handleRegister() {
        if (phone.value.length < 6) {
          uni.showToast({
            title: "手机号/帐号长度不能少于6个字符",
            icon: "none"
          });
          return;
        }
        if (password.value < 6) {
          uni.showToast({
            title: "密码长度不能少于6个字符",
            icon: "none"
          });
          return;
        }
        if (password.value !== repeatPassword.value) {
          uni.showToast({
            title: "两次输入的密码不一致",
            icon: "none"
          });
          return;
        }
        if (!phone.value || !password.value || !repeatPassword.value) {
          uni.showToast({
            title: "请填写完整信息",
            icon: "none"
          });
          return;
        }
        uni.showLoading({
          title: "注册中...",
          mask: true
          // 防止用户点击穿透
        });
        Ys.callFunction({
          name: "enroll",
          data: {
            phone: phone.value,
            password: password.value,
            inviteCode: inviteCode.value
          }
        }).then((res) => {
          uni.hideLoading();
          const { code, message, data } = res.result;
          if (code === 200) {
            uni.showToast({
              title: "注册成功",
              icon: "success"
            });
            phone.value = "";
            password.value = "";
            repeatPassword.value = "";
            inviteCode.value = "";
            isLogin.value = true;
          } else if (code === 400) {
            uni.showToast({
              title: message || "该账号已注册，请直接登录或修改账号名",
              icon: "none"
            });
          } else if (code === 401) {
            uni.showToast({
              title: message || "邀请码填写错误, 请重新输入",
              icon: "none"
            });
          } else if (code === 402) {
            uni.showToast({
              title: message || "老用户已有推荐人，无需填写邀请码",
              icon: "none"
            });
          } else {
            uni.showToast({
              title: message || "注册失败，请重试",
              icon: "none"
            });
          }
        }).catch((err) => {
          uni.hideLoading();
          formatAppLog("error", "at pages/login/login.vue:254", "注册失败:", err);
          uni.showToast({
            title: "注册失败，服务器错误",
            icon: "none"
          });
        });
      }
      vue.onMounted(() => {
        const storedPhone = uni.getStorageSync(PHONE);
        if (storedPhone) {
          uni.navigateTo({
            url: "/pages/HomePage/HomePage"
          });
        }
      });
      const __returned__ = { phone, password, repeatPassword, inviteCode, isLogin, gameInfo, switchTab, handleInput, handleLogin, handleRegister, ref: vue.ref, onMounted: vue.onMounted, get AVATAR() {
        return AVATAR;
      }, get ID() {
        return ID;
      }, get PHONE() {
        return PHONE;
      }, get USERNAME() {
        return USERNAME;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get updateOwnGrounds() {
        return updateOwnGrounds;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 标题 "),
      vue.createElementVNode("view", { class: "title" }, "趣选城"),
      vue.createCommentVNode(" Tab 切换 "),
      vue.createElementVNode("view", { class: "tab" }, [
        vue.createElementVNode(
          "button",
          {
            class: vue.normalizeClass(["tab-btn", { active: $setup.isLogin }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.switchTab("login"))
          },
          "登录",
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "button",
          {
            class: vue.normalizeClass(["tab-btn", { active: !$setup.isLogin }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.switchTab("register"))
          },
          "注册",
          2
          /* CLASS */
        )
      ]),
      vue.createCommentVNode(" 提示信息 "),
      vue.createElementVNode("view", { class: "tip" }, [
        vue.createElementVNode("text", null, "老用户需要使用原手机号进行重新注册后进行使用\\n"),
        vue.createTextVNode(" 新用户可随意初始化账户名(建议使用手机号) ")
      ]),
      vue.createCommentVNode(" 登录表单 "),
      $setup.isLogin ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "form"
      }, [
        vue.createElementVNode("view", { class: "input-group" }, [
          vue.createElementVNode("text", { class: "label" }, "电话/帐号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              placeholder: "请输入",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.phone = $event),
              onInput: _cache[3] || (_cache[3] = ($event) => $setup.handleInput("phone", $event))
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, $setup.phone]
          ])
        ]),
        vue.createElementVNode("view", { class: "input-group" }, [
          vue.createElementVNode("text", { class: "label" }, "密码"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              placeholder: "请输入密码",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.password = $event),
              onInput: _cache[5] || (_cache[5] = ($event) => $setup.handleInput("password", $event))
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, $setup.password]
          ])
        ]),
        vue.createElementVNode("button", {
          class: "btn login-btn",
          onClick: $setup.handleLogin
        }, "登录")
      ])) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createCommentVNode(" 注册表单 "),
          vue.createElementVNode("view", { class: "form" }, [
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("text", { class: "label" }, "电话/帐号"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "text",
                  placeholder: "请输入",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.phone = $event),
                  onInput: _cache[7] || (_cache[7] = ($event) => $setup.handleInput("phone", $event))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.phone]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("text", { class: "label" }, "密码"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "password",
                  placeholder: "请输入密码",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.password = $event),
                  onInput: _cache[9] || (_cache[9] = ($event) => $setup.handleInput("password", $event))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.password]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("text", { class: "label" }, "重复密码"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "password",
                  placeholder: "请再次输入密码",
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.repeatPassword = $event),
                  onInput: _cache[11] || (_cache[11] = ($event) => $setup.handleInput("repeatPassword", $event))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.repeatPassword]
              ])
            ]),
            vue.createElementVNode("view", { class: "input-group" }, [
              vue.createElementVNode("text", { class: "label" }, "邀请码"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "text",
                  placeholder: "请输入邀请码(老用户选填, 新用户必填)",
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.inviteCode = $event),
                  onInput: _cache[13] || (_cache[13] = ($event) => $setup.handleInput("inviteCode", $event))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $setup.inviteCode]
              ])
            ]),
            vue.createElementVNode("button", {
              class: "btn register-btn",
              onClick: $setup.handleRegister
            }, "注册")
          ])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__file", "D:/HBuilderProjects/Game/pages/login/login.vue"]]);
  function updateGameInfoFromStorage() {
    const gameInfoStore = useGameInfoStore();
    const userInfo = uni.getStorageSync("userInfo");
    if (userInfo) {
      gameInfoStore.$patch((state) => {
        state.id = userInfo.userId || "";
        state.userName = userInfo.userName || "";
        state.phone = userInfo.phone || "";
        state.avatar = uni.getStorageSync(AVATAR);
        state.isFirst = userInfo.isFirst || 0;
      });
      formatAppLog("log", "at utils/updateGameInfo.js:25", "从本地存储更新 gameInfo 成功");
    } else {
      formatAppLog("warn", "at utils/updateGameInfo.js:27", "本地存储中未找到 userInfo");
    }
  }
  const updateAssets = async () => {
    const gameInfoStore = useGameInfoStore();
    const userId = Cache.getCache("id");
    if (!userId) {
      formatAppLog("error", "at utils/updateGameInfo.js:41", "用户 ID 不存在");
      return;
    }
    try {
      const userRes = await Ys.importObject("user").getUserById(userId);
      if (userRes.code !== 200 || !userRes.data) {
        formatAppLog("error", "at utils/updateGameInfo.js:50", "查询用户信息失败:", userRes.message);
        return;
      }
      const userInfo = userRes.data;
      const id = userInfo._id;
      uni.setStorageSync("userInfo", userInfo);
      updateGameInfoFromStorage();
      const assetsRes = await Ys.importObject("assets").select(id);
      formatAppLog("log", "at utils/updateGameInfo.js:63", "assetsRes: ", assetsRes);
      if (assetsRes.res.affectedDocs === 0 || !assetsRes.res.data) {
        formatAppLog("error", "at utils/updateGameInfo.js:66", "查询资产信息失败:", assetsRes.message);
        return;
      }
      gameInfoStore.$patch((state) => {
        state.assets = assetsRes.res.data[0];
      });
      formatAppLog("log", "at utils/updateGameInfo.js:75", "用户资产信息更新成功");
    } catch (error) {
      formatAppLog("error", "at utils/updateGameInfo.js:77", "初始化失败:", error);
    }
  };
  const getUserAssets = async () => {
    const userId = uni.getStorageSync("id");
    try {
      const res = await Ys.callFunction({
        name: "selectAssets",
        data: {
          userId
        }
      });
      if (res.result.code === 0) {
        const gameInfo = useGameInfoStore();
        gameInfo.assets = res.result.data[0];
        return res.result.data[0];
      } else {
        throw new Error(res.result.message);
      }
    } catch (error) {
      formatAppLog("error", "at utils/updateGameInfo.js:102", "获取用户资源失败:", error);
      throw error;
    }
  };
  const addAssetsChangeRecord = async (userId, resourceType, num, description) => {
    try {
      const result = await Ys.callFunction({
        name: "addAssetsChangeRecord",
        // 云函数名称
        data: {
          userId,
          resourceType,
          num,
          description
        }
      });
      if (result.result.code === 0) {
        return result.result.data;
      } else {
        throw new Error(result.result.message);
      }
    } catch (err) {
      formatAppLog("error", "at utils/addAssetsChangeRecord .js:29", "调用云函数失败:", err.message);
      throw err;
    }
  };
  const assetsNameMap = {
    powerStone: "能量石",
    diamond: "金刚石",
    resourceStone: "资源石",
    jewel: "宝石"
  };
  function roundToOneDecimal(num) {
    return Math.round(num * 100) / 100;
  }
  async function getUserIDByGameID(gameID) {
    if (!gameID) {
      return {
        code: -1,
        message: "gameID 不能为空",
        data: null
      };
    }
    try {
      const res = await Ys.callFunction({
        name: "selectUserIdByGameId",
        // 云函数名称
        data: {
          gameID
          // 传入的 gameID
        }
      });
      return res.result;
    } catch (err) {
      formatAppLog("error", "at utils/getUserIDByGameID.js:27", "调用云函数失败:", err);
      return {
        code: -1,
        message: "网络错误，请稍后重试",
        data: null
      };
    }
  }
  const _imports_0$3 = "/static/market/powerStone.png";
  const _sfc_main$H = {
    __name: "userToShopkeeperPop",
    props: {
      owner: {
        type: Object,
        required: true
      }
    },
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const resourceAmount = vue.ref(0);
      const ownerGameId = vue.ref(props.owner.gameId);
      const currentPowerStoneBalance = vue.computed(() => {
        return gameInfo.assets.powerStone || 0;
      });
      const totalDeduction = vue.computed(() => {
        const amount = parseFloat(resourceAmount.value) || 0;
        const fee = amount * 0.08;
        return roundToOneDecimal(amount + fee);
      });
      const emit = __emit;
      const handleClose = () => {
        emit("close");
      };
      const handleSubmit = async () => {
        if (!ownerGameId.value || !resourceAmount.value || resourceAmount.value < 0) {
          uni.showToast({ title: "请输入完整的游戏ID和能量石数量", icon: "none" });
          return;
        }
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        if (totalDeduction.value > currentPowerStoneBalance.value) {
          uni.showToast({ title: "能量石余额不足", icon: "none" });
          return;
        }
        uni.showLoading({ title: "正在转移资源...", mask: true });
        try {
          const res = await Ys.callFunction({
            name: "sentAssets",
            // 云函数名称
            data: {
              gameID: ownerGameId.value,
              // 店主的游戏ID
              userId,
              // 当前用户的ID
              assetsType: "powerStone",
              // 资源类型（假设为能量石）
              sendNum: parseFloat(resourceAmount.value),
              // 转移数量
              premium: 0.08,
              // 手续费比例
              type: 2
            }
          });
          uni.hideLoading();
          formatAppLog("log", "at components/userToShopkeeperPop.vue:139", "云函数返回结果:", res.result);
          if (res.result.code === 1) {
            uni.showToast({ title: "资源转移成功", icon: "success" });
            await addAssetsChangeRecord(uni.getStorageSync("id"), POWERSTONE, totalDeduction.value, `在商人集市中向游戏ID为${ownerGameId.value}的店主转赠能量石, 扣除(含8%手续费):`);
            const result = await getUserIDByGameID(ownerGameId.value);
            if (result.code === 0) {
              formatAppLog("log", "at components/userToShopkeeperPop.vue:150", "用户唯一 _id:", result.data._id);
              const useId = result.data._id;
              addAssetsChangeRecord(useId, POWERSTONE, roundToOneDecimal(resourceAmount.value * 1.03), `在商人集市中收到游戏ID为${uni.getStorageSync("gameID")}的玩家转赠的能量石, 共收获(含3%手续费):`);
            } else {
              formatAppLog("error", "at components/userToShopkeeperPop.vue:154", "获取用户 _id 失败:", result.message);
            }
            handleClose();
          } else {
            let errorMessage = "资源转移失败";
            switch (res.result.code) {
              case -1:
                errorMessage = "受赠者不存在";
                break;
              case -2:
                errorMessage = "赠送者和受赠者不能为同一用户";
                break;
              case -3:
                errorMessage = "资源不足";
                break;
              case -4:
                errorMessage = "无效的资源类型";
                break;
              default:
                errorMessage = res.result.message || "未知错误";
            }
            uni.showToast({ title: errorMessage, icon: "none" });
          }
        } catch (err) {
          uni.hideLoading();
          formatAppLog("error", "at components/userToShopkeeperPop.vue:182", "调用云函数失败:", err);
          uni.showToast({ title: "网络错误，请稍后重试", icon: "none" });
        }
      };
      vue.onMounted(async () => {
        await updateAssets();
      });
      const __returned__ = { gameInfo, props, resourceAmount, ownerGameId, currentPowerStoneBalance, totalDeduction, emit, handleClose, handleSubmit, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get updateAssets() {
        return updateAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get getUserIDByGameID() {
        return getUserIDByGameID;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "popup-container" }, [
      vue.createCommentVNode(" 遮罩层 "),
      vue.createElementVNode("view", {
        class: "mask",
        onClick: $setup.handleClose
      }),
      vue.createCommentVNode(" 弹窗内容 "),
      vue.createElementVNode("view", { class: "popup-content" }, [
        vue.createCommentVNode(" 关闭按钮 "),
        vue.createElementVNode("view", {
          class: "close-btn",
          onClick: $setup.handleClose
        }, "×"),
        vue.createCommentVNode(" 店主信息 "),
        vue.createElementVNode("view", { class: "owner-info" }, [
          vue.createElementVNode("image", {
            class: "owner-avatar",
            src: $props.owner.avatar,
            mode: "aspectFill"
          }, null, 8, ["src"]),
          vue.createElementVNode(
            "text",
            { class: "owner-name" },
            "店主: " + vue.toDisplayString($props.owner.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "owner-id" },
            "游戏ID: " + vue.toDisplayString($props.owner.gameId),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "owner-wechat" },
            "微信号: " + vue.toDisplayString($props.owner.wechat),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 资源转移表单 "),
        vue.createElementVNode("view", { class: "transfer-form" }, [
          vue.createCommentVNode(" 游戏ID输入框 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("text", { class: "label" }, "店主游戏ID"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "text",
                placeholder: "请输入店主的游戏ID",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.ownerGameId = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.ownerGameId]
            ])
          ]),
          vue.createCommentVNode(" 资源数量输入框 "),
          vue.createElementVNode("view", { class: "input-group" }, [
            vue.createElementVNode("text", { class: "label" }, "所转移能量石数量"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                type: "number",
                placeholder: "请输入能量石数量",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.resourceAmount = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.resourceAmount]
            ])
          ]),
          vue.createCommentVNode(" 当前能量石余额 "),
          vue.createElementVNode("view", { class: "balance-info" }, [
            vue.createElementVNode("image", {
              class: "energy-stone-icon",
              src: _imports_0$3,
              mode: "aspectFit"
            }),
            vue.createElementVNode(
              "text",
              { class: "balance-text" },
              "当前能量石余额: " + vue.toDisplayString($setup.currentPowerStoneBalance),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 手续费显示 "),
          vue.createElementVNode("view", { class: "fee-info" }, [
            vue.createElementVNode("image", {
              class: "energy-stone-icon",
              src: _imports_0$3,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "fee-text" }, "手续费: 8%")
          ]),
          vue.createCommentVNode(" 总扣除能量石数量 "),
          vue.createElementVNode("view", { class: "total-deduction" }, [
            vue.createElementVNode("image", {
              class: "energy-stone-icon",
              src: _imports_0$3,
              mode: "aspectFit"
            }),
            vue.createElementVNode(
              "text",
              { class: "total-text" },
              "总扣除能量石数量: " + vue.toDisplayString($setup.totalDeduction.toFixed(2)),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 确认转移按钮 "),
          vue.createElementVNode("button", {
            class: "submit-btn",
            onClick: $setup.handleSubmit
          }, "确认转移")
        ])
      ])
    ]);
  }
  const UserToShopkeeperPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["__scopeId", "data-v-8237659e"], ["__file", "D:/HBuilderProjects/Game/components/userToShopkeeperPop.vue"]]);
  const _sfc_main$G = {
    __name: "MerchantCenter",
    setup(__props, { expose: __expose }) {
      __expose();
      const isShowPop = vue.ref(false);
      const selectedOwner = vue.ref(null);
      const shopOwners = vue.ref([]);
      async function loadShopOwners() {
        try {
          const res = await Ys.callFunction({
            name: "selectAllMerchant"
            // 调用云函数
          });
          if (res.result.code === 200) {
            shopOwners.value = res.result.data;
          } else {
            uni.showToast({ title: res.result.message || "加载失败", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/MerchantCenter/MerchantCenter.vue:62", "加载失败:", err);
          uni.showToast({ title: "加载失败", icon: "none" });
        }
      }
      vue.onMounted(() => {
        loadShopOwners();
        updateAssets();
      });
      const handlePop = (type) => {
        isShowPop.value = type;
      };
      const handleBack = () => {
        formatAppLog("log", "at pages/MerchantCenter/MerchantCenter.vue:80", "返回上一页");
        uni.navigateTo({
          url: "/pages/HomePage/HomePage"
        });
      };
      const transferResources = (owner) => {
        formatAppLog("log", "at pages/MerchantCenter/MerchantCenter.vue:88", "跳转到资源转移页面，店主信息:", owner);
        selectedOwner.value = owner;
        handlePop(true);
      };
      vue.onMounted(() => {
        updateAssets();
      });
      const __returned__ = { isShowPop, selectedOwner, shopOwners, loadShopOwners, handlePop, handleBack, transferResources, ref: vue.ref, onMounted: vue.onMounted, UserToShopkeeperPopVue, get updateAssets() {
        return updateAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "shop-owner-container" }, [
      vue.createCommentVNode(" 弹窗组件 "),
      $setup.isShowPop ? (vue.openBlock(), vue.createBlock($setup["UserToShopkeeperPopVue"], {
        key: 0,
        owner: $setup.selectedOwner,
        onClose: _cache[0] || (_cache[0] = ($event) => $setup.handlePop(false))
      }, null, 8, ["owner"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" Header "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.handleBack
        }, [
          vue.createElementVNode("text", { class: "icon" }, "←")
        ]),
        vue.createElementVNode("text", { class: "header-title" }, "店主交易大厅")
      ]),
      vue.createCommentVNode(" 店主信息卡片 "),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.shopOwners, (owner, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "shop-owner-card",
            key: index
          }, [
            vue.createCommentVNode(" 店主头像 "),
            vue.createElementVNode("image", {
              class: "owner-avatar",
              src: owner.avatar,
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createCommentVNode(" 店主信息 "),
            vue.createElementVNode("view", { class: "owner-info" }, [
              vue.createElementVNode(
                "text",
                { class: "owner-name" },
                "店主: " + vue.toDisplayString(owner.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "owner-id" },
                "游戏ID: " + vue.toDisplayString(owner.gameId),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "owner-wechat" },
                "微信号: " + vue.toDisplayString(owner.wechat),
                1
                /* TEXT */
              )
            ]),
            vue.createCommentVNode(" 转移资源按钮 "),
            vue.createElementVNode("button", {
              class: "transfer-btn",
              onClick: ($event) => $setup.transferResources(owner)
            }, "转移资源", 8, ["onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesMerchantCenterMerchantCenter = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__file", "D:/HBuilderProjects/Game/pages/MerchantCenter/MerchantCenter.vue"]]);
  const _sfc_main$F = {
    __name: "mart",
    setup(__props, { expose: __expose }) {
      __expose();
      function navigateToBuyMarket() {
        formatAppLog("log", "at components/mart.vue:22", "跳转到求购集市页面");
        uni.navigateTo({ url: "/pages/TradingMarkets/TradingMarkets" });
      }
      function navigateToSellMarket() {
        formatAppLog("log", "at components/mart.vue:28", "跳转到出售集市页面");
        const userInfo = uni.getStorageSync("userInfo");
        formatAppLog("log", "at components/mart.vue:32", "userInfo:", userInfo.isMerchant);
        if (userInfo && userInfo.isMerchant) {
          uni.navigateTo({ url: "/pages/UserMerchantCenter/UserMerchantCenter" });
        } else {
          uni.navigateTo({ url: "/pages/MerchantCenter/MerchantCenter" });
        }
      }
      const __returned__ = { navigateToBuyMarket, navigateToSellMarket };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "market-container" }, [
      vue.createCommentVNode(" 求购集市卡片 "),
      vue.createElementVNode("view", {
        class: "card buy-card",
        onClick: $setup.navigateToBuyMarket
      }, [
        vue.createElementVNode("text", { class: "card-title" }, "交易市集\\n"),
        vue.createElementVNode("text", { class: "card-description" }, "可与玩家进行求购和交易"),
        vue.createElementVNode("view", { class: "card-icon" }, "🛒")
      ]),
      vue.createCommentVNode(" 出售集市卡片 "),
      vue.createElementVNode("view", {
        class: "card sell-card",
        onClick: $setup.navigateToSellMarket
      }, [
        vue.createElementVNode("text", { class: "card-title" }, "商人集市\\n"),
        vue.createElementVNode("text", { class: "card-description" }, "向店主出售物资"),
        vue.createElementVNode("view", { class: "card-icon" }, "💰")
      ])
    ]);
  }
  const martVue = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__scopeId", "data-v-80d3d254"], ["__file", "D:/HBuilderProjects/Game/components/mart.vue"]]);
  const _sfc_main$E = {
    __name: "clickIntoCloudCity",
    setup(__props, { expose: __expose }) {
      __expose();
      function enterCloudCity() {
        uni.navigateTo({ url: "/pages/GameHome/GameHome" });
      }
      const __returned__ = { enterCloudCity, get ID() {
        return ID;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "cloud-city-container" }, [
      vue.createCommentVNode(" 云城背景 "),
      vue.createElementVNode("view", { class: "cloud-city-background" }, [
        vue.createElementVNode("view", { class: "cloud cloud-1" }),
        vue.createElementVNode("view", { class: "cloud cloud-2" }),
        vue.createElementVNode("view", { class: "cloud cloud-3" })
      ]),
      vue.createCommentVNode(" 云城内容区域 "),
      vue.createElementVNode("view", { class: "cloud-city-content" }, [
        vue.createElementVNode("text", { class: "welcome-text" }, "欢迎来到云城\\n"),
        vue.createElementVNode("text", { class: "description-text" }, "探索未知的世界，发现无限可能")
      ]),
      vue.createCommentVNode(" 进入云城按钮 "),
      vue.createElementVNode("view", {
        class: "enter-button",
        onClick: $setup.enterCloudCity
      }, [
        vue.createElementVNode("text", { class: "button-text" }, "进入云城")
      ])
    ]);
  }
  const clickIntoCloudCityVue = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__scopeId", "data-v-9783c51e"], ["__file", "D:/HBuilderProjects/Game/components/clickIntoCloudCity.vue"]]);
  function o(o2) {
    this.mode = r.MODE_8BIT_BYTE, this.data = o2;
  }
  function e(o2, e2) {
    this.typeNumber = o2, this.errorCorrectLevel = e2, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
  }
  o.prototype = { getLength: function(o2) {
    return this.data.length;
  }, write: function(o2) {
    for (var e2 = 0; e2 < this.data.length; e2++)
      o2.put(this.data.charCodeAt(e2), 8);
  } }, e.prototype = { addData: function(e2) {
    var r2 = new o(e2);
    this.dataList.push(r2), this.dataCache = null;
  }, isDark: function(o2, e2) {
    if (o2 < 0 || this.moduleCount <= o2 || e2 < 0 || this.moduleCount <= e2)
      throw new Error(o2 + "," + e2);
    return this.modules[o2][e2];
  }, getModuleCount: function() {
    return this.moduleCount;
  }, make: function() {
    if (this.typeNumber < 1) {
      var o2 = 1;
      for (o2 = 1; o2 < 40; o2++) {
        for (var e2 = v.getRSBlocks(o2, this.errorCorrectLevel), r2 = new p(), t2 = 0, i2 = 0; i2 < e2.length; i2++)
          t2 += e2[i2].dataCount;
        for (i2 = 0; i2 < this.dataList.length; i2++) {
          var n2 = this.dataList[i2];
          r2.put(n2.mode, 4), r2.put(n2.getLength(), h.getLengthInBits(n2.mode, o2)), n2.write(r2);
        }
        if (r2.getLengthInBits() <= 8 * t2)
          break;
      }
      this.typeNumber = o2;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  }, makeImpl: function(o2, r2) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
    for (var t2 = 0; t2 < this.moduleCount; t2++) {
      this.modules[t2] = new Array(this.moduleCount);
      for (var i2 = 0; i2 < this.moduleCount; i2++)
        this.modules[t2][i2] = null;
    }
    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o2, r2), this.typeNumber >= 7 && this.setupTypeNumber(o2), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r2);
  }, setupPositionProbePattern: function(o2, e2) {
    for (var r2 = -1; r2 <= 7; r2++)
      if (!(o2 + r2 <= -1 || this.moduleCount <= o2 + r2))
        for (var t2 = -1; t2 <= 7; t2++)
          e2 + t2 <= -1 || this.moduleCount <= e2 + t2 || (this.modules[o2 + r2][e2 + t2] = 0 <= r2 && r2 <= 6 && (0 == t2 || 6 == t2) || 0 <= t2 && t2 <= 6 && (0 == r2 || 6 == r2) || 2 <= r2 && r2 <= 4 && 2 <= t2 && t2 <= 4);
  }, getBestMaskPattern: function() {
    for (var o2 = 0, e2 = 0, r2 = 0; r2 < 8; r2++) {
      this.makeImpl(true, r2);
      var t2 = h.getLostPoint(this);
      (0 == r2 || o2 > t2) && (o2 = t2, e2 = r2);
    }
    return e2;
  }, createMovieClip: function(o2, e2, r2) {
    var t2 = o2.createEmptyMovieClip(e2, r2);
    this.make();
    for (var i2 = 0; i2 < this.modules.length; i2++)
      for (var n2 = 1 * i2, a2 = 0; a2 < this.modules[i2].length; a2++) {
        var d2 = 1 * a2;
        this.modules[i2][a2] && (t2.beginFill(0, 100), t2.moveTo(d2, n2), t2.lineTo(d2 + 1, n2), t2.lineTo(d2 + 1, n2 + 1), t2.lineTo(d2, n2 + 1), t2.endFill());
      }
    return t2;
  }, setupTimingPattern: function() {
    for (var o2 = 8; o2 < this.moduleCount - 8; o2++)
      null == this.modules[o2][6] && (this.modules[o2][6] = o2 % 2 == 0);
    for (var e2 = 8; e2 < this.moduleCount - 8; e2++)
      null == this.modules[6][e2] && (this.modules[6][e2] = e2 % 2 == 0);
  }, setupPositionAdjustPattern: function() {
    for (var o2 = h.getPatternPosition(this.typeNumber), e2 = 0; e2 < o2.length; e2++)
      for (var r2 = 0; r2 < o2.length; r2++) {
        var t2 = o2[e2], i2 = o2[r2];
        if (null == this.modules[t2][i2])
          for (var n2 = -2; n2 <= 2; n2++)
            for (var a2 = -2; a2 <= 2; a2++)
              this.modules[t2 + n2][i2 + a2] = -2 == n2 || 2 == n2 || -2 == a2 || 2 == a2 || 0 == n2 && 0 == a2;
      }
  }, setupTypeNumber: function(o2) {
    for (var e2 = h.getBCHTypeNumber(this.typeNumber), r2 = 0; r2 < 18; r2++) {
      var t2 = !o2 && 1 == (e2 >> r2 & 1);
      this.modules[Math.floor(r2 / 3)][r2 % 3 + this.moduleCount - 8 - 3] = t2;
    }
    for (r2 = 0; r2 < 18; r2++) {
      t2 = !o2 && 1 == (e2 >> r2 & 1);
      this.modules[r2 % 3 + this.moduleCount - 8 - 3][Math.floor(r2 / 3)] = t2;
    }
  }, setupTypeInfo: function(o2, e2) {
    for (var r2 = this.errorCorrectLevel << 3 | e2, t2 = h.getBCHTypeInfo(r2), i2 = 0; i2 < 15; i2++) {
      var n2 = !o2 && 1 == (t2 >> i2 & 1);
      i2 < 6 ? this.modules[i2][8] = n2 : i2 < 8 ? this.modules[i2 + 1][8] = n2 : this.modules[this.moduleCount - 15 + i2][8] = n2;
    }
    for (i2 = 0; i2 < 15; i2++) {
      n2 = !o2 && 1 == (t2 >> i2 & 1);
      i2 < 8 ? this.modules[8][this.moduleCount - i2 - 1] = n2 : i2 < 9 ? this.modules[8][15 - i2 - 1 + 1] = n2 : this.modules[8][15 - i2 - 1] = n2;
    }
    this.modules[this.moduleCount - 8][8] = !o2;
  }, mapData: function(o2, e2) {
    for (var r2 = -1, t2 = this.moduleCount - 1, i2 = 7, n2 = 0, a2 = this.moduleCount - 1; a2 > 0; a2 -= 2)
      for (6 == a2 && a2--; ; ) {
        for (var d2 = 0; d2 < 2; d2++)
          if (null == this.modules[t2][a2 - d2]) {
            var u2 = false;
            n2 < o2.length && (u2 = 1 == (o2[n2] >>> i2 & 1)), h.getMask(e2, t2, a2 - d2) && (u2 = !u2), this.modules[t2][a2 - d2] = u2, -1 == --i2 && (n2++, i2 = 7);
          }
        if ((t2 += r2) < 0 || this.moduleCount <= t2) {
          t2 -= r2, r2 = -r2;
          break;
        }
      }
  } }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(o2, r2, t2) {
    for (var i2 = v.getRSBlocks(o2, r2), n2 = new p(), a2 = 0; a2 < t2.length; a2++) {
      var d2 = t2[a2];
      n2.put(d2.mode, 4), n2.put(d2.getLength(), h.getLengthInBits(d2.mode, o2)), d2.write(n2);
    }
    var u2 = 0;
    for (a2 = 0; a2 < i2.length; a2++)
      u2 += i2[a2].dataCount;
    if (n2.getLengthInBits() > 8 * u2)
      throw new Error("code length overflow. (" + n2.getLengthInBits() + ">" + 8 * u2 + ")");
    for (n2.getLengthInBits() + 4 <= 8 * u2 && n2.put(0, 4); n2.getLengthInBits() % 8 != 0; )
      n2.putBit(false);
    for (; !(n2.getLengthInBits() >= 8 * u2 || (n2.put(e.PAD0, 8), n2.getLengthInBits() >= 8 * u2)); )
      n2.put(e.PAD1, 8);
    return e.createBytes(n2, i2);
  }, e.createBytes = function(o2, e2) {
    for (var r2 = 0, t2 = 0, i2 = 0, n2 = new Array(e2.length), a2 = new Array(e2.length), d2 = 0; d2 < e2.length; d2++) {
      var u2 = e2[d2].dataCount, s2 = e2[d2].totalCount - u2;
      t2 = Math.max(t2, u2), i2 = Math.max(i2, s2), n2[d2] = new Array(u2);
      for (var g2 = 0; g2 < n2[d2].length; g2++)
        n2[d2][g2] = 255 & o2.buffer[g2 + r2];
      r2 += u2;
      var l2 = h.getErrorCorrectPolynomial(s2), c2 = new f(n2[d2], l2.getLength() - 1).mod(l2);
      a2[d2] = new Array(l2.getLength() - 1);
      for (g2 = 0; g2 < a2[d2].length; g2++) {
        var m2 = g2 + c2.getLength() - a2[d2].length;
        a2[d2][g2] = m2 >= 0 ? c2.get(m2) : 0;
      }
    }
    var v2 = 0;
    for (g2 = 0; g2 < e2.length; g2++)
      v2 += e2[g2].totalCount;
    var p2 = new Array(v2), C2 = 0;
    for (g2 = 0; g2 < t2; g2++)
      for (d2 = 0; d2 < e2.length; d2++)
        g2 < n2[d2].length && (p2[C2++] = n2[d2][g2]);
    for (g2 = 0; g2 < i2; g2++)
      for (d2 = 0; d2 < e2.length; d2++)
        g2 < a2[d2].length && (p2[C2++] = a2[d2][g2]);
    return p2;
  };
  for (var r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function(o2) {
    for (var e2 = o2 << 10; h.getBCHDigit(e2) - h.getBCHDigit(h.G15) >= 0; )
      e2 ^= h.G15 << h.getBCHDigit(e2) - h.getBCHDigit(h.G15);
    return (o2 << 10 | e2) ^ h.G15_MASK;
  }, getBCHTypeNumber: function(o2) {
    for (var e2 = o2 << 12; h.getBCHDigit(e2) - h.getBCHDigit(h.G18) >= 0; )
      e2 ^= h.G18 << h.getBCHDigit(e2) - h.getBCHDigit(h.G18);
    return o2 << 12 | e2;
  }, getBCHDigit: function(o2) {
    for (var e2 = 0; 0 != o2; )
      e2++, o2 >>>= 1;
    return e2;
  }, getPatternPosition: function(o2) {
    return h.PATTERN_POSITION_TABLE[o2 - 1];
  }, getMask: function(o2, e2, r2) {
    switch (o2) {
      case i:
        return (e2 + r2) % 2 == 0;
      case n:
        return e2 % 2 == 0;
      case a:
        return r2 % 3 == 0;
      case d:
        return (e2 + r2) % 3 == 0;
      case u:
        return (Math.floor(e2 / 2) + Math.floor(r2 / 3)) % 2 == 0;
      case s:
        return e2 * r2 % 2 + e2 * r2 % 3 == 0;
      case g:
        return (e2 * r2 % 2 + e2 * r2 % 3) % 2 == 0;
      case l:
        return (e2 * r2 % 3 + (e2 + r2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + o2);
    }
  }, getErrorCorrectPolynomial: function(o2) {
    for (var e2 = new f([1], 0), r2 = 0; r2 < o2; r2++)
      e2 = e2.multiply(new f([1, c.gexp(r2)], 0));
    return e2;
  }, getLengthInBits: function(o2, e2) {
    if (1 <= e2 && e2 < 10)
      switch (o2) {
        case r.MODE_NUMBER:
          return 10;
        case r.MODE_ALPHA_NUM:
          return 9;
        case r.MODE_8BIT_BYTE:
        case r.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + o2);
      }
    else if (e2 < 27)
      switch (o2) {
        case r.MODE_NUMBER:
          return 12;
        case r.MODE_ALPHA_NUM:
          return 11;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + o2);
      }
    else {
      if (!(e2 < 41))
        throw new Error("type:" + e2);
      switch (o2) {
        case r.MODE_NUMBER:
          return 14;
        case r.MODE_ALPHA_NUM:
          return 13;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + o2);
      }
    }
  }, getLostPoint: function(o2) {
    for (var e2 = o2.getModuleCount(), r2 = 0, t2 = 0; t2 < e2; t2++)
      for (var i2 = 0; i2 < e2; i2++) {
        for (var n2 = 0, a2 = o2.isDark(t2, i2), d2 = -1; d2 <= 1; d2++)
          if (!(t2 + d2 < 0 || e2 <= t2 + d2))
            for (var u2 = -1; u2 <= 1; u2++)
              i2 + u2 < 0 || e2 <= i2 + u2 || 0 == d2 && 0 == u2 || a2 == o2.isDark(t2 + d2, i2 + u2) && n2++;
        n2 > 5 && (r2 += 3 + n2 - 5);
      }
    for (t2 = 0; t2 < e2 - 1; t2++)
      for (i2 = 0; i2 < e2 - 1; i2++) {
        var s2 = 0;
        o2.isDark(t2, i2) && s2++, o2.isDark(t2 + 1, i2) && s2++, o2.isDark(t2, i2 + 1) && s2++, o2.isDark(t2 + 1, i2 + 1) && s2++, 0 != s2 && 4 != s2 || (r2 += 3);
      }
    for (t2 = 0; t2 < e2; t2++)
      for (i2 = 0; i2 < e2 - 6; i2++)
        o2.isDark(t2, i2) && !o2.isDark(t2, i2 + 1) && o2.isDark(t2, i2 + 2) && o2.isDark(t2, i2 + 3) && o2.isDark(t2, i2 + 4) && !o2.isDark(t2, i2 + 5) && o2.isDark(t2, i2 + 6) && (r2 += 40);
    for (i2 = 0; i2 < e2; i2++)
      for (t2 = 0; t2 < e2 - 6; t2++)
        o2.isDark(t2, i2) && !o2.isDark(t2 + 1, i2) && o2.isDark(t2 + 2, i2) && o2.isDark(t2 + 3, i2) && o2.isDark(t2 + 4, i2) && !o2.isDark(t2 + 5, i2) && o2.isDark(t2 + 6, i2) && (r2 += 40);
    var g2 = 0;
    for (i2 = 0; i2 < e2; i2++)
      for (t2 = 0; t2 < e2; t2++)
        o2.isDark(t2, i2) && g2++;
    return r2 += 10 * (Math.abs(100 * g2 / e2 / e2 - 50) / 5);
  } }, c = { glog: function(o2) {
    if (o2 < 1)
      throw new Error("glog(" + o2 + ")");
    return c.LOG_TABLE[o2];
  }, gexp: function(o2) {
    for (; o2 < 0; )
      o2 += 255;
    for (; o2 >= 256; )
      o2 -= 255;
    return c.EXP_TABLE[o2];
  }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, m = 0; m < 8; m++)
    c.EXP_TABLE[m] = 1 << m;
  for (m = 8; m < 256; m++)
    c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
  for (m = 0; m < 255; m++)
    c.LOG_TABLE[c.EXP_TABLE[m]] = m;
  function f(o2, e2) {
    if (null == o2.length)
      throw new Error(o2.length + "/" + e2);
    for (var r2 = 0; r2 < o2.length && 0 == o2[r2]; )
      r2++;
    this.num = new Array(o2.length - r2 + e2);
    for (var t2 = 0; t2 < o2.length - r2; t2++)
      this.num[t2] = o2[t2 + r2];
  }
  function v(o2, e2) {
    this.totalCount = o2, this.dataCount = e2;
  }
  function p() {
    this.buffer = new Array(), this.length = 0;
  }
  function C(o2) {
    return o2.setFillStyle = o2.setFillStyle || function(e2) {
      o2.fillStyle = e2;
    }, o2.setFontSize = o2.setFontSize || function(e2) {
      o2.font = `${e2}px`;
    }, o2.setTextAlign = o2.setTextAlign || function(e2) {
      o2.textAlign = e2;
    }, o2.setTextBaseline = o2.setTextBaseline || function(e2) {
      o2.textBaseline = e2;
    }, o2.setGlobalAlpha = o2.setGlobalAlpha || function(e2) {
      o2.globalAlpha = e2;
    }, o2.setStrokeStyle = o2.setStrokeStyle || function(e2) {
      o2.strokeStyle = e2;
    }, o2.setShadow = o2.setShadow || function(e2, r2, t2, i2) {
      o2.shadowOffsetX = e2, o2.shadowOffsetY = r2, o2.shadowBlur = t2, o2.shadowColor = i2;
    }, o2.draw = o2.draw || function(o3, e2) {
      e2 && e2();
    }, o2.clearRect = o2.clearRect || function(e2, r2, t2, i2) {
      o2.draw(false);
    }, o2;
  }
  function b(o2, e2) {
    var r2 = this.data = "", t2 = this.size = 200;
    this.useDynamicSize = false, this.dynamicSize = t2;
    var i2 = this.typeNumber = -1;
    this.errorCorrectLevel = b.errorCorrectLevel.H;
    var n2 = this.margin = 0;
    this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
    var a2 = this.backgroundImageWidth = void 0, d2 = this.backgroundImageHeight = void 0, u2 = this.backgroundImageX = void 0, s2 = this.backgroundImageY = void 0;
    this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
    var g2 = this.backgroundPadding = 0;
    this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
    var l2 = this.foregroundImageWidth = void 0, h2 = this.foregroundImageHeight = void 0, c2 = this.foregroundImageX = void 0, m2 = this.foregroundImageY = void 0, f2 = this.foregroundImagePadding = 0;
    this.foregroundImageBackgroundColor = "#FFFFFF";
    var v2 = this.foregroundImageBorderRadius = 0, p2 = this.foregroundImageShadowOffsetX = 0, k = this.foregroundImageShadowOffsetY = 0, y2 = this.foregroundImageShadowBlur = 0;
    this.foregroundImageShadowColor = "#808080";
    var w2 = this.foregroundPadding = 0, I2 = this.positionProbeBackgroundColor = void 0, B2 = this.positionProbeForegroundColor = void 0, S2 = this.separatorColor = void 0, P2 = this.positionAdjustBackgroundColor = void 0, L2 = this.positionAdjustForegroundColor = void 0, D2 = this.timingBackgroundColor = void 0, A2 = this.timingForegroundColor = void 0, E2 = this.typeNumberBackgroundColor = void 0, T2 = this.typeNumberForegroundColor = void 0, N2 = this.darkBlockColor = void 0;
    this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
    var M2 = this.canvasContext = void 0;
    this.loadImage, this.drawReserve = false, this.isMaked = false, Object.defineProperties(this, { data: { get() {
      if ("" === r2 || void 0 === r2)
        throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: data must be set!"), new b.Error("data must be set!");
      return r2;
    }, set(o3) {
      r2 = String(o3);
    } }, size: { get: () => t2, set(o3) {
      t2 = Number(o3);
    } }, typeNumber: { get: () => i2, set(o3) {
      i2 = Number(o3);
    } }, margin: { get: () => n2, set(o3) {
      n2 = Number(o3);
    } }, backgroundImageWidth: { get() {
      return void 0 === a2 ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a2 : a2;
    }, set(o3) {
      a2 = Number(o3);
    } }, backgroundImageHeight: { get() {
      return void 0 === d2 ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d2 : d2;
    }, set(o3) {
      d2 = Number(o3);
    } }, backgroundImageX: { get() {
      return void 0 === u2 ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u2 : u2;
    }, set(o3) {
      u2 = Number(o3);
    } }, backgroundImageY: { get() {
      return void 0 === s2 ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s2 : s2;
    }, set(o3) {
      s2 = Number(o3);
    } }, backgroundPadding: { get: () => g2, set(o3) {
      g2 = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
    } }, foregroundImageWidth: { get() {
      return void 0 === l2 ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l2 : l2;
    }, set(o3) {
      l2 = Number(o3);
    } }, foregroundImageHeight: { get() {
      return void 0 === h2 ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h2 : h2;
    }, set(o3) {
      h2 = Number(o3);
    } }, foregroundImageX: { get() {
      return void 0 === c2 ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c2 : c2;
    }, set(o3) {
      c2 = Number(o3);
    } }, foregroundImageY: { get() {
      return void 0 === m2 ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m2 : m2;
    }, set(o3) {
      m2 = Number(o3);
    } }, foregroundImagePadding: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * f2 : f2;
    }, set(o3) {
      f2 = Number(o3);
    } }, foregroundImageBorderRadius: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * v2 : v2;
    }, set(o3) {
      v2 = Number(o3);
    } }, foregroundImageShadowOffsetX: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * p2 : p2;
    }, set(o3) {
      p2 = Number(o3);
    } }, foregroundImageShadowOffsetY: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
    }, set(o3) {
      k = Number(o3);
    } }, foregroundImageShadowBlur: { get() {
      return this.useDynamicSize ? this.dynamicSize / this.size * y2 : y2;
    }, set(o3) {
      y2 = Number(o3);
    } }, foregroundPadding: { get: () => w2, set(o3) {
      w2 = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
    } }, positionProbeBackgroundColor: { get() {
      return I2 || this.backgroundColor;
    }, set(o3) {
      I2 = o3;
    } }, positionProbeForegroundColor: { get() {
      return B2 || this.foregroundColor;
    }, set(o3) {
      B2 = o3;
    } }, separatorColor: { get() {
      return S2 || this.backgroundColor;
    }, set(o3) {
      S2 = o3;
    } }, positionAdjustBackgroundColor: { get() {
      return P2 || this.backgroundColor;
    }, set(o3) {
      P2 = o3;
    } }, positionAdjustForegroundColor: { get() {
      return L2 || this.foregroundColor;
    }, set(o3) {
      L2 = o3;
    } }, timingBackgroundColor: { get() {
      return D2 || this.backgroundColor;
    }, set(o3) {
      D2 = o3;
    } }, timingForegroundColor: { get() {
      return A2 || this.foregroundColor;
    }, set(o3) {
      A2 = o3;
    } }, typeNumberBackgroundColor: { get() {
      return E2 || this.backgroundColor;
    }, set(o3) {
      E2 = o3;
    } }, typeNumberForegroundColor: { get() {
      return T2 || this.foregroundColor;
    }, set(o3) {
      T2 = o3;
    } }, darkBlockColor: { get() {
      return N2 || this.foregroundColor;
    }, set(o3) {
      N2 = o3;
    } }, canvasContext: { get() {
      if (void 0 === M2)
        throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: use drawCanvas, you need to set the canvasContext!"), new b.Error("use drawCanvas, you need to set the canvasContext!");
      return M2;
    }, set(o3) {
      M2 = C(o3);
    } } }), b.plugins.forEach((o3) => o3(b, this, false)), o2 && this.setOptions(o2), e2 && (this.canvasContext = C(e2));
  }
  f.prototype = { get: function(o2) {
    return this.num[o2];
  }, getLength: function() {
    return this.num.length;
  }, multiply: function(o2) {
    for (var e2 = new Array(this.getLength() + o2.getLength() - 1), r2 = 0; r2 < this.getLength(); r2++)
      for (var t2 = 0; t2 < o2.getLength(); t2++)
        e2[r2 + t2] ^= c.gexp(c.glog(this.get(r2)) + c.glog(o2.get(t2)));
    return new f(e2, 0);
  }, mod: function(o2) {
    if (this.getLength() - o2.getLength() < 0)
      return this;
    for (var e2 = c.glog(this.get(0)) - c.glog(o2.get(0)), r2 = new Array(this.getLength()), t2 = 0; t2 < this.getLength(); t2++)
      r2[t2] = this.get(t2);
    for (t2 = 0; t2 < o2.getLength(); t2++)
      r2[t2] ^= c.gexp(c.glog(o2.get(t2)) + e2);
    return new f(r2, 0).mod(o2);
  } }, v.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], v.getRSBlocks = function(o2, e2) {
    var r2 = v.getRsBlockTable(o2, e2);
    if (null == r2)
      throw new Error("bad rs block @ typeNumber:" + o2 + "/errorCorrectLevel:" + e2);
    for (var t2 = r2.length / 3, i2 = new Array(), n2 = 0; n2 < t2; n2++)
      for (var a2 = r2[3 * n2 + 0], d2 = r2[3 * n2 + 1], u2 = r2[3 * n2 + 2], s2 = 0; s2 < a2; s2++)
        i2.push(new v(d2, u2));
    return i2;
  }, v.getRsBlockTable = function(o2, e2) {
    switch (e2) {
      case t.L:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 0];
      case t.M:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 1];
      case t.Q:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 2];
      case t.H:
        return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 3];
      default:
        return;
    }
  }, p.prototype = { get: function(o2) {
    var e2 = Math.floor(o2 / 8);
    return 1 == (this.buffer[e2] >>> 7 - o2 % 8 & 1);
  }, put: function(o2, e2) {
    for (var r2 = 0; r2 < e2; r2++)
      this.putBit(1 == (o2 >>> e2 - r2 - 1 & 1));
  }, getLengthInBits: function() {
    return this.length;
  }, putBit: function(o2) {
    var e2 = Math.floor(this.length / 8);
    this.buffer.length <= e2 && this.buffer.push(0), o2 && (this.buffer[e2] |= 128 >>> this.length % 8), this.length++;
  } }, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function(o2) {
    this.errMsg = "[uQRCode]: " + o2;
  }, b.plugins = [], b.use = function(o2) {
    "function" == typeof o2 && b.plugins.push(o2);
  }, b.prototype.loadImage = function(o2) {
    return Promise.resolve(o2);
  }, b.prototype.setOptions = function(o2) {
    var e2, r2, t2, i2, n2, a2, d2, u2, s2, g2, l2, h2, c2, m2, f2, v2, p2, C2, b2, k, y2, w2, I2, B2, S2, P2, L2, D2, A2, E2, T2, N2, M2, z2, R2, _2, O2, F2, x, H2, X2, Y2, j2, W2, G2, K2, Q2, U2, $2, J2, q2, V2, Z2, oo, eo, ro;
    o2 && (Object.keys(o2).forEach((e3) => {
      this[e3] = o2[e3];
    }), function(o3 = {}, e3 = {}, r3 = false) {
      let t3;
      t3 = r3 ? o3 : { ...o3 };
      for (let o4 in e3) {
        var i3 = e3[o4];
        null != i3 && (i3.constructor == Object ? t3[o4] = this.deepReplace(t3[o4], i3) : i3.constructor != String || i3 ? t3[o4] = i3 : t3[o4] = t3[o4]);
      }
    }(this, { data: o2.data || o2.text, size: o2.size, useDynamicSize: o2.useDynamicSize, typeNumber: o2.typeNumber, errorCorrectLevel: o2.errorCorrectLevel, margin: o2.margin, areaColor: o2.areaColor, backgroundColor: o2.backgroundColor || (null === (e2 = o2.background) || void 0 === e2 ? void 0 : e2.color), backgroundImageSrc: o2.backgroundImageSrc || (null === (r2 = o2.background) || void 0 === r2 || null === (t2 = r2.image) || void 0 === t2 ? void 0 : t2.src), backgroundImageWidth: o2.backgroundImageWidth || (null === (i2 = o2.background) || void 0 === i2 || null === (n2 = i2.image) || void 0 === n2 ? void 0 : n2.width), backgroundImageHeight: o2.backgroundImageHeight || (null === (a2 = o2.background) || void 0 === a2 || null === (d2 = a2.image) || void 0 === d2 ? void 0 : d2.height), backgroundImageX: o2.backgroundImageX || (null === (u2 = o2.background) || void 0 === u2 || null === (s2 = u2.image) || void 0 === s2 ? void 0 : s2.x), backgroundImageY: o2.backgroundImageY || (null === (g2 = o2.background) || void 0 === g2 || null === (l2 = g2.image) || void 0 === l2 ? void 0 : l2.y), backgroundImageAlpha: o2.backgroundImageAlpha || (null === (h2 = o2.background) || void 0 === h2 || null === (c2 = h2.image) || void 0 === c2 ? void 0 : c2.alpha), backgroundImageBorderRadius: o2.backgroundImageBorderRadius || (null === (m2 = o2.background) || void 0 === m2 || null === (f2 = m2.image) || void 0 === f2 ? void 0 : f2.borderRadius), backgroundPadding: o2.backgroundPadding, foregroundColor: o2.foregroundColor || (null === (v2 = o2.foreground) || void 0 === v2 ? void 0 : v2.color), foregroundImageSrc: o2.foregroundImageSrc || (null === (p2 = o2.foreground) || void 0 === p2 || null === (C2 = p2.image) || void 0 === C2 ? void 0 : C2.src), foregroundImageWidth: o2.foregroundImageWidth || (null === (b2 = o2.foreground) || void 0 === b2 || null === (k = b2.image) || void 0 === k ? void 0 : k.width), foregroundImageHeight: o2.foregroundImageHeight || (null === (y2 = o2.foreground) || void 0 === y2 || null === (w2 = y2.image) || void 0 === w2 ? void 0 : w2.height), foregroundImageX: o2.foregroundImageX || (null === (I2 = o2.foreground) || void 0 === I2 || null === (B2 = I2.image) || void 0 === B2 ? void 0 : B2.x), foregroundImageY: o2.foregroundImageY || (null === (S2 = o2.foreground) || void 0 === S2 || null === (P2 = S2.image) || void 0 === P2 ? void 0 : P2.y), foregroundImagePadding: o2.foregroundImagePadding || (null === (L2 = o2.foreground) || void 0 === L2 || null === (D2 = L2.image) || void 0 === D2 ? void 0 : D2.padding), foregroundImageBackgroundColor: o2.foregroundImageBackgroundColor || (null === (A2 = o2.foreground) || void 0 === A2 || null === (E2 = A2.image) || void 0 === E2 ? void 0 : E2.backgroundColor), foregroundImageBorderRadius: o2.foregroundImageBorderRadius || (null === (T2 = o2.foreground) || void 0 === T2 || null === (N2 = T2.image) || void 0 === N2 ? void 0 : N2.borderRadius), foregroundImageShadowOffsetX: o2.foregroundImageShadowOffsetX || (null === (M2 = o2.foreground) || void 0 === M2 || null === (z2 = M2.image) || void 0 === z2 ? void 0 : z2.shadowOffsetX), foregroundImageShadowOffsetY: o2.foregroundImageShadowOffsetY || (null === (R2 = o2.foreground) || void 0 === R2 || null === (_2 = R2.image) || void 0 === _2 ? void 0 : _2.shadowOffsetY), foregroundImageShadowBlur: o2.foregroundImageShadowBlur || (null === (O2 = o2.foreground) || void 0 === O2 || null === (F2 = O2.image) || void 0 === F2 ? void 0 : F2.shadowBlur), foregroundImageShadowColor: o2.foregroundImageShadowColor || (null === (x = o2.foreground) || void 0 === x || null === (H2 = x.image) || void 0 === H2 ? void 0 : H2.shadowColor), foregroundPadding: o2.foregroundPadding, positionProbeBackgroundColor: o2.positionProbeBackgroundColor || (null === (X2 = o2.positionProbe) || void 0 === X2 ? void 0 : X2.backgroundColor) || (null === (Y2 = o2.positionDetection) || void 0 === Y2 ? void 0 : Y2.backgroundColor), positionProbeForegroundColor: o2.positionProbeForegroundColor || (null === (j2 = o2.positionProbe) || void 0 === j2 ? void 0 : j2.foregroundColor) || (null === (W2 = o2.positionDetection) || void 0 === W2 ? void 0 : W2.foregroundColor), separatorColor: o2.separatorColor || (null === (G2 = o2.separator) || void 0 === G2 ? void 0 : G2.color), positionAdjustBackgroundColor: o2.positionAdjustBackgroundColor || (null === (K2 = o2.positionAdjust) || void 0 === K2 ? void 0 : K2.backgroundColor) || (null === (Q2 = o2.alignment) || void 0 === Q2 ? void 0 : Q2.backgroundColor), positionAdjustForegroundColor: o2.positionAdjustForegroundColor || (null === (U2 = o2.positionAdjust) || void 0 === U2 ? void 0 : U2.foregroundColor) || (null === ($2 = o2.alignment) || void 0 === $2 ? void 0 : $2.foregroundColor), timingBackgroundColor: o2.timingBackgroundColor || (null === (J2 = o2.timing) || void 0 === J2 ? void 0 : J2.backgroundColor), timingForegroundColor: o2.timingForegroundColor || (null === (q2 = o2.timing) || void 0 === q2 ? void 0 : q2.foregroundColor), typeNumberBackgroundColor: o2.typeNumberBackgroundColor || (null === (V2 = o2.typeNumber) || void 0 === V2 ? void 0 : V2.backgroundColor) || (null === (Z2 = o2.versionInformation) || void 0 === Z2 ? void 0 : Z2.backgroundColor), typeNumberForegroundColor: o2.typeNumberForegroundColor || (null === (oo = o2.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o2.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor), darkBlockColor: o2.darkBlockColor || (null === (ro = o2.darkBlock) || void 0 === ro ? void 0 : ro.color) }, true));
  }, b.prototype.make = function() {
    let { foregroundColor: o2, backgroundColor: r2, typeNumber: t2, errorCorrectLevel: i2, data: n2, size: a2, margin: d2, useDynamicSize: u2 } = this;
    if (o2 === r2)
      throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: foregroundColor and backgroundColor cannot be the same!"), new b.Error("foregroundColor and backgroundColor cannot be the same!");
    var s2 = new e(t2, i2);
    s2.addData(function(o3) {
      o3 = o3.toString();
      for (var e2, r3 = "", t3 = 0; t3 < o3.length; t3++)
        (e2 = o3.charCodeAt(t3)) >= 1 && e2 <= 127 ? r3 += o3.charAt(t3) : e2 > 2047 ? (r3 += String.fromCharCode(224 | e2 >> 12 & 15), r3 += String.fromCharCode(128 | e2 >> 6 & 63), r3 += String.fromCharCode(128 | e2 >> 0 & 63)) : (r3 += String.fromCharCode(192 | e2 >> 6 & 31), r3 += String.fromCharCode(128 | e2 >> 0 & 63));
      return r3;
    }(n2)), s2.make(), this.base = s2, this.typeNumber = s2.typeNumber, this.modules = s2.modules, this.moduleCount = s2.moduleCount, this.dynamicSize = u2 ? Math.ceil((a2 - 2 * d2) / s2.moduleCount) * s2.moduleCount + 2 * d2 : a2, function(o3) {
      let { dynamicSize: e2, margin: r3, backgroundColor: t3, backgroundPadding: i3, foregroundColor: n3, foregroundPadding: a3, modules: d3, moduleCount: u3 } = o3, s3 = (e2 - 2 * r3) / u3, g2 = s3, l2 = 0;
      i3 > 0 && (l2 = g2 * i3 / 2, g2 -= 2 * l2);
      let h2 = s3, c2 = 0;
      a3 > 0 && (c2 = h2 * a3 / 2, h2 -= 2 * c2);
      for (var m2 = 0; m2 < u3; m2++)
        for (var f2 = 0; f2 < u3; f2++) {
          var v2 = f2 * s3 + r3, p2 = m2 * s3 + r3;
          if (d3[m2][f2]) {
            var C2 = c2, b2 = v2 + c2, k = p2 + c2, y2 = h2, w2 = h2;
            d3[m2][f2] = { type: ["foreground"], color: n3, isBlack: true, isDrawn: false, destX: v2, destY: p2, destWidth: s3, destHeight: s3, x: b2, y: k, width: y2, height: w2, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
          } else
            C2 = l2, b2 = v2 + l2, k = p2 + l2, y2 = g2, w2 = g2, d3[m2][f2] = { type: ["background"], color: t3, isBlack: false, isDrawn: false, destX: v2, destY: p2, destWidth: s3, destHeight: s3, x: b2, y: k, width: y2, height: w2, paddingTop: C2, paddingRight: C2, paddingBottom: C2, paddingLeft: C2 };
        }
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, positionProbeBackgroundColor: t3, positionProbeForegroundColor: i3 } = o3, n3 = r3 - 7;
      [[0, 0, 1], [1, 0, 1], [2, 0, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 0, 1], [0, 1, 1], [1, 1, 0], [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0], [6, 1, 1], [0, 2, 1], [1, 2, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 0], [6, 2, 1], [0, 3, 1], [1, 3, 0], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 3, 0], [6, 3, 1], [0, 4, 1], [1, 4, 0], [2, 4, 1], [3, 4, 1], [4, 4, 1], [5, 4, 0], [6, 4, 1], [0, 5, 1], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [5, 5, 0], [6, 5, 1], [0, 6, 1], [1, 6, 1], [2, 6, 1], [3, 6, 1], [4, 6, 1], [5, 6, 1], [6, 6, 1]].forEach((o4) => {
        var r4 = e2[o4[0]][o4[1]], a3 = e2[o4[0] + n3][o4[1]], d3 = e2[o4[0]][o4[1] + n3];
        d3.type.push("positionProbe"), a3.type.push("positionProbe"), r4.type.push("positionProbe"), r4.color = 1 == o4[2] ? i3 : t3, a3.color = 1 == o4[2] ? i3 : t3, d3.color = 1 == o4[2] ? i3 : t3;
      });
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, separatorColor: t3 } = o3;
      [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]].forEach((o4) => {
        var i3 = e2[o4[0]][o4[1]], n3 = e2[r3 - o4[0] - 1][o4[1]], a3 = e2[o4[0]][r3 - o4[1] - 1];
        a3.type.push("separator"), n3.type.push("separator"), i3.type.push("separator"), i3.color = t3, n3.color = t3, a3.color = t3;
      });
    }(this), function(o3) {
      let { typeNumber: e2, modules: r3, moduleCount: t3, foregroundColor: i3, backgroundColor: n3, positionAdjustForegroundColor: a3, positionAdjustBackgroundColor: d3, timingForegroundColor: u3, timingBackgroundColor: s3 } = o3;
      const g2 = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]][e2 - 1];
      if (g2) {
        const o4 = [[-2, -2, 1], [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1], [-2, -1, 1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [2, -1, 1], [-2, 0, 1], [-1, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 1], [-2, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 1], [-2, 2, 1], [-1, 2, 1], [0, 2, 1], [1, 2, 1], [2, 2, 1]], e3 = g2.length;
        for (let l2 = 0; l2 < e3; l2++)
          for (let h2 = 0; h2 < e3; h2++) {
            let { x: e4, y: c2 } = { x: g2[l2], y: g2[h2] };
            e4 < 9 && c2 < 9 || e4 > t3 - 9 - 1 && c2 < 9 || c2 > t3 - 9 - 1 && e4 < 9 || o4.forEach((o5) => {
              var t4 = r3[e4 + o5[0]][c2 + o5[1]];
              t4.type.push("positionAdjust"), t4.type.includes("timing") ? 1 == o5[2] ? t4.color = a3 == i3 ? u3 : a3 : t4.color = a3 == i3 && d3 == n3 ? s3 : d3 : t4.color = 1 == o5[2] ? a3 : d3;
            });
          }
      }
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, timingForegroundColor: t3, timingBackgroundColor: i3 } = o3, n3 = r3 - 16;
      for (let o4 = 0; o4 < n3; o4++) {
        var a3 = e2[6][8 + o4], d3 = e2[8 + o4][6];
        a3.type.push("timing"), d3.type.push("timing"), a3.color = 1 & o4 ^ 1 ? t3 : i3, d3.color = 1 & o4 ^ 1 ? t3 : i3;
      }
    }(this), function(o3) {
      let { modules: e2, moduleCount: r3, darkBlockColor: t3 } = o3;
      var i3 = e2[r3 - 7 - 1][8];
      i3.type.push("darkBlock"), i3.color = t3;
    }(this), function(o3) {
      let { typeNumber: e2, modules: r3, moduleCount: t3, typeNumberBackgroundColor: i3, typeNumberForegroundColor: n3 } = o3;
      if (e2 < 7)
        return r3;
      const a3 = [0, 0, 0, 0, 0, 0, 0, "000111110010010100", "001000010110111100", "001001101010011001", "001010010011010011", "001011101111110110", "001100011101100010", "001101100001000111", "001110011000001101", "001111100100101000", "010000101101111000", "010001010001011101", "010010101000010111", "010011010100110010", "010100100110100110", "010101011010000011", "010110100011001001", "010111011111101100", "011000111011000100", "011001000111100001", "011010111110101011", "011011000010001110", "011100110000011010", "011101001100111111", "011110110101110101", "011111001001010000", "100000100111010101", "100001011011110000", "100010100010111010", "100011011110011111", "100100101100001011", "100101010000101110", "100110101001100100", "100111010101000001", "101000110001101001"];
      let d3 = a3[e2] + a3[e2], u3 = [t3 - 11, t3 - 10, t3 - 9];
      [[5, u3[2]], [5, u3[1]], [5, u3[0]], [4, u3[2]], [4, u3[1]], [4, u3[0]], [3, u3[2]], [3, u3[1]], [3, u3[0]], [2, u3[2]], [2, u3[1]], [2, u3[0]], [1, u3[2]], [1, u3[1]], [1, u3[0]], [0, u3[2]], [0, u3[1]], [0, u3[0]], [u3[2], 5], [u3[1], 5], [u3[0], 5], [u3[2], 4], [u3[1], 4], [u3[0], 4], [u3[2], 3], [u3[1], 3], [u3[0], 3], [u3[2], 2], [u3[1], 2], [u3[0], 2], [u3[2], 1], [u3[1], 1], [u3[0], 1], [u3[2], 0], [u3[1], 0], [u3[0], 0]].forEach((o4, e3) => {
        var t4 = r3[o4[0]][o4[1]];
        t4.type.push("typeNumber"), t4.color = "1" == d3[e3] ? n3 : i3;
      });
    }(this), this.isMaked = true, this.drawModules = [];
  }, b.prototype.getDrawModules = function() {
    if (this.drawModules && this.drawModules.length > 0)
      return this.drawModules;
    let o2 = this.drawModules = [], { modules: e2, moduleCount: r2, dynamicSize: t2, areaColor: i2, backgroundImageSrc: n2, backgroundImageX: a2, backgroundImageY: d2, backgroundImageWidth: u2, backgroundImageHeight: s2, backgroundImageAlpha: g2, backgroundImageBorderRadius: l2, foregroundImageSrc: h2, foregroundImageX: c2, foregroundImageY: m2, foregroundImageWidth: f2, foregroundImageHeight: v2, foregroundImagePadding: p2, foregroundImageBackgroundColor: C2, foregroundImageBorderRadius: b2, foregroundImageShadowOffsetX: k, foregroundImageShadowOffsetY: y2, foregroundImageShadowBlur: w2, foregroundImageShadowColor: I2 } = this;
    i2 && o2.push({ name: "area", type: "area", color: i2, x: 0, y: 0, width: t2, height: t2 }), n2 && o2.push({ name: "backgroundImage", type: "image", imageSrc: n2, mappingName: "backgroundImageSrc", x: a2, y: d2, width: u2, height: s2, alpha: g2, borderRadius: l2 });
    for (var B2 = 0; B2 < r2; B2++)
      for (var S2 = 0; S2 < r2; S2++) {
        var P2 = e2[B2][S2];
        P2.isDrawn || (P2.type.includes("foreground") ? o2.push({ name: "foreground", type: "tile", color: P2.color, destX: P2.destX, destY: P2.destY, destWidth: P2.destWidth, destHeight: P2.destHeight, x: P2.x, y: P2.y, width: P2.width, height: P2.height, paddingTop: P2.paddingTop, paddingRight: P2.paddingRight, paddingBottom: P2.paddingBottom, paddingLeft: P2.paddingLeft, rowIndex: B2, colIndex: S2 }) : o2.push({ name: "background", type: "tile", color: P2.color, destX: P2.destX, destY: P2.destY, destWidth: P2.destWidth, destHeight: P2.destHeight, x: P2.x, y: P2.y, width: P2.width, height: P2.height, paddingTop: P2.paddingTop, paddingRight: P2.paddingRight, paddingBottom: P2.paddingBottom, paddingLeft: P2.paddingLeft, rowIndex: B2, colIndex: S2 }), P2.isDrawn = true);
      }
    return h2 && o2.push({ name: "foregroundImage", type: "image", imageSrc: h2, mappingName: "foregroundImageSrc", x: c2, y: m2, width: f2, height: v2, padding: p2, backgroundColor: C2, borderRadius: b2, shadowOffsetX: k, shadowOffsetY: y2, shadowBlur: w2, shadowColor: I2 }), o2;
  }, b.prototype.isBlack = function(o2, e2) {
    var r2 = this.moduleCount;
    return !(0 > o2 || 0 > e2 || o2 >= r2 || e2 >= r2) && this.modules[o2][e2].isBlack;
  }, b.prototype.drawCanvas = function() {
    let { isMaked: o2, canvasContext: e2, useDynamicSize: r2, dynamicSize: t2, foregroundColor: i2, foregroundPadding: n2, backgroundColor: a2, backgroundPadding: d2, drawReserve: u2, margin: s2 } = this;
    if (!o2)
      return formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", "[uQRCode]: please execute the make method first!"), Promise.reject(new b.Error("please execute the make method first!"));
    let g2 = this.getDrawModules(), l2 = async (o3, r3) => {
      try {
        e2.clearRect(0, 0, t2, t2), e2.draw(false);
        for (var i3 = 0; i3 < g2.length; i3++) {
          var n3 = g2[i3];
          switch (e2.save(), n3.type) {
            case "area":
              e2.setFillStyle(n3.color), e2.fillRect(n3.x, n3.y, n3.width, n3.height);
              break;
            case "tile":
              var a3 = n3.x, d3 = n3.y, s3 = n3.width, l3 = n3.height;
              e2.setFillStyle(n3.color), e2.fillRect(a3, d3, s3, l3);
              break;
            case "image":
              if ("backgroundImage" === n3.name) {
                a3 = Math.round(n3.x), d3 = Math.round(n3.y), s3 = Math.round(n3.width), l3 = Math.round(n3.height);
                s3 < 2 * (c2 = Math.round(n3.borderRadius)) && (c2 = s3 / 2), l3 < 2 * c2 && (c2 = l3 / 2), e2.setGlobalAlpha(n3.alpha), c2 > 0 && (e2.beginPath(), e2.moveTo(a3 + c2, d3), e2.arcTo(a3 + s3, d3, a3 + s3, d3 + l3, c2), e2.arcTo(a3 + s3, d3 + l3, a3, d3 + l3, c2), e2.arcTo(a3, d3 + l3, a3, d3, c2), e2.arcTo(a3, d3, a3 + s3, d3, c2), e2.closePath(), e2.setStrokeStyle("rgba(0,0,0,0)"), e2.stroke(), e2.clip());
                try {
                  var h2 = await this.loadImage(n3.imageSrc);
                  e2.drawImage(h2, a3, d3, s3, l3);
                } catch (o4) {
                  throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", `[uQRCode]: ${n3.mappingName} invalid!`), new b.Error(`${n3.mappingName} invalid!`);
                }
              } else if ("foregroundImage" === n3.name) {
                a3 = Math.round(n3.x), d3 = Math.round(n3.y), s3 = Math.round(n3.width), l3 = Math.round(n3.height);
                var c2, m2 = Math.round(n3.padding);
                s3 < 2 * (c2 = Math.round(n3.borderRadius)) && (c2 = s3 / 2), l3 < 2 * c2 && (c2 = l3 / 2);
                var f2 = a3 - m2, v2 = d3 - m2, p2 = s3 + 2 * m2, C2 = l3 + 2 * m2, k = Math.round(p2 / s3 * c2);
                p2 < 2 * k && (k = p2 / 2), C2 < 2 * k && (k = C2 / 2), e2.save(), e2.setShadow(n3.shadowOffsetX, n3.shadowOffsetY, n3.shadowBlur, n3.shadowColor), k > 0 ? (e2.beginPath(), e2.moveTo(f2 + k, v2), e2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), e2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), e2.arcTo(f2, v2 + C2, f2, v2, k), e2.arcTo(f2, v2, f2 + p2, v2, k), e2.closePath(), e2.setFillStyle(n3.backgroundColor), e2.fill()) : (e2.setFillStyle(n3.backgroundColor), e2.fillRect(f2, v2, p2, C2)), e2.restore(), e2.save(), k > 0 ? (e2.beginPath(), e2.moveTo(f2 + k, v2), e2.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), e2.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), e2.arcTo(f2, v2 + C2, f2, v2, k), e2.arcTo(f2, v2, f2 + p2, v2, k), e2.closePath(), e2.setFillStyle(m2 > 0 ? n3.backgroundColor : "rgba(0,0,0,0)"), e2.fill()) : (e2.setFillStyle(m2 > 0 ? n3.backgroundColor : "rgba(0,0,0,0)"), e2.fillRect(f2, v2, p2, C2)), e2.restore(), c2 > 0 && (e2.beginPath(), e2.moveTo(a3 + c2, d3), e2.arcTo(a3 + s3, d3, a3 + s3, d3 + l3, c2), e2.arcTo(a3 + s3, d3 + l3, a3, d3 + l3, c2), e2.arcTo(a3, d3 + l3, a3, d3, c2), e2.arcTo(a3, d3, a3 + s3, d3, c2), e2.closePath(), e2.setStrokeStyle("rgba(0,0,0,0)"), e2.stroke(), e2.clip());
                try {
                  h2 = await this.loadImage(n3.imageSrc);
                  e2.drawImage(h2, a3, d3, s3, l3);
                } catch (o4) {
                  throw formatAppLog("error", "at uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js:34", `[uQRCode]: ${n3.mappingName} invalid!`), new b.Error(`${n3.mappingName} invalid!`);
                }
              }
          }
          u2 && e2.draw(true), e2.restore();
        }
        e2.draw(true), setTimeout(o3, 150);
      } catch (o4) {
        if (!(o4 instanceof b.Error))
          throw o4;
        r3(o4);
      }
    };
    return new Promise((o3, e3) => {
      l2(o3, e3);
    });
  }, b.prototype.draw = function() {
    return this.drawCanvas();
  }, b.prototype.register = function(o2) {
    o2 && o2(b, this, true);
  };
  function Queue() {
    let waitingQueue = this.waitingQueue = [];
    let isRunning = this.isRunning = false;
    function execute(task, resolve, reject) {
      task().then((data) => {
        resolve(data);
      }).catch((e2) => {
        reject(e2);
      }).finally(() => {
        if (waitingQueue.length) {
          const next = waitingQueue.shift();
          execute(next.task, next.resolve, next.reject);
        } else {
          isRunning = false;
        }
      });
    }
    this.exec = function(task) {
      return new Promise((resolve, reject) => {
        if (isRunning) {
          waitingQueue.push({
            task,
            resolve,
            reject
          });
        } else {
          isRunning = true;
          execute(task, resolve, reject);
        }
      });
    };
  }
  const queueDraw = new Queue();
  const queueLoadImage = new Queue();
  const cacheImageList = [];
  let instance = null;
  const _sfc_main$D = {
    name: "uqrcode",
    props: {
      /**
       * canvas组件id
       */
      canvasId: {
        type: String,
        required: true
        // canvasId在微信小程序初始值不能为空，created中赋值也不行，必须给一个值，否则挂载组件后无法绘制。不考虑用随机id，uuid
      },
      /**
       * 二维码内容
       */
      value: {
        type: [String, Number]
      },
      /**
       * 选项
       */
      options: {
        type: Object,
        default: () => {
          return {};
        }
      },
      /**
       * 二维码大小
       */
      size: {
        type: [String, Number],
        default: 200
      },
      /**
       * 二维码尺寸单位
       */
      sizeUnit: {
        type: String,
        default: "px"
      },
      /**
       * 导出的文件类型
       */
      fileType: {
        type: String,
        default: "png"
      },
      /**
       * 是否初始化组件后就开始生成
       */
      start: {
        type: Boolean,
        default: true
      },
      /**
       * 是否数据发生改变自动重绘
       */
      auto: {
        type: Boolean,
        default: true
      },
      /**
       * 隐藏组件
       */
      hide: {
        type: Boolean,
        default: false
      },
      /**
       * canvas 类型，微信小程序默认使用2d，非2d微信官方已放弃维护，问题比较多
       * 注意：微信小程序type2d手机上正常，PC上微信内打开小程序toDataURL报错，看后期微信官方团队会不会做兼容，不兼容的话只能在自行判断在PC使用非2d，或者直接提示用户请在手机上操作，微信团队的海报中心小程序就是这么做的
       */
      type: {
        type: String,
        default: () => {
          return "normal";
        }
      },
      /**
       * 队列绘制，主要针对NVue端
       */
      queue: {
        type: Boolean,
        default: false
      },
      /**
       * 是否队列加载图片，可减少canvas发起的网络资源请求，节省服务器资源
       */
      isQueueLoadImage: {
        type: Boolean,
        default: false
      },
      /**
       * loading态
       */
      loading: {
        type: Boolean,
        default: void 0
      },
      /**
       * H5保存即自动下载（在支持的环境下），默认false为仅弹层提示用户需要长按图片保存，不会自动下载
       */
      h5SaveIsDownload: {
        type: Boolean,
        default: false
      },
      /**
       * H5下载名称
       */
      h5DownloadName: {
        type: String,
        default: "uQRCode"
      }
    },
    data() {
      return {
        canvas: void 0,
        canvasType: void 0,
        canvasContext: void 0,
        makeDelegate: void 0,
        drawDelegate: void 0,
        toTempFilePathDelegate: void 0,
        makeExecuted: false,
        makeing: false,
        drawing: false,
        isError: false,
        error: void 0,
        isH5Save: false,
        tempFilePath: "",
        templateOptions: {
          size: 0,
          width: 0,
          // 组件宽度
          height: 0,
          canvasWidth: 0,
          // canvas宽度
          canvasHeight: 0,
          canvasTransform: "",
          canvasDisplay: false
        },
        uqrcodeOptions: {
          data: ""
        },
        plugins: [],
        makeingPattern: [
          [
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true]
          ],
          [
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, false, false, false],
            [true, true, true, true, true, true, false, true, true, true],
            [true, true, true, true, true, true, false, true, true, true],
            [true, true, true, true, true, true, false, true, true, true]
          ],
          [
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, true, true, true, true, false, false, false],
            [true, true, true, true, true, true, true, false, false, false],
            [true, true, true, true, true, true, true, false, false, false],
            [true, true, true, false, false, false, false, true, true, true],
            [true, true, true, false, false, false, false, true, true, true]
          ],
          [
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, false, false, false, false, false, false, false],
            [true, true, true, false, false, false, false, false, false, false],
            [true, true, true, false, false, false, false, false, false, false],
            [true, true, true, false, false, false, false, false, false, false],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true],
            [true, true, true, true, true, true, true, true, true, true]
          ]
        ]
      };
    },
    watch: {
      type: {
        handler(val) {
          const types = ["2d"];
          if (types.includes(val)) {
            this.canvasType = val;
          } else {
            this.canvasType = void 0;
          }
        },
        immediate: true
      },
      value: {
        handler() {
          if (this.auto) {
            this.remake();
          }
        }
      },
      size: {
        handler() {
          if (this.auto) {
            this.remake();
          }
        }
      },
      options: {
        handler() {
          if (this.auto) {
            this.remake();
          }
        },
        deep: true
      },
      makeing: {
        handler(val) {
          if (!val) {
            if (typeof this.toTempFilePathDelegate === "function") {
              this.toTempFilePathDelegate();
            }
          }
        }
      }
    },
    mounted() {
      this.templateOptions.size = this.sizeUnit == "rpx" ? uni.upx2px(this.size) : this.size;
      this.templateOptions.width = this.templateOptions.size;
      this.templateOptions.height = this.templateOptions.size;
      this.templateOptions.canvasWidth = this.templateOptions.size;
      this.templateOptions.canvasHeight = this.templateOptions.size;
      if (this.canvasType == "2d") {
        this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size / this.templateOptions.canvasHeight})`;
      } else {
        this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size / this.templateOptions.canvasHeight})`;
      }
      if (this.start) {
        this.make();
      }
    },
    methods: {
      /**
       * 获取模板选项
       */
      getTemplateOptions() {
        var size = this.sizeUnit == "rpx" ? uni.upx2px(this.size) : this.size;
        return deepReplace(this.templateOptions, {
          size,
          width: size,
          height: size
        });
      },
      /**
       * 获取插件选项
       */
      getUqrcodeOptions() {
        return deepReplace(this.options, {
          data: String(this.value),
          size: Number(this.templateOptions.size)
        });
      },
      /**
       * 重置画布
       */
      resetCanvas(callback) {
        this.templateOptions.canvasDisplay = false;
        this.$nextTick(() => {
          this.templateOptions.canvasDisplay = true;
          this.$nextTick(() => {
            callback && callback();
          });
        });
      },
      /**
       * 绘制二维码
       */
      async draw(callback = {}, isDrawDelegate = false) {
        if (typeof callback.success != "function") {
          callback.success = () => {
          };
        }
        if (typeof callback.fail != "function") {
          callback.fail = () => {
          };
        }
        if (typeof callback.complete != "function") {
          callback.complete = () => {
          };
        }
        if (this.drawing) {
          if (!isDrawDelegate) {
            this.drawDelegate = () => {
              this.draw(callback, true);
            };
            return;
          }
        } else {
          this.drawing = true;
        }
        if (!this.canvasId) {
          formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:405", "[uQRCode]: canvasId must be set!");
          this.isError = true;
          this.drawing = false;
          callback.fail({
            errMsg: "[uQRCode]: canvasId must be set!"
          });
          callback.complete({
            errMsg: "[uQRCode]: canvasId must be set!"
          });
          return;
        }
        if (!this.value) {
          formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:417", "[uQRCode]: value must be set!");
          this.isError = true;
          this.drawing = false;
          callback.fail({
            errMsg: "[uQRCode]: value must be set!"
          });
          callback.complete({
            errMsg: "[uQRCode]: value must be set!"
          });
          return;
        }
        this.templateOptions = this.getTemplateOptions();
        this.uqrcodeOptions = this.getUqrcodeOptions();
        if (typeof this.uqrcodeOptions.errorCorrectLevel === "string") {
          this.uqrcodeOptions.errorCorrectLevel = b.errorCorrectLevel[this.uqrcodeOptions.errorCorrectLevel];
        }
        if (typeof this.options.useDynamicSize === "undefined") {
          this.uqrcodeOptions.useDynamicSize = true;
        }
        const qr = instance = new b();
        this.plugins.forEach((p2) => qr.register(p2.plugin));
        qr.setOptions(this.uqrcodeOptions);
        qr.make();
        let canvasContext = null;
        if (this.canvasType === "2d") {
          canvasContext = this.canvasContext = uni.createCanvasContext(this.canvasId, this);
          this.templateOptions.canvasWidth = qr.dynamicSize;
          this.templateOptions.canvasHeight = qr.dynamicSize;
          this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size / this.templateOptions.canvasHeight})`;
          qr.loadImage = this.getLoadImage(function(src) {
            return new Promise((resolve, reject) => {
              if (src.startsWith("http")) {
                uni.getImageInfo({
                  src,
                  success: (res) => {
                    resolve(res.path);
                  },
                  fail: (err) => {
                    reject(err);
                  }
                });
              } else {
                if (src.startsWith(".")) {
                  formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:528", "[uQRCode]: 本地图片路径仅支持绝对路径！");
                  throw new Error("[uQRCode]: local image path only supports absolute path!");
                } else {
                  resolve(src);
                }
              }
            });
          });
        } else {
          canvasContext = this.canvasContext = uni.createCanvasContext(this.canvasId, this);
          this.templateOptions.canvasWidth = qr.dynamicSize;
          this.templateOptions.canvasHeight = qr.dynamicSize;
          this.templateOptions.canvasTransform = `scale(${this.templateOptions.size / this.templateOptions.canvasWidth}, ${this.templateOptions.size / this.templateOptions.canvasHeight})`;
          qr.loadImage = this.getLoadImage(function(src) {
            return new Promise((resolve, reject) => {
              if (src.startsWith("http")) {
                uni.getImageInfo({
                  src,
                  success: (res) => {
                    resolve(res.path);
                  },
                  fail: (err) => {
                    reject(err);
                  }
                });
              } else {
                if (src.startsWith(".")) {
                  formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:561", "[uQRCode]: 本地图片路径仅支持绝对路径！");
                  throw new Error("[uQRCode]: local image path only supports absolute path!");
                } else {
                  resolve(src);
                }
              }
            });
          });
        }
        qr.canvasContext = canvasContext;
        setTimeout(() => {
          var plugin = this.plugins.find((p2) => p2.name == qr.style);
          var drawCanvasName = plugin ? plugin.drawCanvas : "drawCanvas";
          var drawCanvas;
          if (this.queue) {
            drawCanvas = () => queueDraw.exec(() => qr[drawCanvasName]());
          } else {
            drawCanvas = () => qr[drawCanvasName]();
          }
          drawCanvas().then(() => {
            if (this.drawDelegate) {
              let delegate = this.drawDelegate;
              this.drawDelegate = void 0;
              delegate();
            } else {
              this.drawing = false;
              callback.success();
            }
          }).catch((err) => {
            formatAppLog("log", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:633", err);
            if (this.drawDelegate) {
              let delegate = this.drawDelegate;
              this.drawDelegate = void 0;
              delegate();
            } else {
              this.drawing = false;
              this.isError = true;
              callback.fail(err);
            }
          }).finally(() => {
            callback.complete();
          });
        }, 300);
      },
      /**
       * 生成二维码
       */
      make(callback = {}) {
        this.makeExecuted = true;
        this.makeing = true;
        this.isError = false;
        if (typeof callback.success != "function") {
          callback.success = () => {
          };
        }
        if (typeof callback.fail != "function") {
          callback.fail = () => {
          };
        }
        if (typeof callback.complete != "function") {
          callback.complete = () => {
          };
        }
        this.resetCanvas(() => {
          clearTimeout(this.makeDelegate);
          this.makeDelegate = setTimeout(() => {
            this.draw({
              success: () => {
                setTimeout(() => {
                  callback.success();
                  this.complete(true);
                }, 300);
              },
              fail: (err) => {
                callback.fail(err);
                this.error = err;
                this.complete(false, err.errMsg);
              },
              complete: () => {
                callback.complete();
                this.makeing = false;
              }
            });
          }, 300);
        });
      },
      /**
       * 重新生成
       */
      remake(callback) {
        this.$emit("change");
        this.make(callback);
      },
      /**
       * 生成完成
       */
      complete(success = true, errMsg = "") {
        if (success) {
          this.$emit("complete", {
            success
          });
        } else {
          this.$emit("complete", {
            success,
            errMsg
          });
        }
      },
      /**
       * 导出临时路径
       */
      toTempFilePath(callback = {}) {
        if (typeof callback.success != "function") {
          callback.success = () => {
          };
        }
        if (typeof callback.fail != "function") {
          callback.fail = () => {
          };
        }
        if (typeof callback.complete != "function") {
          callback.complete = () => {
          };
        }
        if (!this.makeExecuted) {
          formatAppLog("error", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:728", "[uQRCode]: make() 方法从未调用！请先成功调用 make() 后再进行操作。");
          var err = {
            errMsg: "[uQRCode]: make() method has never been executed! please execute make() successfully before operating."
          };
          callback.fail(err);
          callback.complete(err);
          return;
        }
        if (this.isError) {
          callback.fail(this.error);
          callback.complete(this.error);
          return;
        }
        if (this.makeing) {
          this.toTempFilePathDelegate = () => {
            this.toTempFilePath(callback);
          };
          return;
        } else {
          this.toTempFilePathDelegate = null;
        }
        if (this.canvasType === "2d")
          ;
        else {
          uni.canvasToTempFilePath(
            {
              canvasId: this.canvasId,
              fileType: this.fileType,
              width: Number(this.templateOptions.canvasWidth),
              height: Number(this.templateOptions.canvasHeight),
              destWidth: Number(this.templateOptions.size),
              destHeight: Number(this.templateOptions.size),
              success: (res) => {
                callback.success(res);
              },
              fail: (err2) => {
                callback.fail(err2);
              },
              complete: () => {
                callback.complete();
              }
            },
            this
          );
        }
      },
      /**
       * 保存
       */
      save(callback = {}) {
        if (typeof callback.success != "function") {
          callback.success = () => {
          };
        }
        if (typeof callback.fail != "function") {
          callback.fail = () => {
          };
        }
        if (typeof callback.complete != "function") {
          callback.complete = () => {
          };
        }
        this.toTempFilePath({
          success: (res) => {
            if (this.canvasType === "2d")
              ;
            else {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: (res1) => {
                  callback.success(res1);
                },
                fail: (err1) => {
                  callback.fail(err1);
                },
                complete: () => {
                  callback.complete();
                }
              });
            }
          },
          fail: (err) => {
            callback.fail(err);
            callback.complete(err);
          }
        });
      },
      /**
       * 注册click事件
       */
      onClick(e2) {
        this.$emit("click", e2);
      },
      /**
       * 获取实例
       */
      getInstance() {
        return instance;
      },
      /**
       * 注册扩展，组件仅支持注册type为style的drawCanvas扩展
       * @param {Object} plugin
       */
      registerStyle(plugin) {
        if (plugin.Type != "style") {
          formatAppLog("warn", "at uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue:930", "[uQRCode]: registerStyle 仅支持注册 style 类型的扩展！");
          return {
            errMsg: "registerStyle 仅支持注册 style 类型的扩展！"
          };
        }
        if (typeof plugin === "function") {
          this.plugins.push({
            plugin,
            name: plugin.Name,
            drawCanvas: plugin.DrawCanvas
          });
        }
      },
      getLoadImage(loadImage) {
        var that = this;
        if (typeof loadImage == "function") {
          return function(src) {
            if (that.isQueueLoadImage) {
              return queueLoadImage.exec(() => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const cache = cacheImageList.find((x) => x.src == src);
                    if (cache) {
                      resolve(cache.img);
                    } else {
                      loadImage(src).then((img) => {
                        cacheImageList.push({
                          src,
                          img
                        });
                        resolve(img);
                      }).catch((err) => {
                        reject(err);
                      });
                    }
                  }, 10);
                });
              });
            } else {
              return loadImage(src);
            }
          };
        } else {
          return function(src) {
            return Promise.resolve(src);
          };
        }
      }
    }
  };
  function deepReplace(o2 = {}, r2 = {}, c2 = false) {
    let obj;
    if (c2) {
      obj = o2;
    } else {
      obj = {
        ...o2
      };
    }
    for (let k in r2) {
      var vr = r2[k];
      if (vr != void 0) {
        if (vr.constructor == Object) {
          obj[k] = this.deepReplace(obj[k], vr);
        } else if (vr.constructor == String && !vr) {
          obj[k] = obj[k];
        } else {
          obj[k] = vr;
        }
      }
    }
    return obj;
  }
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uqrcode", { "uqrcode-hide": $props.hide }]),
        style: vue.normalizeStyle({ width: `${$data.templateOptions.width}px`, height: `${$data.templateOptions.height}px` })
      },
      [
        vue.createElementVNode("view", { class: "uqrcode-canvas-wrapper" }, [
          vue.createCommentVNode(" 画布 "),
          $data.templateOptions.canvasDisplay ? (vue.openBlock(), vue.createElementBlock("canvas", {
            key: 0,
            class: "uqrcode-canvas",
            id: $props.canvasId,
            "canvas-id": $props.canvasId,
            type: $data.canvasType,
            style: vue.normalizeStyle({
              width: `${$data.templateOptions.canvasWidth}px`,
              height: `${$data.templateOptions.canvasHeight}px`,
              transform: $data.templateOptions.canvasTransform
            }),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
          }, null, 12, ["id", "canvas-id", "type"])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" nvue用gcanvas ")
        ]),
        vue.createCommentVNode(" 加载效果 "),
        ($props.loading === void 0 ? $data.makeing : $props.loading) ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uqrcode-makeing"
        }, [
          vue.renderSlot(_ctx.$slots, "loading", {}, () => [
            vue.createElementVNode(
              "image",
              {
                class: "uqrcode-makeing-image",
                style: vue.normalizeStyle({ width: `${$data.templateOptions.size / 4}px`, height: `${$data.templateOptions.size / 4}px` }),
                src: "data:image/gif;base64,R0lGODlhAAEAAfIEAOHh4SSsWuDg4N3d3f///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODhGMzM4RDEwMTExRUM4MDhCRkVBQkE2QUZDQzkwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyODhGMzM5RDEwMTExRUM4MDhCRkVBQkE2QUZDQzkwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDI4OEYzMzZEMTAxMTFFQzgwOEJGRUFCQTZBRkNDOTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4OEYzMzdEMTAxMTFFQzgwOEJGRUFCQTZBRkNDOTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFFAAEACwAAAAAAAEAAQAD/0i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanigCqq6ytrieusbISAbW2t7i5uru8vb66bLLCrLDDw7S/ycrLzLXBxsLF0LHIzdbXzc/Trybb1BHY4eK92t6r0uaq1ePs4+Xp6PDg7fTh7+bx+PP1/Mz33vkA7utH0Ne/bQERDizIMNfBaQkhLmxIMcBDaBExTqzI8P+isYwfN3Ik6PFYt3TnRI7kVzLaSZQA1q0s2HLWS5QyZ/ar+a0ETHUqdbLjyc3nz5xC6RFtBdIkhKQ01/yMeVPeU6g7pR6tqu8q1npLiXEV6PVru7ApjcJEquyEPa1rxyosm83EWzVTm7qk688uNrRA1eIMatDvNcBUBVt9cJdEYzR55Urku8ztX7iDFXdlfLnE4zORNZPlfNiwNcR6bVJua7ou3q2i55I+3brv67ixJ8927bhzmtAkgDv4HIJ4GeEikDMw/oH5GOUgoCtw3oF6GOkesFvfsP0L9g7afY/o7uU7h/ClPYsHDTt4++Hri8c//j55/eXzm+d/fj96/+n/+1UX4HX/ZVcgeRggyIV5G6BHmycMauAgb5xEmMGEtnViIQYYVvbJhhd0yBqEBYJ34ICUgGiBiMmAomIFLP7iYonnnZiehjQ2aOODOE7l449MERbVai1iBuSRO67EVpG3IenkYvDptKSMRj5pZUhENjRlYU1e6aVqu420JTlVfmlmYGFyNCYviJ2ZWZoVrblLm25uFuVMcgJTZp1X5gmWkGzuyeeTfioF6JyCDopkoWcdqmeXilrJ6FCOOpRopD9O6k6luNCJ6V5wUqSpRZd+mqSYnN7iqalFhaplqrasyqpYWXYEqzOlzmpnA0mNKquuiblqa61kQgrsqWreSqqx/8e+eaeSyqIi7bTUVmvttdhmq+223Hbr7bejCCDuuOSWa+656Kar7rrnSjDAu/DGK++89NZr77340vsru/z2224E+QYs8MAEw7uvvwj3627BDDfM8MEJR5zuwg5XbHG9EEusMbkUX+zxxRlvvHHHH5f8cK4ip+wvySa3HHDIKifMsss0Y4xyzDijO3PNPBt8c85Aj7tzzzzDHPS6QxNNs9FHTwyw0lAPwHTT/0IQNdRTU11u0ld/nLXWQj/dddE/g50y12Nb/LXZaKft8Npgt+32ycyafbTccxMMt9Z45y3w3lT37Xe+qEnGruDxzihxalU/ULHiETNuLuI+k7i44f9Ii013j5Fjri7l70Ius+dOW/32hxpLvrXmBYuOsOocs6436pfndrjsA7u+Muk64/437Z3bnrnpDeuuMO+NO/A48KML/7nvLzP/OvKTQ0+49Ls7X7rjp1sevHu1c1889sdr3zvxm1eYOvWro986+fzCHrb7s3vfPPjfK9895/ePMLL1+DKe3c6Hv/fZb4DPM5++4IfA9hWwfvxrIAH9tz/1STCBD8wdAy8oNfYlboMXlF/oQChBEXbwgByMnQLnJcAUmrCFHDTh4FhYNrZ5cIY2q5sLb4hDGuowhjzs4Qd/GMIgCnGERCyhEY8IOAxS8IgVZE8Kk2cfKI4viQ2UIRPAaxi3JQqxiXcDoBXtVbgVOlB/YzTgb9ZnRhWKL40axCIVQ/A/+sExgFwU1wvFeMchrjF8T8xfA/oYxz8Kko5sfCMh71XGDJZPkYvMoSH7V8VDLiCS15Nj9do4P0hiUl6NDCQlGfBJRoLrlKhMpSpXycpWuvKVsIylLGdJy1ra8pa4zKUud8nLXvryl8AMpjCHScxiGvOYyEymMpfJzGY685nQjKY0p0nNalrzmtjMpja3yc1uevOb4AynOMdJhwQAACH5BAUUAAQALDIAMgCcAJwAAAP/KLrcTjDKSWt0OFsIuv9gKI5kaZ6Ztq1s6iorKs90/apsTt1pbP/AIA+mK16Gj41wyWwan8ikpUmtRp/GaMNn7Xq3WJ2Wwf2arWHxmDg9u6np3JpdeduX8da8fO8j83xXSn6EQ4CDa4GFi2CHO3uIjJJkjo+JkZOTlZZjipmFmxNzAp6ffqESo6Wmd6hHl22sjK4ckLGyoLSqmLh9tAS7t72+urZ1QL+LycacNcuEz528M9HErsHHP9WtxbDZNtt24YbTMuNu5zerJulm7S7rJe9e8zjfzt2n+VrxJPVo+wQJo/GvSsFG9wgGFLeQ3EBqDdFFVFcOxUEnE1/0G3GR/0lHOs0UXss10ltIiCX1peRX8cRHIS83iniJLVRNUcgyfonZkp1Oej/tnTT3K87NSkdfgSuaJukhp8ByMsUCNQ/UIFPDVDXKDKe2rFC6IhWrFB/YIlubkq319awak5uuSnWrB+5Yu2VF0pUpBZXctnt7jhqMl63KhMMIU3z4hm9ixY4xMn6sGENkj4IpVyaVuctlzdImn/kMWiDixp1L/z08VPVm0lhTuw59WqLo2YNhz22NO7dsOL9789ANmLfwwlGhBT8Obzke58wtQ499O/qf6bu9WvddHWj37RqxF9cOHrky8ZvTs/wOkH2IwPDjy59Pv779+/jz69/Pv7////8ABijggAQWaOCBCCao4FQDNOjggxBGKOGEFFZooYQrBKDhhhx26OGHIIYo4ogfXmjiiSim6GCGJLbo4oswaqjijDTSyGKMOOYYY4089ljhjToGKWSJPhZpJJBDJimkkUz2iKSSUO7Y5JQqPhnllSRSqeWJVmLpJZFbhjlhl1+WKaOYaEJIpplfpulmg2uyieWbbsYpZ5R0pmnnnUrmieaefA7pp5iABhrkoGEWamiOiG6p6KJSNjrlo5C+KCmVlFba4qWTbqCpl5w2memnIvLIkwVB6mdqUBh6qqOqNZ5aQar5rbpSiqMGAKuNrEaY664zykoBrfjZ6lesruYIbJX/vaqZLI7L4trsg7/WiuytKFZb7LXH8orqq9Z6222wz8YYbbbTrlgujOdymS6c677YronCTkDsfcbaxO2w4G4rrr7/2tsvvvvGVbAE99qXr8EBIzywwgc7srDDyoZLLrbufluxv6EOUFTC9XWsLi0g0ycyvCQ/HPLJH6tsMsu/lDzfyR7H7PLMMKe8McEit7wzxD3b/PPKQesMrcWh+kxqnzm7sjSeTaPyNJQ0Kz31oVGHcnWSVQu9tY5dG/01jmE7PTbYWW9yNtpFm712pDQ3HMHbZEf8lN0E0A03sxjTG6/eIU4sMd6AW4q3VYQXvunhXMkNgeKLOw6I4I9DPiLlGZMnbnngjKsl+ealdq6V5qB7iDnin5f+YQIAIfkEBRQABAAsMgAyAJwAnAAAA/84utxOMMpJa3Q4Wyi6/2AojmRpnpm2rWzqKisqz3T9qmxO3Wls/8AgD6YrXoaPjXDJbBqfyKSlSa1Gn8Zow2fterdYnZbB/ZqtYfGYOD27qencml1525fx1rx87yPzfFdKfoRDgINrgYWLYIc7e4iMkmSOj4mRk5OVlmOKmYWbE3MDnp9+oRKjpaZ3qEeXbayMrhyQsbKgtKqYuH20BLu3vb66tnVAv4vJxpw1y4TPnbwz0cSuwcc/1a3FsNk223bhhtMy427nN6sm6WbtLusl717zON/O3af5WvEk9Wj7BAmj8a9KwUb3CAYUt5DcQGoN0UVUVw7FQScTX/QbcZH/SUc6zRReyzXSW0iIJfWl5FfxxEchLzeKeIktVE1RyDJ+idmSnU56P+2dNPcrzs1KR1+BK5om6SGnwHIyxQI1D9QgU8NUNcoMp7asULoiFasUH9giW5uSrfX1rBqTm65KdasH7li7ZUXSlSkFldy2e3uOGoyXrcqEwwhTfPiGb2LFjjEyfqwYQ2SPgilXJpW5y2XN0iaf+QxaIOLGnUv/PTxU9WbSWFO7Dn1aoujZg2HPbY07t2w4v3vz0A2Yt/DCUaEFPw5vOR7nzC1Dj307+p/pu71a910daPftGrEX1w4euTLxm9Oz/A6QfYjA8OPLn0+/vv37+PPr38+/v////wAGKOCABBZo4IEIJqjgVAE06OCDEEYo4YQUVmihhMQBoOGGHHbo4YcghsjhhSSWaOKJDmYo4oostqghijDGGKOKLtZo44sy5qgjhTTe6OOKOwYpZAA9/mikh0MmKWORRzYJgJJQnsikk0ZGaeWFU1Lp45VcTpilljZ2KeaDX4Lp4pholmkmi2iOqeaaIrYp5ptwgihnl3TWieSdV+ap54h8WunnnzgGCuWghBoaJaJ/KnooeoTW6KiSjOo5aZKV1pnjL5tCp1+nroBaG4ufLkmLqMaJWOqMp5rqXoerwsipq6OuGCuKs7L6Koe3StmqrrWqmh+qmxCbipG9mpirrP+eDktrKMbmVWOyJS6La7P4RXuItsn5SC2J1vq664bfYvkrs+NqWK6F4SqL7X3c5sHtketW2G6179oXbxzzIusssNA+S56N9fJ47rXpAlCwlweLG2yIC7fJU7aXkhnUhxGnebGHGbu5Maz/Vkzkx7yGXPHE8IrcIMr6qjzySgSbfCnL9bn8sl/+UqwyTZHeaDPPPUvqMtBBt/gzyUVvOTTSSYe5NMxNr3k01FGDOTXOVWv6NNZZS721TV3DaXO/YZu5bxpkl63l2WGkrbaTbGPh9ttHxv3E3HT/aLcReOfts8CV9O230AAXC7i0gxOOLiqCJ87m4dtC3q3jThceuOQElP+YAAAh+QQFFAAEACwyADIAnACcAAAD/xi63E4wyklrdDhbOLr/YCiOZGmKWcpsbEuoMHvOdG17sOruVJ7Kt6Aw6NPwjq/iYzNsOkvKJXIXbQCfWGx1NaVuFdesWPgFd13lQHjMpqXP6PK6TSe94ay7pc6HyvEbehV9hCGCgBOHE4WMHYqIEI8RjYySiJYElIWYeJiahJxwnp98oWejpHSmXaipbKtTra5isEiys1p/kIm6g7hjtUe3v03BPMM0uxTFvcpJX3M1zhLM0NORzYtD1xxDxl7We9vc1Vvcz+ZM49flVefIM+ftUe/Z1OvT80r14b5C8t7sQYJ3AiAZgZcQZsLnTF8RfunE/SMXsJ8zgiYMElHYSf9hE403vsWxqG0iu4oRp2EsAdKGyBYrSbSs8TKPR4bKHPqA6E6dyXwoe16LOWKmG46ibv5sGJQeN6IijM6oGUhpkHMdSe6CGgJrUq0Drd7wegppWbDdlpIFl/KiWBtrY5ll9VZaXGFz5aJdqPZu1b1Z25a86petUJV1kxUeKXhr4niLYaaZTFmKP03RjlbePDkzIc8nOIt+3Ae0idGonUrE7HNj6tc6WlMy7Qe2bcvLSNG2c7v3gt1tgKPw7Vv4GOMgiBeX3Qj5B+W9nWOR7gi6bepOsFu/zpyR9u2vsX/srhn8aPE47x00f578Z/eh2bdfPRv+afmi0fed1BQ/VzH/3/lXmX6E0eeSgAPaV0eACP6XBXaRRSjhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiimQB4OKLMMYo44w01mjjjTMSKMCOPPbo449ABinkkDgWaeSROOpI5JJMNonkk1BGqaSTVFYZ5ZVY3jillVx2meWXSG7p5Zhkgmmmi2KWqeaZbBqZ5ppwtilnjG/GaeecbNZ55554Yqknn4D2eeSfgRYqaI2EGqrooS8muiijkDr6KKSCSjoppXNaeimmeSq46aec2qgpqKH66SmpqJYKwKipqjroqa3yKVWSsP64oaknSVmrj7deOauWu/bYq665QgmhhrgCRexl/1UOayxFy+bGpbNP/ipqsDxSGya0zxropLavFlsttjuC6ya343rbpLlFWosouQKwS6u426rLpLzA0hsus1Tie62+59q7pL/vAtwuvATT6K7CCCPrK7r18vutw9Hm9LDARCacI8T7SmulxjIuvDHGQ4JMJ8cBS7wuxa6GjPK9LLcMo8i2xiwzmi8PbPPNNPO6s8w9C/tzy0FnO7SrRZd7tKpJx7t0qU2bzGjUT4fadKxYn2xw1lwfvHXXYDP8ddhkN5pz2WhfjTbQZ68dttpuM9123De7PDbddZvJatZUk4x3xbsk6/Hfa/atMuGCWww4f4gXPrfYhzferbKTDy554hmBXxz55R0rXvlgnGvO1OJphS665+luTncCADs="
              },
              null,
              4
              /* STYLE */
            )
          ], true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 错误处理 "),
        $data.isError ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uqrcode-error",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
        }, [
          vue.renderSlot(_ctx.$slots, "error", { error: $data.error }, () => [
            vue.createElementVNode(
              "text",
              { class: "uqrcode-error-message" },
              vue.toDisplayString($data.error.errMsg),
              1
              /* TEXT */
            )
          ], true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" H5保存提示 ")
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__scopeId", "data-v-42fcb7aa"], ["__file", "D:/HBuilderProjects/Game/uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue"]]);
  async function getLatestApkUrl() {
    try {
      const res = await Ys.callFunction({
        name: "getLatestApkUrl"
      });
      if (res.result.code === 0) {
        return res.result.data;
      } else {
        throw new Error(res.result.message || "未找到最新版本");
      }
    } catch (err) {
      throw new Error("获取下载链接失败：" + err.message);
    }
  }
  async function getReferralUsersWithEarnings(userId) {
    try {
      const res = await Ys.callFunction({
        name: "selectSubReferrersDetail",
        // 替换为你的云函数名称
        data: {
          userId
        }
      });
      return res.result;
    } catch (err) {
      formatAppLog("error", "at utils/selectSubReferrersDetail.js:16", "调用云函数失败:", err);
      throw err;
    }
  }
  const _sfc_main$C = {
    __name: "subReferrersDetailPop",
    props: {
      type: {
        type: String,
        required: true,
        validator: (value) => ["direct", "indirect"].includes(value)
      },
      userId: {
        type: String,
        required: true
      }
    },
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const users = vue.ref([]);
      const loading = vue.ref(true);
      const expandedCardId = vue.ref(null);
      const groundsMeta = {
        "1": { "groundName": "一级土地" },
        "2": { "groundName": "资源地皮" },
        "3": { "groundName": "二级土地" },
        "4": { "groundName": "三级土地" },
        "5": { "groundName": "四级土地" },
        "6": { "groundName": "五级土地" }
      };
      const groundNameMap = Object.keys(groundsMeta).reduce((map, key) => {
        map[key] = groundsMeta[key].groundName;
        return map;
      }, {});
      const title = vue.computed(() => {
        return props.type === "direct" ? "直接推荐用户列表" : "间接推荐用户列表";
      });
      const filteredUsers = vue.computed(() => {
        const userPhone = uni.getStorageSync("phone");
        return users.value.filter((user) => {
          if (props.type === "direct") {
            return user.userInfo.pusherCode === userPhone;
          } else {
            return user.userInfo.pusherCode !== userPhone;
          }
        });
      });
      const emit = __emit;
      const handleClose = () => {
        emit("close");
      };
      const toggleCard = (userId) => {
        if (expandedCardId.value === userId) {
          expandedCardId.value = null;
        } else {
          expandedCardId.value = userId;
        }
      };
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      };
      const getEarningsSource = (record) => {
        if (record.claimGroundList && record.claimGroundList.length > 0) {
          return record.claimGroundList.map((groundId) => groundNameMap[groundId] || "未知地皮").join("\n");
        }
        return "土地收益";
      };
      const calculateTotalEarnings = (recordList) => {
        if (!recordList || recordList.length === 0)
          return 0;
        return recordList.reduce((total, record) => total + (record.amount || 0), 0).toFixed(2);
      };
      const fetchReferralUsers = async () => {
        try {
          const result = await getReferralUsersWithEarnings(uni.getStorageSync("id"));
          users.value = result;
        } catch (err) {
          formatAppLog("error", "at components/subReferrersDetailPop.vue:176", "获取推广用户数据失败:", err);
          uni.showToast({
            title: "获取数据失败，请稍后重试",
            icon: "none"
          });
        } finally {
          loading.value = false;
        }
      };
      vue.onMounted(() => {
        fetchReferralUsers();
      });
      const __returned__ = { props, users, loading, expandedCardId, groundsMeta, groundNameMap, title, filteredUsers, emit, handleClose, toggleCard, formatDate, getEarningsSource, calculateTotalEarnings, fetchReferralUsers, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get getReferralUsersWithEarnings() {
        return getReferralUsersWithEarnings;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "popup-overlay",
      onClick: $setup.handleClose
    }, [
      vue.createElementVNode("view", {
        class: "popup-content",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        vue.createCommentVNode(" 关闭按钮 "),
        vue.createElementVNode("view", {
          class: "close-button",
          onClick: $setup.handleClose
        }, "×"),
        vue.createElementVNode(
          "text",
          { class: "popup-title" },
          vue.toDisplayString($setup.title),
          1
          /* TEXT */
        ),
        vue.createCommentVNode(" 加载中状态 "),
        $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "loading-tip"
        }, [
          vue.createElementVNode("text", null, "加载中...")
        ])) : $setup.filteredUsers.length > 0 ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createCommentVNode(" 用户列表 "),
            vue.createElementVNode("view", { class: "user-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.filteredUsers, (user) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: user.userInfo._id,
                    class: "user-card",
                    onClick: ($event) => $setup.toggleCard(user.userInfo._id)
                  }, [
                    vue.createCommentVNode(" 用户基本信息 "),
                    vue.createElementVNode("view", { class: "user-info" }, [
                      vue.createElementVNode("image", {
                        src: user.userInfo.avatar,
                        class: "user-avatar"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "user-details" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "user-name" },
                          vue.toDisplayString(user.userInfo.userName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "game-id" },
                          "游戏ID: " + vue.toDisplayString(user.userInfo.gameID),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createCommentVNode(" 总收益 "),
                      vue.createElementVNode("view", { class: "total-earnings" }, [
                        vue.createElementVNode("text", { class: "total-earnings-label" }, "总收益"),
                        vue.createElementVNode(
                          "text",
                          { class: "total-earnings-value" },
                          vue.toDisplayString($setup.calculateTotalEarnings(user.recordList)) + "能量石",
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createCommentVNode(" 收益记录 "),
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["earnings-list", $setup.expandedCardId === user.userInfo._id ? "expanded" : ""])
                      },
                      [
                        vue.createElementVNode("view", { class: "earnings-table" }, [
                          vue.createCommentVNode(" 表头 "),
                          vue.createElementVNode("view", { class: "table-header" }, [
                            vue.createElementVNode("text", { class: "header-item" }, "收益来源"),
                            vue.createElementVNode("text", { class: "header-item" }, "收益金额"),
                            vue.createElementVNode("text", { class: "header-item" }, "收益时间")
                          ]),
                          vue.createCommentVNode(" 表格内容 "),
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(user.recordList, (record, index) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                key: index,
                                class: "table-row"
                              }, [
                                vue.createElementVNode("text", { class: "table-item" }, [
                                  vue.createTextVNode(
                                    vue.toDisplayString($setup.getEarningsSource(record)) + " ",
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createCommentVNode(" 动态展示收益来源 ")
                                ]),
                                vue.createElementVNode(
                                  "text",
                                  { class: "table-item" },
                                  vue.toDisplayString(record.amount) + "能量石",
                                  1
                                  /* TEXT */
                                ),
                                vue.createElementVNode(
                                  "text",
                                  { class: "table-item" },
                                  vue.toDisplayString($setup.formatDate(record.createTime)),
                                  1
                                  /* TEXT */
                                )
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          vue.createCommentVNode(" 没有收益记录时的提示 "),
                          user.recordList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "no-earnings-tip"
                          }, [
                            vue.createElementVNode("text", null, "暂无收益记录")
                          ])) : vue.createCommentVNode("v-if", true)
                        ])
                      ],
                      2
                      /* CLASS */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        )) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 2 },
          [
            vue.createCommentVNode(" 没有推荐用户时的提示 "),
            vue.createElementVNode("view", { class: "no-data-tip" }, [
              vue.createElementVNode("text", null, "没有推荐用户")
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ])
    ]);
  }
  const subReferrersDetailPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__scopeId", "data-v-0e21dd1e"], ["__file", "D:/HBuilderProjects/Game/components/subReferrersDetailPop.vue"]]);
  const _sfc_main$B = {
    __name: "recommend",
    setup(__props, { expose: __expose }) {
      __expose();
      const userInfo = vue.ref({
        userName: "",
        avatar: "",
        inviteCode: ""
      });
      const qrCodeContent = vue.ref("");
      const showPopup = vue.ref(false);
      const popupType = vue.ref("");
      const canvasWidth = vue.ref(300);
      const canvasHeight = vue.ref(400);
      const gameInfo = useGameInfoStore();
      const loadUserInfo = vue.computed(() => {
        const cachedUserInfo = uni.getStorageSync("userInfo") || {};
        userInfo.value = {
          userName: gameInfo.userName || cachedUserInfo.userName,
          avatar: gameInfo.avatar || cachedUserInfo.avatar,
          inviteCode: cachedUserInfo.inviteCode || "000000"
        };
      });
      vue.watch(
        () => gameInfo,
        (newGameInfo) => {
          userInfo.value.userName = newGameInfo.userName || userInfo.value.userName;
          userInfo.value.avatar = newGameInfo.avatar || userInfo.value.avatar;
        },
        { deep: true }
      );
      const loadLatestApkUrl = async () => {
        try {
          const apkUrl = await getLatestApkUrl();
          qrCodeContent.value = apkUrl;
          formatAppLog("log", "at components/recommend.vue:100", "最新 APK 下载地址:", apkUrl);
        } catch (err) {
          formatAppLog("error", "at components/recommend.vue:102", "获取下载地址失败", err);
          uni.showToast({
            title: "获取下载地址失败，请稍后重试",
            icon: "none"
          });
        }
      };
      const onQRCodeComplete = (res) => {
        if (res.success) {
          formatAppLog("log", "at components/recommend.vue:113", "二维码生成成功");
        } else {
          formatAppLog("error", "at components/recommend.vue:115", "二维码生成失败", res);
        }
      };
      const handleDirectRecommend = () => {
        popupType.value = "direct";
        showPopup.value = true;
      };
      const handleIndirectRecommend = () => {
        popupType.value = "indirect";
        showPopup.value = true;
      };
      const handleClosePopup = () => {
        showPopup.value = false;
      };
      const handleDownloadImage = async () => {
        uni.showLoading({ title: "生成图片中...", mask: true });
        try {
          const qrCodeTempFilePath = await new Promise((resolve, reject) => {
            uni.canvasToTempFilePath({
              canvasId: "qrcode",
              success: (res) => resolve(res.tempFilePath),
              fail: (err) => reject(err)
            });
          });
          const ctx = uni.createCanvasContext("shareCanvas");
          ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
          ctx.setFillStyle("#f8f9fa");
          ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
          ctx.setFontSize(24);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign("center");
          ctx.fillText("趣选城", canvasWidth.value / 2, 50);
          ctx.setFillStyle("#ffffff");
          ctx.fillRect(20, 60, canvasWidth.value - 40, 100);
          const avatar2 = await new Promise((resolve, reject) => {
            uni.getImageInfo({
              src: userInfo.value.avatar,
              success: (res) => resolve(res.path),
              fail: (err) => reject(err)
            });
          });
          ctx.drawImage(avatar2, 40, 100, 60, 60);
          ctx.setFontSize(16);
          ctx.setFillStyle("#333333");
          ctx.setTextAlign("left");
          ctx.fillText(`用户名: ${userInfo.value.userName}`, 120, 120);
          ctx.fillText(`推荐码: ${userInfo.value.inviteCode}`, 120, 150);
          ctx.setFillStyle("#ffffff");
          ctx.fillRect(20, 180, canvasWidth.value - 40, 220);
          const qrCodeSize = 160;
          const qrCodeX = (canvasWidth.value - qrCodeSize) / 2;
          const qrCodeY = 200;
          ctx.drawImage(qrCodeTempFilePath, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
          ctx.setFontSize(14);
          ctx.setFillStyle("#666666");
          ctx.setTextAlign("center");
          ctx.fillText("扫描二维码，加入我们！", canvasWidth.value / 2, qrCodeY + qrCodeSize + 30);
          ctx.draw(false, () => {
            uni.canvasToTempFilePath({
              canvasId: "shareCanvas",
              success: (res) => {
                const shareImagePath = res.tempFilePath;
                uni.saveImageToPhotosAlbum({
                  filePath: shareImagePath,
                  success: () => {
                    uni.hideLoading();
                    uni.showToast({ title: "图片已保存", icon: "success" });
                  },
                  fail: (err) => {
                    uni.hideLoading();
                    formatAppLog("error", "at components/recommend.vue:220", "保存图片失败:", err);
                    uni.showToast({ title: "保存图片失败，请重试", icon: "none" });
                  }
                });
              },
              fail: (err) => {
                uni.hideLoading();
                formatAppLog("error", "at components/recommend.vue:227", "生成图片失败:", err);
                uni.showToast({ title: "生成图片失败，请重试", icon: "none" });
              }
            });
          });
        } catch (err) {
          uni.hideLoading();
          formatAppLog("error", "at components/recommend.vue:234", "生成图片失败:", err);
          uni.showToast({ title: "生成图片失败，请重试", icon: "none" });
        }
      };
      vue.onMounted(() => {
        loadUserInfo.value;
        loadLatestApkUrl();
      });
      const __returned__ = { userInfo, qrCodeContent, showPopup, popupType, canvasWidth, canvasHeight, gameInfo, loadUserInfo, loadLatestApkUrl, onQRCodeComplete, handleDirectRecommend, handleIndirectRecommend, handleClosePopup, handleDownloadImage, ref: vue.ref, onMounted: vue.onMounted, computed: vue.computed, watch: vue.watch, get getLatestApkUrl() {
        return getLatestApkUrl;
      }, subReferrersDetailPopVue, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uqrcode = resolveEasycom(vue.resolveDynamicComponent("uqrcode"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 用户信息展示 "),
      vue.createElementVNode("view", { class: "user-info" }, [
        vue.createElementVNode("image", {
          src: $setup.userInfo.avatar,
          class: "avatar"
        }, null, 8, ["src"]),
        vue.createElementVNode("view", { class: "details" }, [
          vue.createElementVNode(
            "text",
            { class: "username" },
            vue.toDisplayString($setup.userInfo.userName),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "invite-code" },
            "推荐码: " + vue.toDisplayString($setup.userInfo.inviteCode),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 二维码组件 "),
      vue.createVNode(_component_uqrcode, {
        ref: "QRCode",
        value: $setup.qrCodeContent,
        size: 200,
        "canvas-id": "qrcode",
        onComplete: $setup.onQRCodeComplete
      }, null, 8, ["value"]),
      vue.createCommentVNode(" 提示信息 "),
      vue.createElementVNode("text", { class: "tip" }, "扫描二维码，加入我们！"),
      vue.createCommentVNode(" 下载按钮 "),
      vue.createElementVNode("button", {
        class: "download-button",
        onClick: $setup.handleDownloadImage
      }, "下载分享图"),
      vue.createCommentVNode(" 推荐按钮 "),
      vue.createElementVNode("view", { class: "button-container" }, [
        vue.createElementVNode("button", {
          class: "recommend-button direct",
          onClick: $setup.handleDirectRecommend
        }, "直推用户"),
        vue.createElementVNode("button", {
          class: "recommend-button indirect",
          onClick: $setup.handleIndirectRecommend
        }, "间推用户")
      ]),
      vue.createCommentVNode(" 隐藏的画布，用于生成最终图片 "),
      vue.createElementVNode(
        "canvas",
        {
          "canvas-id": "shareCanvas",
          style: vue.normalizeStyle({ width: $setup.canvasWidth + "px", height: $setup.canvasHeight + "px", position: "absolute", top: "-9999px" })
        },
        null,
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 弹窗组件 "),
      $setup.showPopup ? (vue.openBlock(), vue.createBlock($setup["subReferrersDetailPopVue"], {
        key: 0,
        type: $setup.popupType,
        onClose: $setup.handleClosePopup
      }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const recommendVue = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-f2aab100"], ["__file", "D:/HBuilderProjects/Game/components/recommend.vue"]]);
  const _sfc_main$A = {
    __name: "HomePage",
    setup(__props, { expose: __expose }) {
      __expose();
      const activeTab = vue.ref("cloud");
      const gameInfo = useGameInfoStore();
      const bgm = gameInfo.bgm;
      const showMenu = vue.ref(false);
      function handleMarket() {
        activeTab.value = "market";
        formatAppLog("log", "at pages/HomePage/HomePage.vue:86", "切换到集市页面");
      }
      function handleCloud() {
        activeTab.value = "cloud";
        formatAppLog("log", "at pages/HomePage/HomePage.vue:92", "切换到云城页面");
      }
      function handlePromotion() {
        activeTab.value = "promotion";
        formatAppLog("log", "at pages/HomePage/HomePage.vue:98", "切换到推广页面");
      }
      function handleLogout() {
        uni.setStorageSync("phone", "");
        uni.setStorageSync("id", "");
        uni.setStorageSync("token", "");
        showMenu.value = false;
        uni.reLaunch({
          url: "/pages/login/login"
          // 替换为你的登录页面路径
        });
        bgm.stop();
      }
      vue.onMounted(() => {
        bgm.src = "/static/bgm/bgm.mp3";
        bgm.autoplay = true;
        bgm.loop = true;
        if (gameInfo.bgmIsOpen) {
          bgm.play();
        }
      });
      const __returned__ = { activeTab, gameInfo, bgm, showMenu, handleMarket, handleCloud, handlePromotion, handleLogout, ref: vue.ref, onMounted: vue.onMounted, martVue, clickIntoCloudCityVue, recommendVue, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部 Header "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createCommentVNode(" 三个点的图标 "),
        vue.createElementVNode("view", {
          class: "menu-icon",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.showMenu = true)
        }, [
          vue.createElementVNode("text", { class: "icon" }, "···")
        ]),
        vue.createElementVNode("text", { class: "header-title" }, "趣选城")
      ]),
      vue.createCommentVNode(" 弹窗 "),
      $setup.showMenu ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "menu-popup"
      }, [
        vue.createElementVNode("view", {
          class: "menu-mask",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.showMenu = false)
        }),
        vue.createElementVNode("view", { class: "menu-content" }, [
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: $setup.handleLogout
          }, "退出登录")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 页面内容 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" 动态显示页面内容 "),
        $setup.activeTab === "intro" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "section"
        }, [
          vue.createElementVNode("text", { class: "section-title" }, "介绍"),
          vue.createElementVNode("text", { class: "section-description" }, "这里是趣选城的介绍页面。")
        ])) : vue.createCommentVNode("v-if", true),
        $setup.activeTab === "market" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "section"
        }, [
          vue.createVNode($setup["martVue"])
        ])) : vue.createCommentVNode("v-if", true),
        $setup.activeTab === "cloud" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "section"
        }, [
          vue.createVNode($setup["clickIntoCloudCityVue"])
        ])) : vue.createCommentVNode("v-if", true),
        $setup.activeTab === "promotion" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 3,
          class: "section"
        }, [
          vue.createCommentVNode(" 使用 v-if 控制 recommend-vue 的加载和销毁 "),
          $setup.activeTab === "promotion" ? (vue.openBlock(), vue.createBlock($setup["recommendVue"], { key: 0 })) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true),
        $setup.activeTab === "guild" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 4,
          class: "section"
        }, [
          vue.createElementVNode("text", { class: "section-title" }, "公会"),
          vue.createElementVNode("text", { class: "section-description" }, "这里是趣选城的公会页面。")
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createCommentVNode(" 底部 Tab 栏 "),
      vue.createElementVNode("view", { class: "tab-bar" }, [
        vue.createCommentVNode(" 介绍 Tab（禁用） "),
        vue.createElementVNode("view", { class: "tab-item disabled" }, [
          vue.createElementVNode("text", { class: "tab-text" }, "介绍")
        ]),
        vue.createCommentVNode(" 集市 Tab（可点击） "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab-item", { active: $setup.activeTab === "market" }]),
            onClick: $setup.handleMarket
          },
          [
            vue.createElementVNode("text", { class: "tab-text" }, "集市")
          ],
          2
          /* CLASS */
        ),
        vue.createCommentVNode(" 云城 Tab（可点击） "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab-item", { active: $setup.activeTab === "cloud" }]),
            onClick: $setup.handleCloud
          },
          [
            vue.createElementVNode("text", { class: "tab-text" }, "云城")
          ],
          2
          /* CLASS */
        ),
        vue.createCommentVNode(" 推广 Tab（可点击） "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["tab-item", { active: $setup.activeTab === "promotion" }]),
            onClick: $setup.handlePromotion
          },
          [
            vue.createElementVNode("text", { class: "tab-text" }, "推广")
          ],
          2
          /* CLASS */
        ),
        vue.createCommentVNode(" 公会 Tab（禁用） "),
        vue.createElementVNode("view", { class: "tab-item disabled" }, [
          vue.createElementVNode("text", { class: "tab-text" }, "公会")
        ])
      ])
    ]);
  }
  const PagesHomePageHomePage = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__file", "D:/HBuilderProjects/Game/pages/HomePage/HomePage.vue"]]);
  const _sfc_main$z = {
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
          url: "/pages/GameHome/GameHome"
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
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesMockMock = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__file", "D:/HBuilderProjects/Game/pages/Mock/Mock.vue"]]);
  function formatLargeNumber(number) {
    const num = typeof number === "string" ? parseFloat(number) : number;
    if (isNaN(num)) {
      throw new Error("Invalid input: input must be a number or a string representing a number");
    }
    const units = [
      { threshold: 1e12, unit: "万亿" },
      // 1万亿
      { threshold: 1e8, unit: "亿" },
      // 1亿
      { threshold: 1e4, unit: "w" },
      // 1万
      { threshold: 1e3, unit: "k" }
      // 1千
    ];
    for (const unit of units) {
      if (num >= unit.threshold) {
        return (num / unit.threshold).toFixed(2) + unit.unit;
      }
    }
    return num.toString();
  }
  const _sfc_main$y = {
    __name: "assetsHeader",
    props: {
      judge: {
        type: Number,
        required: true
      },
      openRecordPopup: {
        type: Function,
        required: true
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const assets = ["powerStone", "diamond", "resourceStone", "jewel"];
      const gameInfo = useGameInfoStore();
      const props = __props;
      function getImageUrl(name) {
        return `../static/market/${name}.png`;
      }
      function handleAssetClick(assetType) {
        props.openRecordPopup(assetType);
      }
      vue.onMounted(async () => {
        try {
          updateAssets();
        } catch (error) {
          formatAppLog("error", "at components/assetsHeader.vue:72", "初始化失败:", error);
        }
      });
      const __returned__ = { assets, gameInfo, props, getImageUrl, handleAssetClick, onMounted: vue.onMounted, get useGameInfoStore() {
        return useGameInfoStore;
      }, get formatLargeNumber() {
        return formatLargeNumber;
      }, get updateAssets() {
        return updateAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $setup.props.judge === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "assetsBar1"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.assets, (item, index) => {
            var _a;
            return vue.createElementVNode("view", {
              class: "asset",
              key: index
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "dem",
                  style: vue.normalizeStyle(`background: url(${$setup.getImageUrl(item)}) no-repeat center center / contain;`)
                },
                null,
                4
                /* STYLE */
              ),
              vue.createElementVNode(
                "span",
                null,
                vue.toDisplayString($setup.formatLargeNumber((_a = $setup.gameInfo.assets) == null ? void 0 : _a[item])),
                1
                /* TEXT */
              )
            ]);
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
            var _a;
            return vue.createElementVNode("view", {
              class: "asset",
              key: index,
              onClick: ($event) => $setup.handleAssetClick(item)
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "dem",
                  style: vue.normalizeStyle(`background: url(${$setup.getImageUrl(item)}) no-repeat center center / contain;`)
                },
                null,
                4
                /* STYLE */
              ),
              vue.createElementVNode(
                "span",
                null,
                vue.toDisplayString($setup.formatLargeNumber((_a = $setup.gameInfo.assets) == null ? void 0 : _a[item])),
                1
                /* TEXT */
              )
            ], 8, ["onClick"]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const assetsHeader = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-618629f7"], ["__file", "D:/HBuilderProjects/Game/components/assetsHeader.vue"]]);
  const _sfc_main$x = {
    __name: "avatar",
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const avatarUrl = vue.computed(() => {
        return gameInfo.avatar || uni.getStorageSync("avatar") || "";
      });
      vue.watch(
        () => gameInfo.avatar,
        (newAvatar) => {
          if (newAvatar) {
            uni.setStorageSync("avatar", newAvatar);
          }
        }
      );
      const __returned__ = { gameInfo, avatarUrl, ref: vue.ref, watch: vue.watch, computed: vue.computed, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "avatar" }, [
      vue.createCommentVNode(" 头像区域 "),
      $setup.avatarUrl ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "avatarImg",
          style: vue.normalizeStyle(`background-image: url(${$setup.avatarUrl});`)
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 用户名 "),
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
  const avatar = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-32a3f906"], ["__file", "D:/HBuilderProjects/Game/components/avatar.vue"]]);
  const _imports_0$2 = "/static/toolsBar/arrowRight.png";
  const _imports_1 = "/static/toolsBar/arrowLeft.png";
  const _sfc_main$w = {
    __name: "toolsBar",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const imgList = ["setting", "warehouse", "activity", "announcement", "rule"];
      const imgMap = ["设置", "背包", "活动", "公告", "玩法"];
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
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "toolsBar" }, [
      vue.createElementVNode("view", {
        class: "controll",
        onClick: $setup.toggleFold
      }, [
        $setup.needFold ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: _imports_0$2,
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
  const toolsBar = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-aed0e88d"], ["__file", "D:/HBuilderProjects/Game/components/toolsBar.vue"]]);
  const _sfc_main$v = {
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
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "cloudWrap" }, [
      vue.createElementVNode("view", {
        class: "mine item",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.toTradingMarket && $options.toTradingMarket(...args))
      }, [
        vue.createElementVNode("text", null, "赫尔卡矿洞")
      ]),
      vue.createElementVNode("view", { class: "ground item" }, [
        vue.createElementVNode("text", null, "土地管理")
      ]),
      vue.createElementVNode("view", { class: "mart item" }, [
        vue.createElementVNode("text", null, "交易集市")
      ]),
      vue.createElementVNode("view", { class: "talentCenter item" }, [
        vue.createElementVNode("text", null, "人才市场")
      ])
    ]);
  }
  const cloudTip = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-04c56f99"], ["__file", "D:/HBuilderProjects/Game/components/cloudTip.vue"]]);
  const _sfc_main$u = {
    name: "dynamicPeople",
    data() {
      return {};
    },
    mounted() {
    },
    methods: {}
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
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
        vue.createCommentVNode(' <view class="person p7"></view> '),
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
  const dynamicPeople = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-2a3805e5"], ["__file", "D:/HBuilderProjects/Game/components/dynamicPeople.vue"]]);
  const _sfc_main$t = {
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
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
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
  const clickMask = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-37646fb3"], ["__file", "D:/HBuilderProjects/Game/components/clickMask.vue"]]);
  const _sfc_main$s = {
    __name: "userSendRecord",
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const recordList = vue.ref([]);
      function getStoneImg(assetsType) {
        const stoneImages = {
          resourceStone: "/static/market/resourceStone.png",
          powerStone: "/static/market/powerStone.png",
          diamond: "/static/market/diamond.png"
        };
        return stoneImages[assetsType] || "/static/stones/default.png";
      }
      function formatTime(timestamp) {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      function closePopup() {
        emit("close");
      }
      async function loadTransferRecords() {
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        uni.showLoading({ title: "加载中..." });
        try {
          const res = await Ys.callFunction({
            name: "selectUserSendRecord",
            data: { userId }
          });
          if (res.result.code === 200) {
            recordList.value = res.result.data.map((item) => ({
              transferRecord: {
                assetsType: item.transferRecord.assetsType,
                sendNum: item.transferRecord.sendNum,
                sendTime: item.transferRecord.sendTime
              },
              senderInfo: {
                userName: item.senderInfo.userName,
                avatar: item.senderInfo.avatar,
                gameID: item.senderInfo.gameID
              },
              receiverInfo: {
                userName: item.receiverInfo.userName,
                avatar: item.receiverInfo.avatar,
                gameID: item.receiverInfo.gameID
              }
            }));
          } else {
            uni.showToast({ title: res.result.message || "还没有赠送记录", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at components/userSendRecord.vue:118", "加载失败", err);
          uni.showToast({ title: "加载失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      vue.onMounted(() => {
        loadTransferRecords();
      });
      const emit = __emit;
      const __returned__ = { recordList, getStoneImg, formatTime, closePopup, loadTransferRecords, emit, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "transferRecordPopup" }, [
      vue.createCommentVNode(" 弹窗背景 "),
      vue.createElementVNode("view", {
        class: "mask",
        onClick: $setup.closePopup
      }),
      vue.createCommentVNode(" 弹窗内容 "),
      vue.createElementVNode("view", { class: "popup" }, [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("text", { class: "title" }, "转赠记录"),
          vue.createElementVNode("view", {
            class: "closeBtn",
            onClick: $setup.closePopup
          }, "×")
        ]),
        vue.createCommentVNode(" 记录列表 "),
        vue.createElementVNode("view", { class: "recordList" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.recordList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "card",
                key: index
              }, [
                vue.createCommentVNode(" 左侧：转赠者信息 "),
                vue.createElementVNode("view", { class: "userInfo left" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: item.senderInfo.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(item.senderInfo.userName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "gameID" },
                      "ID: " + vue.toDisplayString(item.senderInfo.gameID),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createCommentVNode(" 中间：转赠信息 "),
                vue.createElementVNode("view", { class: "transferInfo" }, [
                  vue.createElementVNode("image", {
                    class: "stoneImg",
                    src: $setup.getStoneImg(item.transferRecord.assetsType),
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    { class: "stoneNum" },
                    "×" + vue.toDisplayString(item.transferRecord.sendNum),
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" 转赠时间 "),
                  vue.createElementVNode(
                    "text",
                    { class: "transferTime" },
                    vue.toDisplayString($setup.formatTime(item.transferRecord.sendTime)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createCommentVNode(" 右侧：接收者信息 "),
                vue.createElementVNode("view", { class: "userInfo right" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: item.receiverInfo.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(item.receiverInfo.userName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "gameID" },
                      "ID: " + vue.toDisplayString(item.receiverInfo.gameID),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const userSendRecordVue = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-e950144c"], ["__file", "D:/HBuilderProjects/Game/components/userSendRecord.vue"]]);
  const _sfc_main$r = {
    __name: "userTransactionRecord",
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const recordList = vue.ref([]);
      function getStoneImg(transactionType) {
        const stoneImages = {
          1: "/static/market/resourceStone.png",
          // 假设交易类型 1 是资源石
          2: "/static/market/powerStone.png",
          // 假设交易类型 2 是能量石
          3: "/static/market/diamond.png"
          // 假设交易类型 3 是钻石
        };
        return stoneImages[transactionType] || "/static/stones/default.png";
      }
      function formatTime(timestamp) {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}/${month}/${day} ${hours}:${minutes}`;
      }
      function closePopup() {
        emit("close");
      }
      async function loadTransactionRecords() {
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        uni.showLoading({ title: "加载中..." });
        try {
          const res = await Ys.callFunction({
            name: "selectTransactionRecord",
            // 云函数名称
            data: { userId }
          });
          if (res.result.code === 200) {
            recordList.value = res.result.data.map((item) => ({
              transactionRecord: {
                transactionType: item.transactionRecord.transactionType,
                transactionNum: item.transactionRecord.transactionNum,
                transactionTime: item.transactionRecord.transactionTime
              },
              buyerInfo: {
                userName: item.buyerInfo.userName,
                avatar: item.buyerInfo.avatar,
                gameID: item.buyerInfo.gameID
              },
              sellerInfo: {
                userName: item.sellerInfo.userName,
                avatar: item.sellerInfo.avatar,
                gameID: item.sellerInfo.gameID
              }
            }));
          } else {
            uni.showToast({ title: res.result.message || "还没有交易记录", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at components/userTransactionRecord.vue:118", "加载失败", err);
          uni.showToast({ title: "加载失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      vue.onMounted(() => {
        loadTransactionRecords();
      });
      const emit = __emit;
      const __returned__ = { recordList, getStoneImg, formatTime, closePopup, loadTransactionRecords, emit, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "transferRecordPopup" }, [
      vue.createCommentVNode(" 弹窗背景 "),
      vue.createElementVNode("view", {
        class: "mask",
        onClick: $setup.closePopup
      }),
      vue.createCommentVNode(" 弹窗内容 "),
      vue.createElementVNode("view", { class: "popup" }, [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("text", { class: "title" }, "交易记录"),
          vue.createElementVNode("view", {
            class: "closeBtn",
            onClick: $setup.closePopup
          }, "×")
        ]),
        vue.createCommentVNode(" 记录列表 "),
        vue.createElementVNode("view", { class: "recordList" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.recordList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "card",
                key: index
              }, [
                vue.createCommentVNode(" 左侧：购买者信息 "),
                vue.createElementVNode("view", { class: "userInfo left" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: item.buyerInfo.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(item.buyerInfo.userName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "gameID" },
                      "ID: " + vue.toDisplayString(item.buyerInfo.gameID),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createCommentVNode(" 中间：交易信息 "),
                vue.createElementVNode("view", { class: "transferInfo" }, [
                  vue.createElementVNode("image", {
                    class: "stoneImg",
                    src: $setup.getStoneImg(item.transactionRecord.transactionType),
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    { class: "stoneNum" },
                    "×" + vue.toDisplayString(item.transactionRecord.transactionNum),
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" 交易时间 "),
                  vue.createElementVNode(
                    "text",
                    { class: "transactionTime" },
                    vue.toDisplayString($setup.formatTime(item.transactionRecord.transactionTime)),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createCommentVNode(" 右侧：发布者信息 "),
                vue.createElementVNode("view", { class: "userInfo right" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: item.sellerInfo.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(item.sellerInfo.userName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "gameID" },
                      "ID: " + vue.toDisplayString(item.sellerInfo.gameID),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const userTransactionRecordVue = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-8f16bfa6"], ["__file", "D:/HBuilderProjects/Game/components/userTransactionRecord.vue"]]);
  const _sfc_main$q = {
    __name: "referralEarningsRecord",
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const referralList = vue.ref([]);
      function formatTime(timestamp) {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}/${month}/${day} ${hours}:${minutes}`;
      }
      function closePopup() {
        emit("close");
      }
      async function loadReferralRecords() {
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        uni.showLoading({ title: "加载中..." });
        try {
          const res = await Ys.callFunction({
            name: "getReferralList",
            // 云函数名称
            data: { userId }
          });
          if (res.result) {
            referralList.value = res.result;
          } else {
            uni.showToast({ title: "还没有推广收益记录", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at components/referralEarningsRecord.vue:84", "加载失败", err);
          uni.showToast({ title: "加载失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      vue.onMounted(() => {
        loadReferralRecords();
      });
      const emit = __emit;
      const __returned__ = { referralList, formatTime, closePopup, loadReferralRecords, emit, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "referralEarningsPopup" }, [
      vue.createCommentVNode(" 弹窗背景 "),
      vue.createElementVNode("view", {
        class: "mask",
        onClick: $setup.closePopup
      }),
      vue.createCommentVNode(" 弹窗内容 "),
      vue.createElementVNode("view", { class: "popup" }, [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("text", { class: "title" }, "推广收益"),
          vue.createElementVNode("view", {
            class: "closeBtn",
            onClick: $setup.closePopup
          }, "×")
        ]),
        vue.createCommentVNode(" 记录列表 "),
        vue.createElementVNode("view", { class: "recordList" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.referralList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "card",
                key: index
              }, [
                vue.createCommentVNode(" 左侧：用户信息 "),
                vue.createElementVNode("view", { class: "userInfo left" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: item.avatar,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "name" },
                      vue.toDisplayString(item.userName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "gameID" },
                      "ID: " + vue.toDisplayString(item.gameID),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createCommentVNode(" 右侧：收益信息 "),
                vue.createElementVNode("view", { class: "earningsInfo" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "time" },
                    vue.toDisplayString($setup.formatTime(item.createTime)),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "type" },
                    vue.toDisplayString(item.type === "直接推荐" ? "直推收益" : "间推收益"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "amountWrap" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "amount" },
                      vue.toDisplayString(item.amount),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("image", {
                      class: "stoneImg",
                      src: _imports_0$3,
                      mode: "aspectFill"
                    })
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const referralEarningsRecordVue = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-1f5a25d1"], ["__file", "D:/HBuilderProjects/Game/components/referralEarningsRecord.vue"]]);
  const _sfc_main$p = {
    __name: "userInfoPop",
    props: ["closeInfo"],
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const avatarUrl = vue.ref(Cache.getCache(AVATAR) || "");
      const userName = vue.ref(Cache.getCache(USERNAME) || "");
      const isShowEditPop = vue.ref(false);
      const isShowTip = vue.ref(false);
      const newName = vue.ref("");
      const isFirstEdit = vue.ref(gameInfo.isFirst == 0);
      const showAvatarTip = vue.ref(false);
      const isShowSendRecordPop = vue.ref(false);
      const isShowTransationPop = vue.ref(false);
      const isShowReferralPop = vue.ref(false);
      const isShowConfirmPop = vue.ref(false);
      const userInfo = uni.getStorageSync("userInfo") || {};
      const gameID = vue.computed(() => userInfo.gameID || "");
      const inviteCode = vue.computed(() => userInfo.inviteCode || "");
      function openEditNamePop() {
        isShowEditPop.value = true;
      }
      function closeEditNamePop() {
        isShowEditPop.value = false;
        isShowTip.value = false;
        newName.value = "";
      }
      function handleSendRecordPop(type) {
        isShowSendRecordPop.value = type;
      }
      function handleTransactionRecord(type) {
        isShowTransationPop.value = type;
      }
      function handlePromoEarnings() {
        isShowReferralPop.value = true;
      }
      function handleConfirm() {
        if (!newName.value)
          return;
        if (isFirstEdit.value) {
          formatAppLog("log", "at components/userInfoPop.vue:166", "hhh 我就是第一次修改", isFirstEdit.value);
          handleRealConfirm();
        }
        if (!isFirstEdit.value && gameInfo.assets.powerStone < 100) {
          isShowTip.value = true;
          return;
        }
        if (!isFirstEdit.value)
          isShowConfirmPop.value = true;
      }
      async function handleRealConfirm() {
        isShowConfirmPop.value = false;
        try {
          if (!isFirstEdit.value) {
            getUserAssets();
            const assetsDB = Ys.importObject("assets");
            await assetsDB.update(uni.getStorageSync("id"), POWERSTONE, -100);
            addAssetsChangeRecord(uni.getStorageSync("id"), POWERSTONE, 100, `用户修改名字扣除:`);
          }
          const user = Ys.importObject("user");
          const id = uni.getStorageSync("id");
          await user.changeName(id, newName.value);
          userName.value = newName.value;
          Cache.setCache(USERNAME, newName.value);
          gameInfo.userName = newName.value;
          gameInfo.isFirst = 1;
          isFirstEdit.value = false;
          getUserAssets();
          closeEditNamePop();
          uni.showToast({ title: "修改成功", icon: "success" });
        } catch (err) {
          formatAppLog("error", "at components/userInfoPop.vue:207", "修改失败", err);
          uni.showToast({ title: "修改失败", icon: "none" });
        }
      }
      async function changeAvatar() {
        showAvatarTip.value = false;
        try {
          const res = await uni.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"]
          });
          const tempFilePath = res.tempFilePaths[0];
          await uploadAvatarToUniCloud(tempFilePath);
        } catch (err) {
          formatAppLog("error", "at components/userInfoPop.vue:224", "选择图片失败", err);
          uni.showToast({ title: "选择图片失败", icon: "none" });
        }
      }
      async function uploadAvatarToUniCloud(filePath) {
        uni.showLoading({ title: "上传中..." });
        try {
          const result = await Ys.uploadFile({
            filePath,
            cloudPath: `avatars/${Date.now()}_${Math.random().toString(36).substring(2)}.jpg`
          });
          const avatarUrlValue = await getTempFileURL(result.fileID);
          const id = uni.getStorageSync("id");
          const updateResult = await Ys.callFunction({
            name: "updateAvatar",
            data: { userId: id, avatarUrl: avatarUrlValue }
          });
          if (updateResult.result.code === 200) {
            uni.setStorageSync("avatar", avatarUrlValue);
            avatarUrl.value = avatarUrlValue;
            gameInfo.avatar = avatarUrlValue;
            uni.showToast({ title: "头像更新成功", icon: "success" });
          } else {
            uni.showToast({ title: "头像更新失败", icon: "none" });
            formatAppLog("error", "at components/userInfoPop.vue:263", "云函数返回错误:", updateResult.result.message);
          }
        } catch (err) {
          formatAppLog("error", "at components/userInfoPop.vue:267", "上传失败", err);
          uni.showToast({ title: "上传失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      async function getTempFileURL(fileID) {
        if (!fileID)
          return "";
        try {
          const result = await Ys.getTempFileURL({ fileList: [fileID] });
          return result.fileList[0].tempFileURL;
        } catch (err) {
          formatAppLog("error", "at components/userInfoPop.vue:282", "获取文件 URL 失败", err);
          return "";
        }
      }
      const __returned__ = { gameInfo, props, avatarUrl, userName, isShowEditPop, isShowTip, newName, isFirstEdit, showAvatarTip, isShowSendRecordPop, isShowTransationPop, isShowReferralPop, isShowConfirmPop, userInfo, gameID, inviteCode, openEditNamePop, closeEditNamePop, handleSendRecordPop, handleTransactionRecord, handlePromoEarnings, handleConfirm, handleRealConfirm, changeAvatar, uploadAvatarToUniCloud, getTempFileURL, ref: vue.ref, computed: vue.computed, get AVATAR() {
        return AVATAR;
      }, get POWERSTONE() {
        return POWERSTONE;
      }, get USERNAME() {
        return USERNAME;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get Cache() {
        return Cache;
      }, userSendRecordVue, userTransactionRecordVue, referralEarningsRecordVue, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "userInfoWrap" }, [
      vue.createElementVNode("view", { class: "infoBgc" }, [
        vue.createElementVNode("view", {
          class: "closeBtn",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.props.closeInfo && $setup.props.closeInfo(...args))
        }),
        vue.createElementVNode("view", { class: "wrap1" }, [
          vue.createCommentVNode(" 头像区域 "),
          vue.createElementVNode(
            "view",
            {
              class: "avatar",
              style: vue.normalizeStyle(`background-image: url(${$setup.avatarUrl});`),
              onClick: $setup.changeAvatar
            },
            [
              $setup.showAvatarTip ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "avatarTip"
              }, "点击更换头像")) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { class: "userName" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.gameInfo.userName),
              1
              /* TEXT */
            ),
            $setup.userInfo.isMerchant ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "merchantTag"
            }, "(商人)")) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("view", { class: "desc" }, [
            $setup.isFirstEdit ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "(首次免费修改)")) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "(修改需消耗100能量石)"))
          ]),
          vue.createElementVNode("view", {
            class: "editName",
            onClick: $setup.openEditNamePop
          }, [
            vue.createElementVNode("text", null, "修改")
          ])
        ]),
        vue.createCommentVNode(" 展示 gameID 和 inviteCode "),
        vue.createElementVNode("view", { class: "infoRow" }, [
          vue.createElementVNode(
            "text",
            { class: "infoText" },
            "游戏ID: " + vue.toDisplayString($setup.gameID),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "infoText" },
            "邀请码: " + vue.toDisplayString($setup.inviteCode),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 功能按钮区域 "),
        vue.createElementVNode("view", { class: "actionButtons" }, [
          vue.createElementVNode("view", { class: "buttonRow" }, [
            vue.createElementVNode("view", {
              class: "button",
              onClick: _cache[1] || (_cache[1] = () => {
                $setup.handleSendRecordPop(true);
              })
            }, [
              vue.createElementVNode("text", null, "转赠记录")
            ]),
            vue.createElementVNode("view", {
              class: "button",
              onClick: _cache[2] || (_cache[2] = () => {
                $setup.handleTransactionRecord(true);
              })
            }, [
              vue.createElementVNode("text", null, "交易记录")
            ]),
            vue.createElementVNode("view", {
              class: "button",
              onClick: $setup.handlePromoEarnings
            }, [
              vue.createElementVNode("text", null, "推广收益")
            ])
          ])
        ])
      ]),
      vue.createCommentVNode(" 修改名字弹窗 "),
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
            onClick: $setup.handleConfirm
          }, [
            vue.createElementVNode("text", null, "确定修改")
          ]),
          vue.createElementVNode("view", { class: "inputBgc" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.newName = $event),
                maxlength: "6",
                "auto-focus": true,
                placeholder: "名字最大长度为6"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.newName]
            ])
          ]),
          $setup.isShowTip ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tip"
          }, [
            vue.createElementVNode("text", null, "能量石余额不足")
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 二次确认弹窗 "),
      $setup.isShowConfirmPop ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "confirmPop"
      }, [
        vue.createElementVNode("view", { class: "confirmBgc" }, [
          vue.createElementVNode("view", { class: "confirmTitle" }, "确认修改"),
          vue.createElementVNode("view", { class: "confirmContent" }, [
            vue.createElementVNode("text", null, "修改名字将消耗 100 能量石，是否继续？")
          ]),
          vue.createElementVNode("view", { class: "confirmButtons" }, [
            vue.createElementVNode("view", {
              class: "confirmButton cancel",
              onClick: _cache[4] || (_cache[4] = ($event) => $setup.isShowConfirmPop = false)
            }, [
              vue.createElementVNode("text", null, "取消")
            ]),
            vue.createElementVNode("view", {
              class: "confirmButton ok",
              onClick: $setup.handleRealConfirm
            }, [
              vue.createElementVNode("text", null, "确定")
            ])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 记录弹窗区域 "),
      $setup.isShowSendRecordPop ? (vue.openBlock(), vue.createBlock($setup["userSendRecordVue"], {
        key: 2,
        onClose: _cache[5] || (_cache[5] = () => {
          $setup.handleSendRecordPop(false);
        })
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowTransationPop ? (vue.openBlock(), vue.createBlock($setup["userTransactionRecordVue"], {
        key: 3,
        onClose: _cache[6] || (_cache[6] = () => {
          $setup.handleTransactionRecord(false);
        })
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowReferralPop ? (vue.openBlock(), vue.createBlock($setup["referralEarningsRecordVue"], {
        key: 4,
        onClose: _cache[7] || (_cache[7] = () => {
          $setup.isShowReferralPop = false;
        })
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const userInfoPop = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-13ced562"], ["__file", "D:/HBuilderProjects/Game/components/userInfoPop.vue"]]);
  const openImg = "../static/toolsBar/switchOn.png";
  const closeImg = "../static/toolsBar/switchOff.png";
  const _sfc_main$o = {
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
        uni.navigateTo({
          url: "/pages/HomePage/HomePage"
        });
      }
      const __returned__ = { gameInfo, props, openImg, closeImg, bgm, handleImg, exit, ref: vue.ref, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "settingWrap" }, [
      vue.createElementVNode("view", { class: "bgc" }, [
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.props.handleShow(0, false);
          })
        }),
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "设置")
        ]),
        vue.createElementVNode(
          "view",
          {
            class: "switch",
            onClick: _cache[1] || (_cache[1] = () => {
              $setup.handleImg();
            }),
            style: vue.normalizeStyle(`background-image: url(${$setup.gameInfo.bgmIsOpen ? $setup.openImg : $setup.closeImg});`)
          },
          [
            vue.createElementVNode("text", { class: "text" }, "bgm")
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "exit",
          onClick: $setup.exit
        }, [
          vue.createElementVNode("text", null, "退出云城")
        ])
      ])
    ]);
  }
  const settingPop = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-9e95edd8"], ["__file", "D:/HBuilderProjects/Game/components/settingPop.vue"]]);
  const _imports_0$1 = "/static/rule.jpg";
  const _sfc_main$n = {
    __name: "rulePop",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const handleClose = () => {
        props.handleShow(4, false);
      };
      const handleMaskClick = () => {
        handleClose();
      };
      const __returned__ = { props, handleClose, handleMaskClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "ruleWrap",
      onClick: $setup.handleMaskClick
    }, [
      vue.createElementVNode("view", {
        class: "pop",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "玩法")
        ]),
        vue.createElementVNode("view", { class: "imgWrap" }, [
          vue.createElementVNode("image", {
            src: _imports_0$1,
            mode: "widthFix"
          })
        ]),
        vue.createElementVNode("view", {
          class: "close",
          onClick: $setup.handleClose
        })
      ])
    ]);
  }
  const rulePop = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-961e39f0"], ["__file", "D:/HBuilderProjects/Game/components/rulePop.vue"]]);
  const _imports_0 = "/static/market/diamond.png";
  const _sfc_main$m = {
    __name: "homeSignInPresentation",
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const showRewardModal = vue.ref(false);
      const selectedActivity = vue.ref(null);
      vue.onMounted(async () => {
        const userId = uni.getStorageSync("id");
        if (!userId)
          return;
        try {
          const res = await Ys.callFunction({
            name: "selectPurchaseActivity",
            data: {
              userId
            }
          });
          if (res.result.code === 0 && res.result.data.length > 0) {
            const serverTime = new Date(res.result.serverTime);
            const today = new Date(serverTime);
            today.setHours(0, 0, 0, 0);
            const activity = res.result.data.find((record) => {
              const lastClaimTime = record.lastClaimTime ? new Date(record.lastClaimTime) : null;
              return !lastClaimTime || lastClaimTime < today;
            });
            if (activity) {
              selectedActivity.value = activity;
              showRewardModal.value = true;
            }
          }
        } catch (err) {
          formatAppLog("error", "at components/homeSignInPresentation.vue:69", "查询失败:", err);
        }
      });
      const handleClaim = async () => {
        if (!selectedActivity.value)
          return;
        uni.showLoading({
          title: "领取中...",
          mask: true
        });
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.hideLoading();
          uni.showToast({
            title: "用户未登录，请重新登录！",
            icon: "none"
          });
          return;
        }
        try {
          const res = await Ys.callFunction({
            name: "claimDailyReward",
            data: {
              userId,
              activityId: selectedActivity.value.activityId,
              dailyReward: selectedActivity.value.dailyReward
            }
          });
          if (res.result.code === 0) {
            uni.hideLoading();
            uni.showToast({
              title: "领取成功！",
              icon: "success"
            });
            getUserAssets();
            addAssetsChangeRecord(userId, DIAMOND, selectedActivity.value.dailyReward, `蛇年限定礼包每日领取: `);
            showRewardModal.value = false;
          } else {
            uni.hideLoading();
            uni.showToast({
              title: "领取失败，请重试！",
              icon: "none"
            });
          }
        } catch (err) {
          formatAppLog("error", "at components/homeSignInPresentation.vue:128", "领取失败:", err);
          uni.hideLoading();
          uni.showToast({
            title: "领取失败，请重试！",
            icon: "none"
          });
        }
      };
      const __returned__ = { gameInfo, showRewardModal, selectedActivity, handleClaim, ref: vue.ref, onMounted: vue.onMounted, get DIAMOND() {
        return DIAMOND;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" 弹窗 "),
      $setup.showRewardModal ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "rewardModal"
      }, [
        vue.createElementVNode("view", { class: "modalContent" }, [
          vue.createCommentVNode(" 礼包名字 "),
          vue.createElementVNode(
            "text",
            { class: "activityName" },
            vue.toDisplayString($setup.selectedActivity.name),
            1
            /* TEXT */
          ),
          vue.createCommentVNode(" 宝石图片和数量 "),
          vue.createElementVNode("view", { class: "rewardInfo" }, [
            vue.createElementVNode("image", {
              class: "gemImage",
              src: _imports_0,
              mode: "widthFix"
            }),
            vue.createElementVNode(
              "text",
              { class: "gemAmount" },
              vue.toDisplayString($setup.selectedActivity.dailyReward) + " 金刚石",
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 签到按钮 "),
          vue.createElementVNode("button", {
            class: "claimButton",
            onClick: $setup.handleClaim
          }, "领取")
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const homeSignInPresentationVue = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-f15ff1d8"], ["__file", "D:/HBuilderProjects/Game/components/homeSignInPresentation.vue"]]);
  const _sfc_main$l = {
    __name: "activityPop",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const isBuySuccus = vue.ref(false);
      const activities = vue.ref([
        {
          id: "1",
          image: "/static/home/th.jpg",
          name: "蛇年限定礼包",
          description: "永久工人 + 锄头1/个",
          price: 58,
          // 价格（水晶）
          duration: 18,
          // 礼包期限（天）
          dailyReward: 2
          // 每日收获数量
        }
      ]);
      const purchasedActivityIds = vue.ref([]);
      const isModalVisible = vue.ref(false);
      const selectedActivity = vue.ref(null);
      const fetchPurchasedActivities = async () => {
        const userId = uni.getStorageSync("id");
        if (!userId)
          return;
        try {
          const res = await Ys.callFunction({
            name: "selectPurchaseActivity",
            data: {
              userId
            }
          });
          if (res.result.code === 0) {
            purchasedActivityIds.value = res.result.data;
          } else {
            formatAppLog("error", "at components/activityPop.vue:103", "查询失败:", res.result.message);
          }
        } catch (err) {
          formatAppLog("error", "at components/activityPop.vue:106", "查询失败:", err);
        }
      };
      const showConfirmModal = (activity) => {
        selectedActivity.value = activity;
        isModalVisible.value = true;
      };
      const hideConfirmModal = () => {
        isModalVisible.value = false;
      };
      const handleConfirmPurchase = async () => {
        if (!selectedActivity.value)
          return;
        uni.showLoading({
          title: "购买中...",
          mask: true
        });
        if (gameInfo.assets.jewel < selectedActivity.value.price) {
          uni.hideLoading();
          uni.showToast({
            title: "余额不足！",
            icon: "none"
          });
          return;
        }
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.hideLoading();
          uni.showToast({
            title: "用户未登录，请重新登录！",
            icon: "none"
          });
          return;
        }
        try {
          const purchaseRes = await Ys.callFunction({
            name: "purchaseActivity",
            data: {
              userId,
              activityId: selectedActivity.value.id,
              price: selectedActivity.value.price,
              duration: selectedActivity.value.duration,
              dailyReward: selectedActivity.value.dailyReward,
              name: selectedActivity.value.name
            }
          });
          if (purchaseRes.result.code === 0) {
            uni.hideLoading();
            uni.showToast({
              title: "购买成功！",
              icon: "success"
            });
            getUserAssets();
            await fetchPurchasedActivities();
            isBuySuccus.value = true;
          } else {
            uni.hideLoading();
            uni.showToast({
              title: "购买失败，请重试！",
              icon: "none"
            });
          }
        } catch (err) {
          formatAppLog("error", "at components/activityPop.vue:185", "购买失败:", err);
          uni.hideLoading();
          uni.showToast({
            title: "购买失败，请重试！",
            icon: "none"
          });
        }
        hideConfirmModal();
      };
      const isPurchased = (activityId) => {
        return purchasedActivityIds.value.some((item) => item.activityId === activityId);
      };
      vue.onMounted(async () => {
        await fetchPurchasedActivities();
      });
      const __returned__ = { gameInfo, props, isBuySuccus, activities, purchasedActivityIds, isModalVisible, selectedActivity, fetchPurchasedActivities, showConfirmModal, hideConfirmModal, handleConfirmPurchase, isPurchased, ref: vue.ref, onMounted: vue.onMounted, get useGameInfoStore() {
        return useGameInfoStore;
      }, homeSignInPresentationVue, get getUserAssets() {
        return getUserAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "announcementWrap" }, [
      vue.createCommentVNode(" 购买成功就用来领取的组件 "),
      $setup.isBuySuccus ? (vue.openBlock(), vue.createBlock($setup["homeSignInPresentationVue"], {
        key: 0,
        activity: $setup.selectedActivity,
        onClose: _cache[0] || (_cache[0] = ($event) => $setup.isBuySuccus = false)
      }, null, 8, ["activity"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "pop" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "活动")
        ]),
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[1] || (_cache[1] = () => {
            $setup.props.handleShow(2, false);
          })
        }),
        vue.createCommentVNode(" 活动列表 "),
        vue.createElementVNode("view", { class: "activityList" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.activities, (activity, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "activityCard",
                key: index
              }, [
                vue.createCommentVNode(" 左边：图片和名称 "),
                vue.createElementVNode("view", { class: "left" }, [
                  vue.createElementVNode("image", {
                    class: "itemImage",
                    src: activity.image,
                    mode: "widthFix"
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "text",
                    { class: "itemName" },
                    vue.toDisplayString(activity.name),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createCommentVNode(" 中间：描述和价格 "),
                vue.createElementVNode("view", { class: "middle" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "itemDescription" },
                    vue.toDisplayString(activity.description),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "itemPrice" },
                    "价格: " + vue.toDisplayString(activity.price) + " 宝石",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createCommentVNode(" 右边：购买按钮 "),
                vue.createElementVNode("view", { class: "right" }, [
                  vue.createElementVNode("button", {
                    class: vue.normalizeClass(["buyButton", { disabled: $setup.isPurchased(activity.id) }]),
                    disabled: $setup.isPurchased(activity.id),
                    onClick: ($event) => $setup.showConfirmModal(activity)
                  }, vue.toDisplayString($setup.isPurchased(activity.id) ? "已拥有" : "购买"), 11, ["disabled", "onClick"])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 自定义确认弹窗 "),
      $setup.isModalVisible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "customModal"
      }, [
        vue.createElementVNode("view", { class: "modalContent" }, [
          vue.createElementVNode("text", { class: "modalTitle" }, "确认购买"),
          vue.createElementVNode(
            "text",
            { class: "modalMessage" },
            vue.toDisplayString($setup.selectedActivity.name) + " 吗？",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "modalButtons" }, [
            vue.createElementVNode("button", {
              class: "modalButton cancel",
              onClick: $setup.hideConfirmModal
            }, "取消"),
            vue.createElementVNode("button", {
              class: "modalButton confirm",
              onClick: $setup.handleConfirmPurchase
            }, "确认")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const activityPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-83f5b7af"], ["__file", "D:/HBuilderProjects/Game/components/activityPop.vue"]]);
  const _sfc_main$k = {
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
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
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
  const announcementPop = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-c26e9d23"], ["__file", "D:/HBuilderProjects/Game/components/announcementPop.vue"]]);
  function findEmptyGround(groundType) {
    const gameInfo = useGameInfoStore();
    const thisTypeGrounds = gameInfo.ownGrounds[groundType];
    for (let i2 = 0; i2 < thisTypeGrounds.length; i2++) {
      const item = thisTypeGrounds[i2];
      if (!item.isHaveWorker)
        return i2 + 1;
    }
    return false;
  }
  function getWorkerEndTime(workerType) {
    const gameInfo = useGameInfoStore();
    const duration = gameInfo.workersMeta[workerType].retainerDuration;
    const now2 = /* @__PURE__ */ new Date();
    const timestamp = now2.getTime();
    const newTimestamp = timestamp + duration * 24 * 3600 * 1e3;
    const newDate = new Date(newTimestamp);
    return newDate.toISOString();
  }
  function netWorkError() {
    uni.showToast({
      title: "网络错误",
      duration: 3e3,
      icon: "error"
    });
  }
  function showTips(string) {
    uni.showToast({
      title: string,
      duration: 3e3,
      icon: "error"
    });
  }
  function showSuccus(string) {
    uni.showToast({
      title: string,
      duration: 3e3,
      icon: "success"
    });
  }
  const selectImg = "../static/ground/select.png";
  const unselectImg = "../static/ground/unselect.png";
  const _sfc_main$j = {
    __name: "chooseWorkerPlacePop",
    props: ["closePop", "workerType"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const gameInfo = useGameInfoStore();
      const selectIndex = vue.ref(0);
      const workerPrice = gameInfo.workersMeta[props.workerType].retainerPrice;
      function judgeHaveThisGround(type) {
        const list = Object.keys(gameInfo.ownGrounds);
        let flag = false;
        for (let item of list) {
          if (item == type) {
            const temList = gameInfo.ownGrounds[item];
            for (let ground of temList) {
              if (!ground.isHaveWorker) {
                flag = true;
                break;
              }
            }
            if (flag === true)
              break;
          }
        }
        return flag;
      }
      function confirmRetire() {
        const nowNum = gameInfo.assets[POWERSTONE];
        if (nowNum < workerPrice) {
          showTips("余额不足");
          return;
        }
        if (selectIndex.value < 1) {
          showTips("请选择地皮");
          return;
        }
        uni.showLoading({
          mask: true,
          title: "招聘中..."
        });
        Ys.callFunction({
          name: "hireWorker",
          data: {
            userId: uni.getStorageSync("id"),
            hirePrice: workerPrice,
            workerType: props.workerType,
            groundType: selectIndex.value,
            groundIndex: findEmptyGround(selectIndex.value),
            workerEndTime: getWorkerEndTime(props.workerType)
          }
        }).then((res) => {
          if (res) {
            props.closePop();
            updateOwnGrounds();
            getUserAssets();
            uni.hideLoading();
          } else {
            netWorkError();
          }
        });
      }
      const __returned__ = { props, gameInfo, selectImg, unselectImg, selectIndex, workerPrice, judgeHaveThisGround, confirmRetire, computed: vue.computed, ref: vue.ref, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get findEmptyGround() {
        return findEmptyGround;
      }, get getWorkerEndTime() {
        return getWorkerEndTime;
      }, get updateOwnGrounds() {
        return updateOwnGrounds;
      }, get netWorkError() {
        return netWorkError;
      }, get showTips() {
        return showTips;
      }, get getUserAssets() {
        return getUserAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "chooseWorkerPlaceWrap" }, [
      vue.createElementVNode("view", { class: "chooseboard" }, [
        vue.createElementVNode("view", {
          class: "chooseclose",
          onClick: _cache[0] || (_cache[0] = (...args) => $props.closePop && $props.closePop(...args))
        }),
        vue.createElementVNode("view", { class: "chooseTitle" }, " 请选择所工作土地类型 "),
        vue.createElementVNode("view", { class: "wrap1" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(5, (item) => {
              return vue.createElementVNode("view", { class: "innerWrap" }, [
                $setup.judgeHaveThisGround(item) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "itemWrap"
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "groundImg",
                      style: vue.normalizeStyle(`background-image: url(../static/ground/ground${item}.png);`)
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { class: "groundDesc" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "groundName" },
                      vue.toDisplayString($setup.gameInfo.groundsMeta[item].groundName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "groundPrice" },
                      " 每日产出" + vue.toDisplayString($setup.gameInfo.groundsMeta[item].dailyEarnings) + "金刚石 ",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", {
                    onClick: ($event) => $setup.selectIndex = item,
                    class: "select",
                    style: vue.normalizeStyle(`background-image: url(${$setup.selectIndex === item ? $setup.selectImg : $setup.unselectImg});`)
                  }, null, 12, ["onClick"])
                ])) : vue.createCommentVNode("v-if", true)
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", {
          class: "retireBtn",
          onClick: $setup.confirmRetire
        }, " 确认招募 ")
      ])
    ]);
  }
  const chooseWorkerPlacePopVue = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-8fc36c4d"], ["__file", "D:/HBuilderProjects/Game/components/chooseWorkerPlacePop.vue"]]);
  const _sfc_main$i = {
    __name: "talentCenterPop",
    props: ["handleShowTanlentPop", "isVisible"],
    setup(__props, { expose: __expose }) {
      __expose();
      const isShowChoosePop = vue.ref(false);
      const chosenWorkerType = vue.ref(null);
      const isMaskVisible = vue.ref(true);
      const props = __props;
      const names = ["艾伦", "索菲亚", "杰克", "莱塔", "亚历山大"];
      const desc = ["每日自动签到", "加成效率30%", "加成效率50%", "加成效率70%", "加成效率90%"];
      const price = [38, 288, 588, 988, 1998];
      const gameInfo = useGameInfoStore();
      const workersMeta = vue.computed(() => {
        const keys = Object.keys(gameInfo.workersMeta);
        const res = [];
        for (let key of keys) {
          res.push(gameInfo.workersMeta[key]);
        }
        return res;
      });
      vue.watch(
        () => props.isVisible,
        (newVal) => {
          if (newVal) {
            isMaskVisible.value = true;
          }
        }
      );
      function handleShowChoosePop(type) {
        isShowChoosePop.value = type;
      }
      function hireWorker(workerType) {
        handleShowChoosePop(true);
        chosenWorkerType.value = workerType;
      }
      function closeMask() {
        isMaskVisible.value = false;
        props.handleShowTanlentPop(false);
        isMaskVisible.value = true;
      }
      const __returned__ = { isShowChoosePop, chosenWorkerType, isMaskVisible, props, names, desc, price, gameInfo, workersMeta, handleShowChoosePop, hireWorker, closeMask, computed: vue.computed, ref: vue.ref, watch: vue.watch, chooseWorkerPlacePopVue, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "talentWrap" }, [
      vue.createCommentVNode(" 为工人选择应用的地皮 "),
      $setup.isShowChoosePop ? (vue.openBlock(), vue.createBlock($setup["chooseWorkerPlacePopVue"], {
        key: 0,
        closePop: () => {
          $setup.handleShowChoosePop(false);
        },
        workerType: $setup.chosenWorkerType
      }, null, 8, ["closePop", "workerType"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 蒙版 "),
      $setup.isMaskVisible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "mask",
        onClick: $setup.closeMask
      }, [
        vue.createElementVNode("view", { class: "maskContent" }, [
          vue.createElementVNode("text", { class: "maskText" }, "该功能暂未开放，敬请期待！")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        class: "close",
        onClick: _cache[0] || (_cache[0] = ($event) => $props.handleShowTanlentPop(false))
      }),
      vue.createElementVNode("view", { class: "board" }, [
        vue.createElementVNode("view", { class: "listArea" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.workersMeta, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "itemWrap",
                key: index
              }, [
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
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "desc" },
                    vue.toDisplayString(item.ability),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "price" },
                    " 招募价格: " + vue.toDisplayString(item.retainerPrice) + " 能量石 ",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", {
                  class: "btn",
                  onClick: () => {
                    $setup.hireWorker(index + 1);
                  }
                }, [
                  vue.createElementVNode("text", { class: "text" }, "招募")
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const talentCenterPop = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-52356c3d"], ["__file", "D:/HBuilderProjects/Game/components/talentCenterPop.vue"]]);
  const getAssetChangeRecord = async (resourceType) => {
    const userId = uni.getStorageSync("id");
    try {
      const res = await Ys.callFunction({
        name: "getAssetsChangeRecord",
        data: {
          userId,
          resourceType
        }
      });
      if (res.result.code === 200) {
        return res.result.data;
      } else {
        formatAppLog("error", "at utils/getAssetChangeRecord .js:16", "查询失败:", res.result);
        return [];
      }
    } catch (err) {
      formatAppLog("error", "at utils/getAssetChangeRecord .js:20", "调用云函数失败:", err);
      return [];
    }
  };
  const _sfc_main$h = {
    __name: "GemRecordPopup",
    props: {
      gemType: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
    emits: ["update:visible"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const assetsNameMap2 = {
        powerStone: "能量石",
        diamond: "金刚石",
        resourceStone: "资源石",
        jewel: "宝石"
      };
      const props = __props;
      const emit = __emit;
      const records = vue.ref([]);
      const loading = vue.ref(false);
      vue.watch(
        () => props.visible,
        async (newVal) => {
          if (newVal) {
            await fetchRecords();
          }
        }
      );
      const fetchRecords = async () => {
        loading.value = true;
        records.value = await getAssetChangeRecord(props.gemType);
        loading.value = false;
      };
      const formatTime = (time) => {
        const date = new Date(time);
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
          date.getDate()
        ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      };
      const closePopup = () => {
        emit("update:visible", false);
      };
      const __returned__ = { assetsNameMap: assetsNameMap2, props, emit, records, loading, fetchRecords, formatTime, closePopup, ref: vue.ref, watch: vue.watch, get getAssetChangeRecord() {
        return getAssetChangeRecord;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 背景遮罩 "),
        $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "popup-mask",
          onClick: $setup.closePopup
        })) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 弹窗内容 "),
        $props.visible ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "popup-content"
        }, [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode(
              "text",
              { class: "title" },
              vue.toDisplayString($setup.assetsNameMap[$props.gemType]) + "明细记录",
              1
              /* TEXT */
            ),
            vue.createCommentVNode(" 添加关闭按钮 "),
            vue.createElementVNode("text", {
              class: "close-btn",
              onClick: $setup.closePopup
            }, "×")
          ]),
          vue.createElementVNode("view", { class: "list" }, [
            $setup.loading ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "loading"
            }, "加载中...")) : $setup.records.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "empty"
            }, "暂无记录")) : (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              vue.renderList($setup.records, (record, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "record-item"
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "time" },
                    vue.toDisplayString($setup.formatTime(record.time)),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "description" },
                    vue.toDisplayString(record.description),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "num" },
                    vue.toDisplayString(record.num),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const GemRecordPopupVue = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-97c76b89"], ["__file", "D:/HBuilderProjects/Game/components/GemRecordPopup.vue"]]);
  const _sfc_main$g = {
    __name: "bag",
    props: ["handleShow"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const endTime = vue.ref("");
      const showHoe = vue.ref(false);
      function formatEndTime(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}到期`;
      }
      async function isShowHoe() {
        const userId = uni.getStorageSync("id");
        if (!userId) {
          formatAppLog("error", "at components/bag.vue:40", "用户 ID 不存在");
          return false;
        }
        try {
          const res = await Ys.callFunction({
            name: "selectAllActivitt",
            // 假设云函数名为 selectAllActivitt
            data: {
              userId
            }
          });
          const hoeActivity = res.result.data.find((record) => record.activityId === "1");
          if (hoeActivity) {
            showHoe.value = true;
            endTime.value = hoeActivity.endTime;
          }
          return !!hoeActivity;
        } catch (err) {
          formatAppLog("error", "at components/bag.vue:61", "请求活动记录失败:", err);
          return false;
        }
      }
      isShowHoe();
      const __returned__ = { props, endTime, showHoe, formatEndTime, isShowHoe, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "ruleWrap" }, [
      vue.createElementVNode("view", { class: "pop" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "背包")
        ]),
        vue.createElementVNode("view", { class: "itemList" }, [
          $setup.showHoe ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "item hoe"
          }, [
            vue.createElementVNode("text", null, "锄头"),
            vue.createCommentVNode(" 添加到期时间 "),
            $setup.endTime ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "endTime"
              },
              vue.toDisplayString($setup.formatEndTime($setup.endTime)),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.props.handleShow(1, false);
          })
        })
      ])
    ]);
  }
  const bagVue = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-1134a5df"], ["__file", "D:/HBuilderProjects/Game/components/bag.vue"]]);
  const _sfc_main$f = {};
  function _sfc_render$e(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "loadingWrap" }, [
      vue.createElementVNode("view", { class: "loading" }),
      vue.createElementVNode("view", { class: "tips" }, "加载中...")
    ]);
  }
  const loadingVue = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-d56252fb"], ["__file", "D:/HBuilderProjects/Game/components/loading.vue"]]);
  const _sfc_main$e = {
    __name: "GameHome",
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
      const isShowActivityPop = vue.ref(false);
      const isShowBagPop = vue.ref(false);
      const gameInfo = useGameInfoStore();
      const bgm = gameInfo.bgm;
      const setCache = Cache.setCache;
      const getCache2 = Cache.getCache;
      const groundsDB = Ys.importObject("grounds");
      const isShowLoading = vue.ref(true);
      const isPopupVisible = vue.ref(false);
      const currentGemType = vue.ref("");
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
        if (type === 1)
          isShowBagPop.value = bool;
        if (type === 2)
          isShowActivityPop.value = bool;
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
      const openRecordPopup = (gemType) => {
        currentGemType.value = gemType;
        isPopupVisible.value = true;
      };
      vue.onMounted(async () => {
        uni.hideLoading();
        updateOwnGrounds();
        setTimeout(function() {
          isShowLoading.value = false;
        }, 2e3);
      });
      const __returned__ = { keyword, screenWidth, screenHeight, mapWidth, mapHeight, startX, startY, translateX, translateY, isShowInfo, isShowSettingPop, isShowRulePop, isShowAnnouncementPop, isShowTalentPop, isShowActivityPop, isShowBagPop, gameInfo, bgm, setCache, getCache: getCache2, groundsDB, isShowLoading, isPopupVisible, currentGemType, systemInfo, getVwVhInPx, handleTouchStart, handleTouchMove, handleTouchEnd, handleShow, handleInfo, handleShowTanlentPop, openRecordPopup, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, ref: vue.ref, assetsHeader, avatar, toolsBar, cloudTip, dynamicPeople, clickMask, userInfoPop, settingPop, rulePop, activityPopVue, announcementPop, talentCenterPop, homeSignInPresentationVue, GemRecordPopupVue, bagVue, get ASSETS() {
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
      }, get updateOwnGrounds() {
        return updateOwnGrounds;
      }, loadingVue, get updateAssets() {
        return updateAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "pages" }, [
      $setup.isShowLoading ? (vue.openBlock(), vue.createBlock($setup["loadingVue"], { key: 0 })) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 头像, 资源, 工具栏 "),
      vue.createVNode($setup["avatar"], {
        onClick: _cache[0] || (_cache[0] = () => {
          $setup.handleInfo(true);
        })
      }),
      vue.createVNode($setup["assetsHeader"], {
        judge: 1,
        openRecordPopup: $setup.openRecordPopup
      }),
      vue.createVNode($setup["toolsBar"], { handleShow: $setup.handleShow }),
      vue.createCommentVNode(" 弹出组件 "),
      $setup.isShowInfo ? (vue.openBlock(), vue.createBlock($setup["userInfoPop"], {
        key: 1,
        closeInfo: () => {
          $setup.handleInfo(false);
        }
      }, null, 8, ["closeInfo"])) : vue.createCommentVNode("v-if", true),
      $setup.isShowSettingPop ? (vue.openBlock(), vue.createBlock($setup["settingPop"], {
        key: 2,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowRulePop ? (vue.openBlock(), vue.createBlock($setup["rulePop"], {
        key: 3,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      $setup.isShowAnnouncementPop ? (vue.openBlock(), vue.createBlock($setup["announcementPop"], {
        key: 4,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createVNode(
        $setup["activityPopVue"],
        { handleShow: $setup.handleShow },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $setup.isShowActivityPop]
      ]),
      $setup.isShowBagPop ? (vue.openBlock(), vue.createBlock($setup["bagVue"], {
        key: 5,
        handleShow: $setup.handleShow
      })) : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createVNode(
        $setup["talentCenterPop"],
        { handleShowTanlentPop: $setup.handleShowTanlentPop },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $setup.isShowTalentPop]
      ]),
      vue.createCommentVNode(" 签到组件 "),
      vue.createVNode($setup["homeSignInPresentationVue"]),
      vue.createCommentVNode(" 资源明细展示 "),
      vue.createVNode($setup["GemRecordPopupVue"], {
        visible: $setup.isPopupVisible,
        "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => $setup.isPopupVisible = $event),
        gemType: $setup.currentGemType
      }, null, 8, ["visible", "gemType"]),
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
  const PagesGameHomeGameHome = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-c1aae60e"], ["__file", "D:/HBuilderProjects/Game/pages/GameHome/GameHome.vue"]]);
  const _sfc_main$d = {
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
      const minimumPrice = {
        "diamond": 2,
        "resourceStone": 0.33,
        "powerStone": 1
      };
      const expectedNum = vue.computed(() => {
        if (inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]])
          return 0;
        const product = inputNumValue.value * inputPriceValue.value * 0.95;
        return roundToOneDecimal(product);
      });
      const needPowerStoneNum = vue.computed(() => {
        if (inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]])
          return 0;
        return roundToOneDecimal(inputNumValue.value * inputPriceValue.value);
      });
      const isShowWran = vue.computed(() => {
        return inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]];
      });
      const isSell2 = vue.computed(() => {
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
        inputPriceValue.value = parseFloat(price);
      }
      function setNumValue(num) {
        inputNumValue.value = parseFloat(num);
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
        if (tem > max && isSell2.value)
          return;
        inputNumValue.value += num;
      }
      async function confirmSellPublish() {
        if (inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]]) {
          showTips("单价不满足要求");
          return;
        }
        if (inputPriceValue.value > 999) {
          showTips("单价最高1000");
          return;
        }
        if (inputNumValue.value > gameInfo.assets[props.gemImgName[selectIndex.value]]) {
          isShowNotEnough.value = true;
          showTips("余额不足");
          return;
        }
        if (inputNumValue.value > 9999) {
          showTips("发布最大数量为1w");
          return;
        }
        if (!Number.isInteger(inputNumValue.value)) {
          showTips("数量只能为整数");
          return;
        }
        const gemType = props.gemImgName[selectIndex.value];
        uni.showLoading({
          title: "发布中",
          mask: true
        });
        Ys.callFunction({
          name: "sellPublish",
          data: {
            addData: {
              sellerId: uni.getStorageSync("id"),
              gemType,
              sellNum: parseInt(inputNumValue.value),
              sellPrice: parseFloat(inputPriceValue.value),
              isFinished: false,
              publishTime: /* @__PURE__ */ new Date()
            },
            inputNumValue: inputNumValue.value,
            userId: uni.getStorageSync("id")
          }
        }).then((res) => {
          uni.hideLoading();
          if (res.result.code === 0) {
            showSuccus("发布成功!");
            formatAppLog("log", "at components/marketPublish.vue:206", "res:", res);
            getUserAssets();
            addAssetsChangeRecord(uni.getStorageSync("id"), gemType, inputNumValue.value, `发布出售(单价: ${inputPriceValue.value}), 由平台扣除`);
            props.controlPublish(false);
            props.updateData();
          } else {
            showTips(`发布失败: ${res.result.message}`);
          }
        }).catch((err) => {
          uni.hideLoading();
          showTips("网络错误，请稍后重试");
          formatAppLog("error", "at components/marketPublish.vue:217", "云函数调用失败:", err);
        });
      }
      async function confirmNeedPublish() {
        const gemType = props.gemImgName[selectIndex.value];
        const totalPrice = roundToOneDecimal(inputNumValue.value * inputPriceValue.value);
        if (inputPriceValue.value < minimumPrice[props.gemImgName[selectIndex.value]]) {
          showTips("单价不符合要求");
          return;
        }
        if (inputPriceValue.value > 999) {
          showTips("单价最高1000");
          return;
        }
        if (totalPrice > gameInfo.assets[JEWEL]) {
          isShowNotEnough.value = true;
          showTips("余额不足");
          return;
        }
        if (inputNumValue.value > 9999) {
          showTips("发布最大数量为1w");
          return;
        }
        if (!Number.isInteger(inputNumValue.value)) {
          showTips("数量只能为整数");
          return;
        }
        uni.showLoading({
          title: "发布中",
          mask: true
        });
        Ys.callFunction({
          name: "needPublish",
          data: {
            addData: {
              buyerId: uni.getStorageSync("id"),
              gemType,
              buyNum: parseInt(inputNumValue.value),
              buyPrice: parseFloat(inputPriceValue.value),
              isFinished: false,
              publishTime: /* @__PURE__ */ new Date()
            },
            totalPrice,
            userId: uni.getStorageSync("id")
          }
        }).then((res) => {
          uni.hideLoading();
          if (res.result.code === 0) {
            showTips("求购需求发布成功！");
            getUserAssets();
            addAssetsChangeRecord(uni.getStorageSync("id"), JEWEL, roundToOneDecimal(inputNumValue.value * inputPriceValue.value), `发布求购${assetsNameMap[gemType]}${inputNumValue.value}个(单价: ${inputPriceValue.value}), 由平台扣除`);
            props.controlPublish(false);
            props.updateData();
          } else {
            showTips(`求购需求发布失败: ${res.result.message}`);
          }
        }).catch((err) => {
          uni.hideLoading();
          showTips("网络错误，请稍后重试");
          formatAppLog("error", "at components/marketPublish.vue:287", "云函数调用失败:", err);
        });
      }
      const __returned__ = { gameInfo, props, selectIndex, inputNumValue, inputPriceValue, isShowNotEnough, minimumPrice, expectedNum, needPowerStoneNum, isShowWran, isSell: isSell2, confirmFun, getGemImg, handleIndex, setPriceValue, setNumValue, handleSellNum, confirmSellPublish, confirmNeedPublish, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, get JEWEL() {
        return JEWEL;
      }, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get netWorkError() {
        return netWorkError;
      }, get showSuccus() {
        return showSuccus;
      }, get showTips() {
        return showTips;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get assetsNameMap() {
        return assetsNameMap;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
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
        vue.createCommentVNode(" 单价 "),
        vue.createElementVNode("view", { class: "price" }, [
          $setup.isSell ? (vue.openBlock(), vue.createElementBlock(
            "text",
            { key: 0 },
            "出售最低单价: " + vue.toDisplayString($setup.minimumPrice[$props.gemImgName[$setup.selectIndex]]) + "个",
            1
            /* TEXT */
          )) : (vue.openBlock(), vue.createElementBlock(
            "text",
            { key: 1 },
            "求购最低单价: " + vue.toDisplayString($setup.minimumPrice[$props.gemImgName[$setup.selectIndex]]) + "个",
            1
            /* TEXT */
          )),
          vue.createElementVNode(
            "view",
            {
              class: "gemImg",
              style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
            },
            null,
            4
            /* STYLE */
          ),
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
        vue.createCommentVNode(' <view class="wran">\r\n				<text v-show="isShowWran">(请输入限制范围内的单价)</text>\r\n				<text v-show="isShowNotEnough&&isSell">({{gemItems[selectIndex]}}不足)</text>\r\n				<text v-show="isShowNotEnough&&!isSell">(宝石余额不足)</text>\r\n			</view> '),
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
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
  const marketPublish = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-16940c0f"], ["__file", "D:/HBuilderProjects/Game/components/marketPublish.vue"]]);
  const _sfc_main$c = {
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
        inputNumValue.value = parseFloat(num);
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
        const sellNum = props.certainItem.sellNum;
        const id = props.certainItem._id;
        const sellPrice = props.certainItem.sellPrice;
        const gemType = props.certainItem.gemType;
        if (inputNumValue.value <= 0 || inputNumValue.value > sellNum) {
          showTips("数量有误");
          return;
        }
        if (totalPrice.value > gameInfo.assets[JEWEL]) {
          handleShowWran(true);
          showTips("余额不足");
          return;
        }
        uni.showLoading({
          title: "购买中...",
          mask: true
        });
        Ys.callFunction({
          name: "sellTrade",
          data: {
            sellNum,
            id,
            sellPrice,
            sellerId: props.certainItem.sellerId,
            gemType,
            userId: uni.getStorageSync("id"),
            totalPrice: totalPrice.value,
            inputNumValue: inputNumValue.value
          }
        }).then((res) => {
          uni.hideLoading();
          if (res.result.code === 0) {
            getUserAssets();
            showTips("交易成功！");
            addAssetsChangeRecord(uni.getStorageSync("id"), gemType, inputNumValue.value, `出售市场中购买${inputNumValue.value}个(单价${sellPrice}), 获得:`);
            addAssetsChangeRecord(uni.getStorageSync("id"), JEWEL, totalPrice.value, `出售市场中购买${assetsNameMap[gemType]}${inputNumValue.value}个(单价${sellPrice}),扣除:`);
            addAssetsChangeRecord(props.certainItem.sellerId, JEWEL, roundToOneDecimal(totalPrice.value * 0.95), `所发布的${assetsNameMap[gemType]}(单价${sellPrice})被购买${inputNumValue.value}个,共获得(减去5%手续费):`);
            props.controlShowPop(false);
            props.updateData();
          } else if (res.result.code === -2) {
            showTips("请刷新同步数据");
          } else {
            showTips(`交易失败: ${res.result.message}`);
          }
        }).catch((err) => {
          uni.hideLoading();
          showTips("网络错误，请稍后重试");
          formatAppLog("error", "at components/buyCellPop.vue:245", "云函数调用失败:", err);
        });
      }
      async function confirmNeedPublish() {
        const buyNum = props.certainItem.buyNum;
        const id = props.certainItem._id;
        const buyPrice = props.certainItem.buyPrice;
        const gemType = props.certainItem.gemType;
        if (inputNumValue.value <= 0 || inputNumValue.value > buyNum) {
          showTips("数量有误");
          return;
        }
        if (inputNumValue.value > gameInfo.assets[gemType]) {
          handleShowWran(true);
          showTips("余额不足");
          return;
        }
        uni.showLoading({
          title: "出售中...",
          mask: true
        });
        Ys.callFunction({
          name: "needTrade",
          data: {
            buyNum,
            id,
            buyPrice,
            buyerId: props.certainItem.buyerId,
            gemType,
            userId: uni.getStorageSync("id"),
            expected: expected.value,
            inputNumValue: inputNumValue.value
          }
        }).then((res) => {
          uni.hideLoading();
          if (res.result.code === 0) {
            getUserAssets();
            showTips("交易成功！");
            addAssetsChangeRecord(uni.getStorageSync("id"), gemType, inputNumValue.value, `求购市场中出售${assetsNameMap[gemType]}(单价${buyPrice}), 扣除:`);
            addAssetsChangeRecord(uni.getStorageSync("id"), JEWEL, expected.value, `求购市场中出售${assetsNameMap[gemType]}${inputNumValue.value}个(单价${buyPrice}), 共获得(扣除5%手续费):`);
            addAssetsChangeRecord(props.certainItem.buyerId, gemType, inputNumValue.value, `所发布求购需求${assetsNameMap[gemType]}(单价${buyPrice}), 成功求购:`);
            props.controlShowPop(false);
            props.updateData();
          } else if (res.result.code === -2) {
            showTips("请刷新同步数据");
          } else {
            showTips(`交易失败: ${res.result.message}`);
          }
        }).catch((err) => {
          uni.hideLoading();
          showTips("网络错误，请稍后重试");
          formatAppLog("error", "at components/buyCellPop.vue:315", "云函数调用失败:", err);
        });
      }
      const __returned__ = { props, inputNumValue, isShowWarn, assetsDB, marketDB, gameInfo, isSellMarket, totalPrice, expected, btnWord, confirmFun, getGemImg, setNumValue, handleShowWran, handleSellNum, confirmSellPublish, confirmNeedPublish, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, get JEWEL() {
        return JEWEL;
      }, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get netWorkError() {
        return netWorkError;
      }, get showTips() {
        return showTips;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get assetsNameMap() {
        return assetsNameMap;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
                    style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
                    style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("jewel")});`)
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
  const buyCellPop = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-f77da028"], ["__file", "D:/HBuilderProjects/Game/components/buyCellPop.vue"]]);
  const premium = 0.08;
  const _sfc_main$b = {
    __name: "sentPop",
    props: ["closePop", "title", "updateData"],
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const props = __props;
      const selectIndex = vue.ref(0);
      const inputNumValue = vue.ref(0);
      const gameIDInputValue = vue.ref(null);
      const gemItems = ["能量石"];
      const gemImgName = ["powerStone"];
      const needPowerStoneNum = vue.computed(() => {
        if (inputNumValue.value <= 0)
          return 0;
        return roundToOneDecimal(inputNumValue.value * (1 + premium));
      });
      function getGemImg(item) {
        return `../../static/market/${item}.png`;
      }
      function handleIndex(index) {
        selectIndex.value = index;
        inputNumValue.value = 0;
      }
      function setNumValue(num) {
        inputNumValue.value = num;
      }
      function setGameIDValue(gameID) {
        gameIDInputValue.value = gameID;
      }
      function handleSellNum(num) {
        const max = gameInfo.assets[gemImgName[selectIndex.value]] | 0;
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
      async function confirmFun() {
        const gemType = gemImgName[selectIndex.value];
        if (inputNumValue.value <= 0) {
          showTips("转赠数量有误");
          return;
        }
        if (needPowerStoneNum.value > gameInfo.assets[gemType]) {
          showTips("余额不足!");
          return;
        }
        if (!gameIDInputValue.value) {
          showTips("请输入 gameID");
          return;
        }
        uni.showLoading({
          title: "转赠中",
          mask: true
        });
        try {
          const res = await Ys.callFunction({
            name: "sentAssets",
            data: {
              gameID: gameIDInputValue.value,
              userId: uni.getStorageSync("id"),
              assetsType: gemType,
              sendNum: roundToOneDecimal(inputNumValue.value),
              premium,
              type: 1
            }
          });
          formatAppLog("log", "at components/sentPop.vue:165", "云函数返回结果:", res.result);
          if (res.result.code === 1) {
            getUserAssets();
            await addAssetsChangeRecord(uni.getStorageSync("id"), POWERSTONE, needPowerStoneNum.value, `在交易集市中向游戏ID为${gameIDInputValue.value}的转赠能量石, 扣除(含8%手续费):`);
            const result = await getUserIDByGameID(gameIDInputValue.value);
            if (result.code === 0) {
              formatAppLog("log", "at components/sentPop.vue:177", "用户唯一 _id:", result.data._id);
              const useId = result.data._id;
              addAssetsChangeRecord(useId, POWERSTONE, roundToOneDecimal(inputNumValue.value), `在交易集市中收到游戏ID为${uni.getStorageSync("gameID")}的转赠能量石, 收到:`);
            } else {
              formatAppLog("error", "at components/sentPop.vue:181", "获取用户 _id 失败:", result.message);
            }
            showSuccus("转赠成功!");
            props.closePop();
          } else {
            let errorMessage = "转赠失败，请重试";
            switch (res.result.code) {
              case -1:
                errorMessage = "未找到该用户";
                break;
              case -2:
                errorMessage = "不能给自己转赠";
                break;
              case -3:
                errorMessage = "资源不足";
                break;
              case -4:
                errorMessage = "无效的资源类型";
                break;
              default:
                errorMessage = res.result.message || "未知错误";
            }
            showTips(errorMessage);
          }
        } catch (err) {
          formatAppLog("error", "at components/sentPop.vue:211", "转赠失败:", err);
          showTips("转赠失败，请重试");
        } finally {
          uni.hideLoading();
        }
      }
      const __returned__ = { gameInfo, props, selectIndex, inputNumValue, gameIDInputValue, premium, gemItems, gemImgName, needPowerStoneNum, getGemImg, handleIndex, setNumValue, setGameIDValue, handleSellNum, confirmFun, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, get JEWEL() {
        return JEWEL;
      }, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get netWorkError() {
        return netWorkError;
      }, get showSuccus() {
        return showSuccus;
      }, get showTips() {
        return showTips;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get getUserIDByGameID() {
        return getUserIDByGameID;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "publishWrap" }, [
      vue.createElementVNode("view", { class: "board" }, [
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = (...args) => $props.closePop && $props.closePop(...args))
        }),
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "转赠")
        ]),
        vue.createElementVNode("view", { class: "gems" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.gemItems, (item, index) => {
              return vue.createElementVNode("view", { class: "gemItem" }, [
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
                      style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[index])});`)
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
            64
            /* STABLE_FRAGMENT */
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
          vue.createElementVNode("view", {
            class: "max",
            onClick: _cache[4] || (_cache[4] = () => {
              $setup.handleSellNum(true);
            })
          }, [
            vue.createElementVNode("text", null, "最大")
          ])
        ]),
        vue.createCommentVNode(" 受赠者gameID "),
        vue.createElementVNode("view", { class: "sentGameID" }, [
          vue.createElementVNode("view", { class: "gameIDInputWrap" }, [
            vue.createElementVNode("input", {
              type: "text",
              value: $setup.gameIDInputValue,
              placeholder: "请输入赠送对象游戏ID",
              onInput: _cache[5] || (_cache[5] = (res) => {
                $setup.setGameIDValue(res.detail.value);
              })
            }, null, 40, ["value"])
          ])
        ]),
        vue.createElementVNode("view", { class: "tip" }, [
          vue.createElementVNode("view", { class: "premium item" }, [
            vue.createElementVNode("text", null, "手续费"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[$setup.selectIndex])});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.premium * 100) + "%",
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "needPowerStone item" }, [
            vue.createElementVNode("text", null, "最终需要扣除"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[$setup.selectIndex])});`)
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
          ])
        ]),
        vue.createElementVNode("view", {
          class: "confirmBtn",
          onClick: $setup.confirmFun
        }, [
          vue.createElementVNode("text", null, "确认转赠")
        ])
      ])
    ]);
  }
  const sentPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-e13ff159"], ["__file", "D:/HBuilderProjects/Game/components/sentPop.vue"]]);
  async function checkTradingRequrementAssets(data) {
    try {
      const result = await Ys.callFunction({
        name: "checkTradingRequrementAssets",
        // 云函数名称
        data
        // 传入的数据
      });
      return result.result;
    } catch (error) {
      formatAppLog("error", "at utils/checkTradingRequrementAssets.js:17", "调用云函数失败:", error);
      return { code: -5, message: "调用云函数失败" };
    }
  }
  const _sfc_main$a = {
    __name: "TradingMarkets",
    setup(__props, { expose: __expose }) {
      __expose();
      const marketCurrentIndex = vue.ref(0);
      const itemCurrentIndex = vue.ref(0);
      const itemCertainIndex = vue.ref(0);
      const isShowMarketPublish = vue.ref(false);
      const isShowBuySellPop = vue.ref(false);
      const gemItems = ["金刚石", "资源石", "能量石"];
      const gemImgName = ["diamond", "resourceStone", "powerStone"];
      const marketItems = ["出售", "求购"];
      const buttonWord = ["购买", "出售"];
      const marketDB = Ys.importObject("market");
      const assetsDB = Ys.importObject("assets");
      const sellRequirement = vue.ref({});
      const buyRequirement = vue.ref({});
      const isShowSentPop = vue.ref(false);
      const userId = uni.getStorageSync("id");
      const gameInfo = useGameInfoStore();
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
      function setShowSentPop(type) {
        isShowSentPop.value = type;
      }
      async function updateData() {
        gemImgName.forEach(async (item) => {
          const res1 = await marketDB.selectSellRequirement(item);
          const res2 = await marketDB.selectBuyRequirement(item);
          sellRequirement.value[item] = res1.data;
          buyRequirement.value[item] = res2.data;
        });
      }
      async function handleCancel(item) {
        uni.showModal({
          title: "确认取消",
          content: "您确定要撤销这条记录吗？\n操作后将返还你的资源",
          success: async (res) => {
            if (res.confirm) {
              try {
                uni.showLoading({
                  title: "处理中...",
                  mask: true
                  // 防止用户点击其他区域
                });
                const params = {
                  userId: uni.getStorageSync("id"),
                  // 当前用户 ID
                  recordId: item._id,
                  // 交易记录 ID
                  resourceType: item.gemType,
                  // 资源类型
                  resourceAmount: marketCurrentIndex.value === 0 ? item.sellNum : item.buyNum,
                  // 资源数量
                  price: marketCurrentIndex.value === 0 ? item.sellPrice : item.buyPrice,
                  // 资源单价
                  type: marketCurrentIndex.value
                  // 交易类型（0: 出售, 1: 求购）
                };
                const result = await Ys.callFunction({
                  name: "cancelTradeRequirement",
                  data: params
                });
                uni.hideLoading();
                if (result.result.code === 0) {
                  uni.showToast({
                    title: "取消成功",
                    icon: "success",
                    duration: 2e3
                    // 提示显示时长
                  });
                  getUserAssets();
                  if (marketCurrentIndex.value === 0) {
                    addAssetsChangeRecord(
                      uni.getStorageSync("id"),
                      item.gemType,
                      item.sellNum,
                      `出售市场中取消出售${assetsNameMap[item.gemType]}(单价${item.sellPrice}), 退回: `
                    );
                  } else {
                    addAssetsChangeRecord(
                      uni.getStorageSync("id"),
                      JEWEL,
                      roundToOneDecimal(item.buyNum * item.buyPrice),
                      `求购市场中取消求购${assetsNameMap[item.gemType]}(单价${item.buyPrice}), 退回: `
                    );
                  }
                  await updateData();
                } else if (result.result.code === -2) {
                  showTips("请刷新同步数据");
                } else if (result.result.code === -3) {
                  showTips("该条记录已经被取消请刷新");
                } else {
                  uni.showToast({
                    title: "取消失败：请刷新",
                    icon: "none",
                    duration: 3e3
                    // 提示显示时长
                  });
                }
              } catch (err) {
                uni.hideLoading();
                uni.showToast({
                  title: "取消失败：" + err.message,
                  icon: "none",
                  duration: 3e3
                  // 提示显示时长
                });
              }
            }
          }
        });
      }
      vue.onMounted(async () => {
        await updateData();
      });
      const __returned__ = { marketCurrentIndex, itemCurrentIndex, itemCertainIndex, isShowMarketPublish, isShowBuySellPop, gemItems, gemImgName, marketItems, buttonWord, marketDB, assetsDB, sellRequirement, buyRequirement, isShowSentPop, userId, gameInfo, showListData, numName, priceName, certainRequirement, setItemIndex, setMarketIndex, back, getGemImg, controlPublish, controlShowPop, setCertainIndex, setShowSentPop, updateData, handleCancel, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, assetsHeader1: assetsHeader, marketPublish, buyCellPop, sentPopVue, get formatLargeNumber() {
        return formatLargeNumber;
      }, get JEWEL() {
        return JEWEL;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get assetsNameMap() {
        return assetsNameMap;
      }, get showTips() {
        return showTips;
      }, get checkTradingRequrementAssets() {
        return checkTradingRequrementAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "tradingMarketWrap" }, [
      vue.createElementVNode("view", {
        class: "return",
        onClick: $setup.back
      }),
      vue.createElementVNode("view", {
        class: "reload",
        onClick: $setup.updateData
      }, [
        vue.createElementVNode("text", { class: "text" }, "刷新")
      ]),
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
      vue.createCommentVNode(" 转赠弹窗 "),
      $setup.isShowSentPop ? (vue.openBlock(), vue.createBlock($setup["sentPopVue"], {
        key: 2,
        closePop: () => {
          $setup.setShowSentPop(false);
        }
      }, null, 8, ["closePop"])) : vue.createCommentVNode("v-if", true),
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
          class: "sent",
          onClick: _cache[0] || (_cache[0] = () => {
            $setup.setShowSentPop(true);
          })
        }, [
          vue.createElementVNode("text", null, "转赠")
        ]),
        vue.createElementVNode("view", {
          class: "publish",
          onClick: _cache[1] || (_cache[1] = () => {
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
      vue.createCommentVNode(" 石头 "),
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
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  key: index
                }, [
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
                        vue.toDisplayString($setup.marketItems[$setup.marketCurrentIndex]) + " : " + vue.toDisplayString($setup.formatLargeNumber(item[$setup.numName])) + "个",
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
                        vue.toDisplayString($setup.formatLargeNumber(item[$setup.priceName])) + "/个",
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
                  ], 8, ["onClick"]),
                  vue.createCommentVNode(" 新增：取消按钮 "),
                  $setup.marketCurrentIndex === 0 && item.sellerId === $setup.userId || $setup.marketCurrentIndex === 1 && item.buyerId === $setup.userId ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "cancelButton",
                    onClick: () => {
                      $setup.handleCancel(item);
                    }
                  }, [
                    vue.createElementVNode("text", null, "取消")
                  ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])
    ]);
  }
  const PagesTradingMarketsTradingMarkets = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/HBuilderProjects/Game/pages/TradingMarkets/TradingMarkets.vue"]]);
  const _sfc_main$9 = {
    __name: "activateMinePop",
    props: ["closePop"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const selectIndex = vue.ref(0);
      const gemItems = ["金刚石"];
      const gemImgName = ["diamond", "meteorite"];
      const inputNumValue = vue.ref(0);
      const gameInfo = useGameInfoStore();
      function handleSellNum(num) {
        const max = gameInfo.assets[gemImgName[selectIndex.value]] | 0;
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
      function handleIndex(index) {
        selectIndex.value = index;
      }
      function getGemImg(item) {
        return `../../static/market/${item}.png`;
      }
      const __returned__ = { props, selectIndex, gemItems, gemImgName, inputNumValue, gameInfo, handleSellNum, handleIndex, getGemImg, ref: vue.ref, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "activateWrap" }, [
      vue.createElementVNode("view", { class: "board" }, [
        vue.createElementVNode("view", {
          class: "close",
          onClick: _cache[0] || (_cache[0] = (...args) => $props.closePop && $props.closePop(...args))
        }),
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "添加")
        ]),
        vue.createElementVNode("view", { class: "gems" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.gemItems, (item, index) => {
              return vue.createElementVNode("view", { class: "gemItem" }, [
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
                      style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[index])});`)
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
            64
            /* STABLE_FRAGMENT */
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
                _ctx.setNumValue(res.detail.value);
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
        vue.createElementVNode("view", { class: "tip" }, [
          vue.createElementVNode("view", { class: "own item" }, [
            vue.createElementVNode(
              "text",
              null,
              "我的" + vue.toDisplayString($setup.gemItems[$setup.selectIndex]),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg($setup.gemImgName[$setup.selectIndex])});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.gameInfo.assets[$setup.gemImgName[$setup.selectIndex]] | 0),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "obtain item" }, [
            vue.createElementVNode("text", null, "预计日产出"),
            vue.createElementVNode(
              "view",
              {
                class: "itemImg",
                style: vue.normalizeStyle(`background-image: url(${$setup.getGemImg("resourceStone")});`)
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode("text", null, vue.toDisplayString(0))
          ])
        ]),
        vue.createElementVNode("view", { class: "confirmBtn" }, [
          vue.createElementVNode("text", null, "确认添加")
        ])
      ])
    ]);
  }
  const activateMinePopVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-bf0f1432"], ["__file", "D:/HBuilderProjects/Game/components/activateMinePop.vue"]]);
  const _sfc_main$8 = {
    __name: "Mine",
    setup(__props, { expose: __expose }) {
      __expose();
      const isShowActivatePop = vue.ref(false);
      const isMaskVisible = vue.ref(true);
      function handlePop(flag) {
        isShowActivatePop.value = flag;
      }
      function back() {
        uni.navigateBack({
          delta: 1
        });
      }
      function closeMask() {
        isMaskVisible.value = false;
        back();
        isMaskVisible.value = true;
      }
      const __returned__ = { isShowActivatePop, isMaskVisible, handlePop, back, closeMask, ref: vue.ref, activateMinePopVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mineWrap" }, [
      vue.createCommentVNode(" 激活矿洞弹窗 "),
      $setup.isShowActivatePop ? (vue.openBlock(), vue.createBlock($setup["activateMinePopVue"], {
        key: 0,
        closePop: () => {
          $setup.handlePop(false);
        }
      }, null, 8, ["closePop"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 蒙版 "),
      $setup.isMaskVisible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "mask",
        onClick: $setup.closeMask
      }, [
        vue.createElementVNode("view", { class: "maskContent" }, [
          vue.createElementVNode("text", { class: "maskText" }, "该功能暂未开放，敬请期待！")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "mineBg" }, [
        vue.createElementVNode("view", { class: "stonesWrap" }, [
          vue.createElementVNode("view", { class: "stone item1" }),
          vue.createElementVNode("view", { class: "stone item2" }),
          vue.createElementVNode("view", { class: "stone item3" }),
          vue.createElementVNode("view", { class: "stone item4" }),
          vue.createElementVNode("view", { class: "stone item5" }),
          vue.createElementVNode("view", { class: "stone item6" }),
          vue.createElementVNode("view", { class: "stone item7" }),
          vue.createElementVNode("view", { class: "stone item8" }),
          vue.createElementVNode("view", { class: "stone item9" }),
          vue.createElementVNode("view", { class: "stone item10" })
        ]),
        vue.createElementVNode("view", { class: "miner" })
      ]),
      vue.createElementVNode("view", { class: "header1" }, [
        vue.createElementVNode("view", {
          class: "return",
          onClick: $setup.back
        })
      ]),
      vue.createElementVNode("view", { class: "scrollArea" }, [
        vue.createElementVNode("view", { class: "mineContent" }, [
          vue.createElementVNode("view", { class: "normalArea" }, [
            vue.createElementVNode("view", { class: "header2" }, [
              vue.createElementVNode("view", { class: "left" }, [
                vue.createElementVNode("text", null, "需要:"),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/jewel.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(834)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/diamond.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(695)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/resourceStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(1338)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/powerStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(1248))
              ])
            ]),
            vue.createCommentVNode(" 可收获数量 "),
            vue.createElementVNode("view", { class: "nowHarvest" }, [
              vue.createElementVNode("text", null, "当前可收获:"),
              vue.createElementVNode("view", { class: "wrap" }, [
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/jewel.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/diamond.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/resourceStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/powerStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0))
              ])
            ]),
            vue.createCommentVNode(" 按钮 "),
            vue.createElementVNode("view", { class: "btn harvest" }, "收获"),
            vue.createElementVNode("view", {
              class: "btn add",
              onClick: _cache[0] || (_cache[0] = () => $setup.handlePop(true))
            }, "激活")
          ]),
          vue.createElementVNode("view", { class: "bigArea" }, [
            vue.createElementVNode("view", { class: "header2" }, [
              vue.createElementVNode("view", { class: "left" }, [
                vue.createElementVNode("text", null, "需要:"),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/jewel.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(3336)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/diamond.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(2780)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/resourceStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(5552)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/powerStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(4992))
              ])
            ]),
            vue.createCommentVNode(" 可收获数量 "),
            vue.createElementVNode("view", { class: "nowHarvest" }, [
              vue.createElementVNode("text", null, "当前可收获:"),
              vue.createElementVNode("view", { class: "wrap" }, [
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/jewel.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/diamond.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/resourceStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0)),
                vue.createElementVNode("view", {
                  class: "gemImg1",
                  style: { "background-image": "url('../../static/market/powerStone.png')" }
                }),
                vue.createElementVNode("text", null, vue.toDisplayString(0))
              ])
            ]),
            vue.createCommentVNode(" 按钮 "),
            vue.createElementVNode("view", { class: "btn harvest" }, "收获"),
            vue.createElementVNode("view", {
              class: "btn add",
              onClick: _cache[1] || (_cache[1] = () => {
                $setup.handlePop(true);
              })
            }, "激活")
          ])
        ]),
        vue.createElementVNode("view", { class: "intro" })
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/HBuilderProjects/Game/pages/Mine/Mine.vue"]]);
  const _sfc_main$7 = {
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
  const workerVue = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-9daf811a"], ["__file", "D:/HBuilderProjects/Game/components/worker.vue"]]);
  function getGroundEndTime(groundType) {
    const gameInfo = useGameInfoStore();
    const duration = gameInfo.groundsMeta[groundType].duration;
    const now2 = /* @__PURE__ */ new Date();
    const timestamp = now2.getTime();
    const newTimestamp = timestamp + duration * 24 * 3600 * 1e3;
    const newDate = new Date(newTimestamp);
    return newDate.toISOString();
  }
  const _sfc_main$6 = {
    __name: "buyGroundPop",
    props: ["groundType", "groundIndex", "closePop", "offset", "updateData"],
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const gameInfo = useGameInfoStore();
      const groundMeta = gameInfo.groundsMeta[props.groundType];
      async function checkActivity() {
        try {
          const res = await Ys.callFunction({
            name: "selectAllActivitt",
            data: {
              userId: uni.getStorageSync("id")
            }
          });
          if (res.result.code === 0) {
            const hasActivity = res.result.data.some((record) => record.activityId === "1");
            return hasActivity;
          } else {
            formatAppLog("error", "at components/buyGroundPop.vue:55", "查询活动失败:", res.result.message);
            return false;
          }
        } catch (err) {
          formatAppLog("error", "at components/buyGroundPop.vue:59", "调用云函数失败:", err);
          return false;
        }
      }
      async function confirmUnlock() {
        const haveActivity = await checkActivity();
        if (!haveActivity) {
          showTips("未购买蛇年礼包");
          return;
        }
        const thisGround = gameInfo.groundsMeta[props.groundType];
        const unlockFunds = thisGround.unlockFunds;
        const groundName = thisGround.groundName;
        const duration = thisGround.duration;
        const nowNum = gameInfo.assets[POWERSTONE];
        if (nowNum < unlockFunds) {
          showTips("余额不足");
          return;
        }
        uni.showLoading({
          mask: true,
          title: "解锁中"
        });
        Ys.callFunction({
          name: "buyGround",
          data: {
            addUserGroundData: {
              userId: uni.getStorageSync("id"),
              groundType: props.groundType,
              groundIndex: props.groundIndex,
              rentTime: /* @__PURE__ */ new Date(),
              // 租赁时间
              endTime: getGroundEndTime(props.groundType),
              // 结束时间
              lastClaimTime: null,
              // 初始化领取时间为 null
              isHaveWorker: false,
              workerType: null,
              workerEndTime: null
            },
            userId: uni.getStorageSync("id"),
            unlockFunds,
            duration
          }
        }).then((res) => {
          uni.hideLoading();
          if (res.result.code === 0) {
            showSuccus("解锁成功!");
            getUserAssets();
            addAssetsChangeRecord(uni.getStorageSync("id"), POWERSTONE, unlockFunds, `解锁${groundName}扣除: `);
            props.closePop();
            props.updateData();
          } else {
            showTips(`解锁失败: ${res.result.message}`);
          }
        }).catch((err) => {
          uni.hideLoading();
          showTips("网络错误，请稍后重试");
          formatAppLog("error", "at components/buyGroundPop.vue:128", "购买失败:", err);
        });
      }
      const __returned__ = { props, gameInfo, groundMeta, checkActivity, confirmUnlock, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get netWorkError() {
        return netWorkError;
      }, get showSuccus() {
        return showSuccus;
      }, get showTips() {
        return showTips;
      }, get getGroundEndTime() {
        return getGroundEndTime;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get getUserAssets() {
        return getUserAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
            vue.toDisplayString($setup.groundMeta.groundName),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "contentWrap" }, [
            vue.createElementVNode(
              "view",
              { class: "price" },
              " 解锁: " + vue.toDisplayString($setup.groundMeta.unlockFunds) + "能量石 ",
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "duration" },
              " 产出: " + vue.toDisplayString($setup.groundMeta.duration) + "天 ",
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "desc" },
              " 描述: 每日收获" + vue.toDisplayString($setup.groundMeta.dailyEarnings) + "块能量石 ",
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", {
            class: "btn",
            onClick: $setup.confirmUnlock
          }, [
            vue.createElementVNode("text", null, "解锁")
          ])
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const buyGroundPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-002acaef"], ["__file", "D:/HBuilderProjects/Game/components/buyGroundPop.vue"]]);
  const _sfc_main$5 = {
    __name: "grondSignInPresentation",
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const userGrounds = vue.ref({});
      const showClaimModal = vue.ref(false);
      const isClaiming = vue.ref(false);
      const serverTime = vue.ref(null);
      let directEarning = 0;
      let indirectEarning = 0;
      const claimGroundList = [];
      async function fetchUserGrounds() {
        try {
          const res = await Ys.callFunction({
            name: "selectGrounds",
            data: {
              userId: uni.getStorageSync("id")
            }
          });
          if (res.result.code === 0) {
            userGrounds.value = res.result.data;
            serverTime.value = new Date(res.result.serverTime);
          } else {
            formatAppLog("error", "at components/grondSignInPresentation.vue:60", "查询失败:", res.result.message);
          }
        } catch (err) {
          formatAppLog("error", "at components/grondSignInPresentation.vue:63", "调用云函数失败:", err);
        }
      }
      function isTodayClaimed(lastClaimTime) {
        if (!lastClaimTime)
          return false;
        if (!serverTime.value)
          return false;
        const today = new Date(serverTime.value);
        today.setHours(0, 0, 0, 0);
        const claimDate = new Date(lastClaimTime);
        claimDate.setHours(0, 0, 0, 0);
        return claimDate.getTime() >= today.getTime();
      }
      function isGroundExpired(endTime) {
        if (!serverTime.value)
          return false;
        return new Date(endTime) > serverTime.value;
      }
      const totalEarnings = vue.computed(() => {
        let total = 0;
        for (const groundType in userGrounds.value) {
          userGrounds.value[groundType].forEach((ground) => {
            if (isGroundExpired(ground.endTime) && !isTodayClaimed(ground.lastClaimTime)) {
              const thisGround = gameInfo.groundsMeta[groundType];
              total = roundToOneDecimal(total + thisGround.dailyEarnings);
              const temDirectEarning = thisGround.dailyEarnings * thisGround.directPushEarnings;
              const temIndirectEarning = thisGround.dailyEarnings * thisGround.inDepthReturns;
              directEarning += temDirectEarning;
              indirectEarning += temIndirectEarning;
              claimGroundList.push(groundType);
            }
          });
        }
        return roundToOneDecimal(total);
      });
      vue.watch(totalEarnings, (newValue) => {
        if (newValue > 0) {
          showClaimModal.value = true;
        }
      });
      async function claimEarnings() {
        if (isClaiming.value)
          return;
        isClaiming.value = true;
        uni.showLoading({
          title: "领取中...",
          mask: true
          // 防止用户点击其他区域
        });
        try {
          const res = await Ys.callFunction({
            name: "claimGroundRewards",
            data: {
              userId: uni.getStorageSync("id"),
              earnings: totalEarnings.value,
              directEarning: roundToOneDecimal(directEarning),
              indirectEarning: roundToOneDecimal(indirectEarning),
              gameID: uni.getStorageSync("gameID"),
              claimGroundList
            }
          });
          if (res.result.code === 0) {
            uni.hideLoading();
            uni.showToast({
              title: "领取成功！",
              icon: "success",
              duration: 2e3
            });
            getUserAssets();
            addAssetsChangeRecord(
              uni.getStorageSync("id"),
              POWERSTONE,
              roundToOneDecimal(totalEarnings.value),
              "每日所拥有土地收入: "
            );
            await fetchUserGrounds();
            showClaimModal.value = false;
          } else {
            uni.hideLoading();
            uni.showToast({
              title: res.result.message || "领取失败，请重试！",
              icon: "none",
              duration: 2e3
            });
          }
        } catch (err) {
          formatAppLog("error", "at components/grondSignInPresentation.vue:170", "领取失败:", err);
          uni.hideLoading();
          uni.showToast({
            title: "领取失败，请重试！",
            icon: "none",
            duration: 2e3
          });
        } finally {
          isClaiming.value = false;
        }
      }
      vue.onMounted(async () => {
        await fetchUserGrounds();
      });
      const __returned__ = { gameInfo, userGrounds, showClaimModal, isClaiming, serverTime, get directEarning() {
        return directEarning;
      }, set directEarning(v2) {
        directEarning = v2;
      }, get indirectEarning() {
        return indirectEarning;
      }, set indirectEarning(v2) {
        indirectEarning = v2;
      }, claimGroundList, fetchUserGrounds, isTodayClaimed, isGroundExpired, totalEarnings, claimEarnings, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, watch: vue.watch, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      }, get getUserAssets() {
        return getUserAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 签到组件 "),
        vue.createElementVNode("view", null, [
          vue.createCommentVNode(" 弹窗 "),
          $setup.showClaimModal ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "rewardModal"
          }, [
            vue.createElementVNode("view", { class: "modalContent" }, [
              vue.createCommentVNode(" 标题 "),
              vue.createElementVNode("text", { class: "activityName" }, "今日地皮产出能量石"),
              vue.createCommentVNode(" 能量石图片和数量 "),
              vue.createElementVNode("view", { class: "rewardInfo" }, [
                vue.createElementVNode("image", {
                  class: "gemImage",
                  src: _imports_0$3,
                  mode: "widthFix"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "gemAmount" },
                  vue.toDisplayString($setup.roundToOneDecimal($setup.totalEarnings)) + " 能量石",
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 领取按钮 "),
              vue.createElementVNode("button", {
                class: "claimButton",
                disabled: $setup.isClaiming,
                onClick: $setup.claimEarnings
              }, [
                !$setup.isClaiming ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "领取")) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "领取中..."))
              ], 8, ["disabled"])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const grondSignInPresentationVue = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-d5e6e080"], ["__file", "D:/HBuilderProjects/Game/components/grondSignInPresentation.vue"]]);
  const _sfc_main$4 = {
    __name: "groundRecieveRecord",
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const recordList = vue.ref([]);
      function formatTime(timestamp) {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      function closePopup() {
        emit("close");
      }
      async function loadReceiveRecords() {
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        uni.showLoading({ title: "加载中..." });
        try {
          const res = await Ys.callFunction({
            name: "getReceiveRecords",
            // 云函数名称
            data: { userId }
          });
          if (res.result.code === 0) {
            recordList.value = res.result.data.sort((a2, b2) => new Date(b2.receiveTime) - new Date(a2.receiveTime));
          } else {
            uni.showToast({ title: res.result.message || "暂无领取记录", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at components/groundRecieveRecord.vue:84", "加载失败", err);
          uni.showToast({ title: "加载失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      vue.onMounted(() => {
        loadReceiveRecords();
      });
      const emit = __emit;
      const __returned__ = { recordList, formatTime, closePopup, loadReceiveRecords, emit, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "receiveRecordPopup" }, [
      vue.createCommentVNode(" 弹窗背景 "),
      vue.createElementVNode("view", {
        class: "mask",
        onClick: $setup.closePopup
      }),
      vue.createCommentVNode(" 弹窗内容 "),
      vue.createElementVNode("view", { class: "popup" }, [
        vue.createElementVNode("view", { class: "header" }, [
          vue.createElementVNode("text", { class: "title" }, "领取记录"),
          vue.createElementVNode("view", {
            class: "closeBtn",
            onClick: $setup.closePopup
          }, "×")
        ]),
        vue.createCommentVNode(" 记录列表 "),
        vue.createElementVNode("view", { class: "recordList" }, [
          vue.createCommentVNode(" 如果没有记录 "),
          $setup.recordList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty"
          }, [
            vue.createElementVNode("text", null, "暂无领取记录")
          ])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 如果有记录 "),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.recordList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "card",
                    key: index
                  }, [
                    vue.createCommentVNode(" 时间 "),
                    vue.createElementVNode("view", { class: "time" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString($setup.formatTime(item.receiveTime)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createCommentVNode(" 领取信息 "),
                    vue.createElementVNode("view", { class: "info" }, [
                      vue.createElementVNode("text", null, "领取能量石"),
                      vue.createElementVNode("image", {
                        class: "stoneImg",
                        src: _imports_0$3,
                        mode: "aspectFill"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "stoneNum" },
                        "×" + vue.toDisplayString(item.powerStoneAmount),
                        1
                        /* TEXT */
                      )
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const groundRecieveRecordVue = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-90e58db4"], ["__file", "D:/HBuilderProjects/Game/components/groundRecieveRecord.vue"]]);
  const _sfc_main$3 = {
    __name: "Ground",
    setup(__props, { expose: __expose }) {
      __expose();
      const groundType = vue.ref(null);
      const groundIndex = vue.ref(null);
      const isShowGroundPop = vue.ref(false);
      const isShowRecordPop = vue.ref(false);
      const groundsDB = Ys.importObject("grounds");
      const gameInfo = useGameInfoStore();
      const userGrounds = vue.ref(gameInfo.ownGrounds);
      function back() {
        uni.navigateBack({
          delta: 1
        });
      }
      function handleIsShowGroundPop(flag) {
        isShowGroundPop.value = flag;
      }
      function handleIsShowRecordPop(flag) {
        isShowRecordPop.value = flag;
      }
      async function clickLockGround(type, index) {
        groundType.value = type;
        groundIndex.value = index;
        handleIsShowGroundPop(true);
      }
      function judgeOwnThisGround(type, index) {
        var _a;
        let flag = false;
        const thisGrounds = (_a = userGrounds.value) == null ? void 0 : _a[type];
        if (thisGrounds) {
          for (let i2 = 0; i2 < thisGrounds.length; i2++) {
            const item = thisGrounds[i2];
            if (item.groundIndex === index) {
              flag = true;
              break;
            }
          }
        }
        return flag;
      }
      function selectWorker(type, index) {
        var _a;
        const thisGrounds = (_a = gameInfo.ownGrounds) == null ? void 0 : _a[type];
        if (thisGrounds) {
          for (let i2 = 0; i2 < thisGrounds.length; i2++) {
            const item = thisGrounds[i2];
            if (item.groundIndex === index) {
              return item.workerType;
            }
          }
        }
        return false;
      }
      function formatDateToDay(date) {
        if (typeof date === "string") {
          date = new Date(date);
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
      }
      function getEndTime(type, index) {
        var _a;
        const thisGrounds = (_a = gameInfo.ownGrounds) == null ? void 0 : _a[type];
        if (thisGrounds) {
          for (let i2 = 0; i2 < thisGrounds.length; i2++) {
            const item = thisGrounds[i2];
            if (item.groundIndex === index) {
              return formatDateToDay(item.endTime);
            }
          }
        }
        return false;
      }
      async function updateData() {
        try {
          const userId = uni.getStorageSync("id");
          if (!userId) {
            formatAppLog("error", "at pages/Ground/Ground.vue:296", "用户 ID 为空");
            return;
          }
          const res = await Ys.callFunction({
            name: "selectGrounds",
            // 云函数名称
            data: { userId }
            // 传入参数
          });
          formatAppLog("log", "at pages/Ground/Ground.vue:306", "云函数返回结果:", res);
          if (res.result.code === 0) {
            const classifyGrounds = res.result.data;
            userGrounds.value = classifyGrounds;
            gameInfo.ownGrounds = classifyGrounds;
          } else {
            formatAppLog("error", "at pages/Ground/Ground.vue:313", "云函数调用失败:", res.result.message);
          }
        } catch (error) {
          formatAppLog("error", "at pages/Ground/Ground.vue:316", "updateData 出错:", error.message);
        }
      }
      vue.onMounted(async () => {
        if (!gameInfo.ownGrounds)
          await updateData();
      });
      const __returned__ = { groundType, groundIndex, isShowGroundPop, isShowRecordPop, groundsDB, gameInfo, userGrounds, back, handleIsShowGroundPop, handleIsShowRecordPop, clickLockGround, judgeOwnThisGround, selectWorker, formatDateToDay, getEndTime, updateData, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, ref: vue.ref, assetsHeader, workerVue, buyGroundPopVue, get useGameInfoStore() {
        return useGameInfoStore;
      }, grondSignInPresentationVue, groundRecieveRecordVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "groundWrap" }, [
      vue.createCommentVNode(" 签到组件 "),
      vue.createVNode($setup["grondSignInPresentationVue"]),
      vue.createCommentVNode(" 地皮购买弹窗 "),
      $setup.isShowGroundPop ? (vue.openBlock(), vue.createBlock($setup["buyGroundPopVue"], {
        key: 0,
        groundType: $setup.groundType,
        groundIndex: $setup.groundIndex,
        closePop: () => {
          $setup.handleIsShowGroundPop(false);
        },
        updateData: $setup.updateData
      }, null, 8, ["groundType", "groundIndex", "closePop"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 领取记录的弹窗 "),
      $setup.isShowRecordPop ? (vue.openBlock(), vue.createBlock($setup["groundRecieveRecordVue"], {
        key: 1,
        onClose: _cache[0] || (_cache[0] = () => {
          $setup.handleIsShowRecordPop(false);
        })
      })) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 绝对定位 "),
      vue.createVNode($setup["assetsHeader"], { judge: 2 }),
      vue.createElementVNode("view", {
        class: "return",
        onClick: $setup.back
      }),
      vue.createElementVNode("view", {
        class: "record",
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.isShowRecordPop = true)
      }, [
        vue.createElementVNode("text", null, "领取记录")
      ]),
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
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(1, (item) => {
            return vue.createElementVNode("view", { class: "item small" }, [
              vue.createElementVNode("view", { class: "realGround type1" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: $setup.selectWorker(1, item),
                      delay: -item
                    }, null, 8, ["type", "delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $setup.selectWorker(1, item)]
                ]),
                vue.createElementVNode("view", { class: "typeDesc" }, [
                  vue.createElementVNode("text", null, "一级土地\\n"),
                  vue.createElementVNode(
                    "text",
                    { class: "endTime" },
                    vue.toDisplayString($setup.getEndTime(1, item)) + "到期",
                    1
                    /* TEXT */
                  )
                ]),
                vue.withDirectives(vue.createElementVNode("view", {
                  class: "lockGround",
                  onClick: () => {
                    $setup.clickLockGround(1, item);
                  }
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($setup.gameInfo.groundsMeta[1].groundName),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]), [
                  [vue.vShow, !$setup.judgeOwnThisGround(1, item)]
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
            return vue.createElementVNode("view", { class: "item big" }, [
              vue.createElementVNode("view", { class: "realGround type3" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: $setup.selectWorker(3, item),
                      delay: -item
                    }, null, 8, ["type", "delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $setup.selectWorker(3, item)]
                ]),
                vue.createElementVNode("view", { class: "typeDesc" }, [
                  vue.createElementVNode("text", null, "二级土地\\n"),
                  vue.createElementVNode(
                    "text",
                    { class: "endTime" },
                    vue.toDisplayString($setup.getEndTime(3, item)) + "到期",
                    1
                    /* TEXT */
                  )
                ]),
                vue.withDirectives(vue.createElementVNode("view", {
                  class: "lockGround",
                  onClick: () => {
                    $setup.clickLockGround(3, item);
                  }
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode(
                      "text",
                      { style: { "color": "brown" } },
                      vue.toDisplayString($setup.gameInfo.groundsMeta[3].groundName),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]), [
                  [vue.vShow, !$setup.judgeOwnThisGround(3, item)]
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
          vue.renderList(1, (item) => {
            return vue.createElementVNode("view", { class: "item resource" }, [
              vue.createElementVNode("view", { class: "realGround type4" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: $setup.selectWorker(4, item),
                      delay: -item
                    }, null, 8, ["type", "delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $setup.selectWorker(4, item)]
                ]),
                vue.createElementVNode("view", { class: "typeDesc" }, [
                  vue.createElementVNode("text", null, "三级土地\\n"),
                  vue.createElementVNode(
                    "text",
                    { class: "endTime" },
                    vue.toDisplayString($setup.getEndTime(4, item)) + "到期",
                    1
                    /* TEXT */
                  )
                ]),
                vue.withDirectives(vue.createElementVNode("view", {
                  class: "lockGround",
                  onClick: () => {
                    $setup.clickLockGround(4, item);
                  }
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($setup.gameInfo.groundsMeta[4].groundName),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]), [
                  [vue.vShow, !$setup.judgeOwnThisGround(4, item)]
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
          vue.renderList(1, (item) => {
            return vue.createElementVNode("view", { class: "item black" }, [
              vue.createElementVNode("view", { class: "realGround type5" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: $setup.selectWorker(5, item),
                      delay: -item
                    }, null, 8, ["type", "delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, !!$setup.selectWorker(5, item)]
                ]),
                vue.createElementVNode("view", { class: "typeDesc" }, [
                  vue.createElementVNode("text", null, "四级土地\\n"),
                  vue.createElementVNode(
                    "text",
                    { class: "endTime" },
                    vue.toDisplayString($setup.getEndTime(5, item)) + "到期",
                    1
                    /* TEXT */
                  )
                ]),
                vue.withDirectives(vue.createElementVNode("view", {
                  class: "lockGround",
                  onClick: () => {
                    $setup.clickLockGround(5, item);
                  }
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode(
                      "text",
                      { style: { "color": "black" } },
                      vue.toDisplayString($setup.gameInfo.groundsMeta[5].groundName),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]), [
                  [vue.vShow, !$setup.judgeOwnThisGround(5, item)]
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
          vue.renderList(1, (item) => {
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
                      type: $setup.selectWorker(6, item),
                      delay: -item
                    }, null, 8, ["type", "delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $setup.selectWorker(6, item)]
                ]),
                vue.createElementVNode("view", { class: "typeDesc" }, [
                  vue.createElementVNode("text", null, "五级土地")
                ]),
                vue.withDirectives(vue.createElementVNode("view", {
                  class: "lockGround",
                  onClick: () => {
                    $setup.clickLockGround(6, item);
                  }
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode(
                      "text",
                      { style: { "color": "chocolate" } },
                      vue.toDisplayString($setup.gameInfo.groundsMeta[6].groundName),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]), [
                  [vue.vShow, !$setup.judgeOwnThisGround(6, item)]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        )),
        vue.createCommentVNode(" 资源地皮 "),
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(19, (item) => {
            return vue.createElementVNode("view", { class: "item scarce" }, [
              vue.createElementVNode("view", { class: "realGround type2" }, [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "personWrap" },
                  [
                    vue.createVNode($setup["workerVue"], {
                      type: $setup.selectWorker(2, item),
                      delay: -item
                    }, null, 8, ["type", "delay"])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $setup.selectWorker(2, item)]
                ]),
                vue.withDirectives(vue.createElementVNode("view", {
                  class: "lockGround",
                  onClick: () => {
                    $setup.clickLockGround(2, item);
                  }
                }, [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($setup.gameInfo.groundsMeta[2].groundName),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"]), [
                  [vue.vShow, !$setup.judgeOwnThisGround(2, item)]
                ])
              ])
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 云朵 "),
      vue.createElementVNode("view", { class: "cloudsLeft clouds unlock" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(2, (item) => {
            return vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "leftItem1 leftItem" }),
              vue.createElementVNode("view", { class: "leftItem2 leftItem" })
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "cloudsLeft clouds lock" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(10, (item) => {
            return vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "leftItem1 leftItem" }),
              vue.createElementVNode("view", { class: "leftItem2 leftItem" })
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "cloudsRight clouds unlock" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(2, (item) => {
            return vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode("view", { class: "rightItem1 rightItem" }),
              vue.createElementVNode("view", { class: "rightItem2 rightItem" })
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "cloudsRight clouds lock" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(10, (item) => {
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
  const PagesGroundGround = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/HBuilderProjects/Game/pages/Ground/Ground.vue"]]);
  const _sfc_main$2 = {
    __name: "merchantSendPop",
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const gameInfo = useGameInfoStore();
      const receiverGameID = vue.ref("");
      const resourceAmount = vue.ref("");
      const currentPowerStoneBalance = vue.computed(() => {
        return gameInfo.assets.powerStone || 0;
      });
      const emit = __emit;
      function closePopup() {
        emit("close");
      }
      async function confirmTransferResource() {
        if (!receiverGameID.value || !resourceAmount.value) {
          uni.showToast({ title: "请输入完整的接收者游戏ID和资源数量", icon: "none" });
          return;
        }
        if (parseFloat(resourceAmount.value) > currentPowerStoneBalance.value) {
          uni.showToast({ title: "能量石余额不足", icon: "none" });
          return;
        }
        uni.showLoading({ title: "正在转移资源...", mask: true });
        try {
          const res = await Ys.callFunction({
            name: "sentAssets",
            // 云函数名称
            data: {
              gameID: receiverGameID.value,
              // 接收者游戏ID
              userId: uni.getStorageSync("id"),
              // 当前用户的ID
              assetsType: "powerStone",
              // 资源类型（假设为能量石）
              sendNum: parseFloat(resourceAmount.value),
              // 转移数量
              premium: 0,
              // 手续费比例（0 表示无手续费）
              type: 2
            }
          });
          uni.hideLoading();
          if (res.result.code === 1) {
            uni.showToast({ title: "资源转移成功", icon: "success" });
            await addAssetsChangeRecord(uni.getStorageSync("id"), POWERSTONE, roundToOneDecimal(resourceAmount.value), `在商人集市中向游戏ID为${receiverGameID.value}的转赠能量石, 扣除(无手续费):`);
            const result = await getUserIDByGameID(receiverGameID.value);
            if (result.code === 0) {
              formatAppLog("log", "at components/merchantSendPop.vue:94", "用户唯一 _id:", result.data._id);
              const useId = result.data._id;
              addAssetsChangeRecord(useId, POWERSTONE, roundToOneDecimal(resourceAmount.value), `在商人集市中收到游戏ID为${uni.getStorageSync("gameID")}的店主转赠能量石, 共获得(无手续费):`);
            } else {
              formatAppLog("error", "at components/merchantSendPop.vue:98", "获取用户 _id 失败:", result.message);
            }
            closePopup();
          } else {
            let errorMessage = "资源转移失败";
            switch (res.result.code) {
              case -1:
                errorMessage = "受赠者不存在";
                break;
              case -2:
                errorMessage = "赠送者和受赠者不能为同一用户";
                break;
              case -3:
                errorMessage = "资源不足";
                break;
              case -4:
                errorMessage = "无效的资源类型";
                break;
            }
            uni.showToast({ title: errorMessage, icon: "none" });
          }
        } catch (err) {
          uni.hideLoading();
          formatAppLog("error", "at components/merchantSendPop.vue:123", "调用云函数失败:", err);
          uni.showToast({ title: "网络错误，请稍后重试", icon: "none" });
        }
      }
      vue.onMounted(() => {
        updateAssets();
      });
      const __returned__ = { gameInfo, receiverGameID, resourceAmount, currentPowerStoneBalance, emit, closePopup, confirmTransferResource, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, get POWERSTONE() {
        return POWERSTONE;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      }, get updateAssets() {
        return updateAssets;
      }, get addAssetsChangeRecord() {
        return addAssetsChangeRecord;
      }, get getUserIDByGameID() {
        return getUserIDByGameID;
      }, get roundToOneDecimal() {
        return roundToOneDecimal;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "transfer-popup" }, [
      vue.createElementVNode("view", {
        class: "popup-mask",
        onClick: $setup.closePopup
      }),
      vue.createElementVNode("view", { class: "popup-content" }, [
        vue.createElementVNode("text", { class: "popup-title" }, "转移资源"),
        vue.createCommentVNode(" 当前能量石余额 "),
        vue.createElementVNode("view", { class: "balance-info" }, [
          vue.createElementVNode("image", {
            class: "energy-stone-icon",
            src: _imports_0$3,
            mode: "aspectFit"
          }),
          vue.createElementVNode(
            "text",
            { class: "balance-text" },
            "当前能量石余额: " + vue.toDisplayString($setup.currentPowerStoneBalance),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 接收者游戏ID输入框 "),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "popup-input",
            placeholder: "请输入接收者游戏ID",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.receiverGameID = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.receiverGameID]
        ]),
        vue.createCommentVNode(" 资源数量输入框 "),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "popup-input",
            placeholder: "请输入资源数量",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.resourceAmount = $event)
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.resourceAmount]
        ]),
        vue.createCommentVNode(" 确认按钮 "),
        vue.createElementVNode("button", {
          class: "popup-button",
          onClick: $setup.confirmTransferResource
        }, "确认转移")
      ])
    ]);
  }
  const merchantSendPopVue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-0fdcfdef"], ["__file", "D:/HBuilderProjects/Game/components/merchantSendPop.vue"]]);
  const _sfc_main$1 = {
    __name: "UserMerchantCenter",
    setup(__props, { expose: __expose }) {
      __expose();
      const recordList = vue.ref([]);
      const showMenu = vue.ref(false);
      const showWechatPopup = vue.ref(false);
      const showTransferPopup = vue.ref(false);
      const wechat = vue.ref("");
      const receiverGameID = vue.ref("");
      const resourceAmount = vue.ref("");
      function getStoneImg(assetsType) {
        const stoneImages = {
          resourceStone: "/static/market/resourceStone.png",
          powerStone: "/static/market/powerStone.png",
          diamond: "/static/market/diamond.png"
        };
        return stoneImages[assetsType] || "/static/stones/default.png";
      }
      function handleRefreshRecords() {
        showMenu.value = false;
        loadTransferRecords();
      }
      function formatTime(timestamp) {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      function handleBack() {
        uni.navigateBack();
      }
      function handleSetWechat() {
        showMenu.value = false;
        showWechatPopup.value = true;
      }
      function handleTransferResource() {
        showMenu.value = false;
        showTransferPopup.value = true;
      }
      async function confirmSetWechat() {
        if (!wechat.value) {
          uni.showToast({ title: "请输入微信号", icon: "none" });
          return;
        }
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        uni.showLoading({ title: "设置中..." });
        try {
          const res = await Ys.callFunction({
            name: "updateWechat",
            // 云函数名称
            data: {
              userId,
              // 传递 userId
              wechat: wechat.value
              // 传递 wechat
            }
          });
          if (res.result.code === 200) {
            uni.showToast({ title: "设置成功", icon: "success" });
            showWechatPopup.value = false;
          } else {
            uni.showToast({ title: res.result.message || "设置失败", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/UserMerchantCenter/UserMerchantCenter.vue:162", "设置失败:", err);
          uni.showToast({ title: "设置失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      function confirmTransferResource() {
        if (!receiverGameID.value || !resourceAmount.value) {
          uni.showToast({ title: "请输入完整的接收者游戏ID和资源数量", icon: "none" });
          return;
        }
        formatAppLog("log", "at pages/UserMerchantCenter/UserMerchantCenter.vue:176", "接收者游戏ID:", receiverGameID.value);
        formatAppLog("log", "at pages/UserMerchantCenter/UserMerchantCenter.vue:177", "资源数量:", resourceAmount.value);
        uni.showToast({ title: "转移成功", icon: "success" });
        getUserAssets();
        showTransferPopup.value = false;
      }
      async function loadTransferRecords() {
        const userId = uni.getStorageSync("id");
        if (!userId) {
          uni.showToast({ title: "用户未登录", icon: "none" });
          return;
        }
        uni.showLoading({ title: "加载中..." });
        try {
          const res = await Ys.callFunction({
            name: "selectSendToMerchantRecord",
            data: { userId }
          });
          if (res.result.code === 200) {
            recordList.value = res.result.data.map((item) => ({
              transferRecord: {
                assetsType: item.transferRecord.assetsType,
                sendNum: item.transferRecord.sendNum,
                sendTime: item.transferRecord.sendTime
              },
              senderInfo: {
                userName: item.senderInfo.userName,
                avatar: item.senderInfo.avatar,
                gameID: item.senderInfo.gameID
              },
              receiverInfo: {
                userName: item.receiverInfo.userName,
                avatar: item.receiverInfo.avatar,
                gameID: item.receiverInfo.gameID
              }
            }));
          } else {
            uni.showToast({ title: res.result.message || "加载失败", icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/UserMerchantCenter/UserMerchantCenter.vue:222", "加载失败", err);
          uni.showToast({ title: "加载失败", icon: "none" });
        } finally {
          uni.hideLoading();
        }
      }
      vue.onMounted(() => {
        loadTransferRecords();
        updateAssets();
      });
      const __returned__ = { recordList, showMenu, showWechatPopup, showTransferPopup, wechat, receiverGameID, resourceAmount, getStoneImg, handleRefreshRecords, formatTime, handleBack, handleSetWechat, handleTransferResource, confirmSetWechat, confirmTransferResource, loadTransferRecords, ref: vue.ref, onMounted: vue.onMounted, merchantSendPopVue, get getUserAssets() {
        return getUserAssets;
      }, get updateAssets() {
        return updateAssets;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "transferRecordPage" }, [
      vue.createCommentVNode(" 页面头部 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.handleBack
        }, [
          vue.createElementVNode("text", { class: "icon" }, "←")
        ]),
        vue.createElementVNode("text", { class: "header-title" }, "转赠记录"),
        vue.createCommentVNode(" 三个点的图标 "),
        vue.createElementVNode("view", {
          class: "menu-icon",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.showMenu = true)
        }, [
          vue.createElementVNode("text", { class: "icon" }, "···")
        ])
      ]),
      vue.createCommentVNode(" 菜单弹窗 "),
      $setup.showMenu ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "menu-popup"
      }, [
        vue.createElementVNode("view", {
          class: "menu-mask",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.showMenu = false)
        }),
        vue.createElementVNode("view", { class: "menu-content" }, [
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: $setup.handleSetWechat
          }, "设置微信号"),
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: $setup.handleTransferResource
          }, "转移资源"),
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: $setup.handleRefreshRecords
          }, "刷新记录"),
          vue.createCommentVNode(" 新增 ")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 设置微信号弹窗 "),
      $setup.showWechatPopup ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "wechat-popup"
      }, [
        vue.createElementVNode("view", {
          class: "popup-mask",
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.showWechatPopup = false)
        }),
        vue.createElementVNode("view", { class: "popup-content" }, [
          vue.createElementVNode("text", { class: "popup-title" }, "设置微信号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "popup-input",
              placeholder: "请输入微信号",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.wechat = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.wechat]
          ]),
          vue.createElementVNode("button", {
            class: "popup-button",
            onClick: $setup.confirmSetWechat
          }, "确认")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 转移资源弹窗 "),
      $setup.showTransferPopup ? (vue.openBlock(), vue.createBlock($setup["merchantSendPopVue"], {
        key: 2,
        onClose: _cache[4] || (_cache[4] = ($event) => $setup.showTransferPopup = false)
      })) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 记录列表 "),
      vue.createElementVNode("view", { class: "recordList" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.recordList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "card",
              key: index
            }, [
              vue.createCommentVNode(" 左侧：转赠者信息 "),
              vue.createElementVNode("view", { class: "userInfo left" }, [
                vue.createElementVNode("image", {
                  class: "avatar",
                  src: item.senderInfo.avatar,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(item.senderInfo.userName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "gameID" },
                    "ID: " + vue.toDisplayString(item.senderInfo.gameID),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createCommentVNode(" 中间：转赠信息 "),
              vue.createElementVNode("view", { class: "transferInfo" }, [
                vue.createElementVNode("image", {
                  class: "stoneImg",
                  src: $setup.getStoneImg(item.transferRecord.assetsType),
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "stoneNum" },
                  "×" + vue.toDisplayString(item.transferRecord.sendNum),
                  1
                  /* TEXT */
                ),
                vue.createCommentVNode(" 交易时间 "),
                vue.createElementVNode(
                  "text",
                  { class: "transferTime" },
                  vue.toDisplayString($setup.formatTime(item.transferRecord.sendTime)),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 右侧：接收者信息 "),
              vue.createElementVNode("view", { class: "userInfo right" }, [
                vue.createElementVNode("image", {
                  class: "avatar",
                  src: item.receiverInfo.avatar,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(item.receiverInfo.userName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "gameID" },
                    "ID: " + vue.toDisplayString(item.receiverInfo.gameID),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesUserMerchantCenterUserMerchantCenter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/HBuilderProjects/Game/pages/UserMerchantCenter/UserMerchantCenter.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/MerchantCenter/MerchantCenter", PagesMerchantCenterMerchantCenter);
  __definePage("pages/HomePage/HomePage", PagesHomePageHomePage);
  __definePage("pages/Mock/Mock", PagesMockMock);
  __definePage("pages/GameHome/GameHome", PagesGameHomeGameHome);
  __definePage("pages/TradingMarkets/TradingMarkets", PagesTradingMarketsTradingMarkets);
  __definePage("pages/Mine/Mine", PagesMineMine);
  __definePage("pages/Ground/Ground", PagesGroundGround);
  __definePage("pages/UserMerchantCenter/UserMerchantCenter", PagesUserMerchantCenterUserMerchantCenter);
  const _sfc_main = {
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      const gameInfo = useGameInfoStore();
      onLaunch(() => {
      });
      onShow(() => {
        if (gameInfo.bgm && gameInfo.bgmIsOpen) {
          gameInfo.bgm.play();
        }
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:19", "App Hide");
        if (gameInfo.bgm) {
          gameInfo.bgm.pause();
        }
      });
      const __returned__ = { gameInfo, get onLaunch() {
        return onLaunch;
      }, get onShow() {
        return onShow;
      }, get onHide() {
        return onHide;
      }, get useGameInfoStore() {
        return useGameInfoStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
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
