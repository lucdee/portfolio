(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./node_modules/next/dist/client/image.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/image.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = Image1;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../shared/lib/head */ "../shared/lib/head"));

var _toBase64 = __webpack_require__(/*! ../shared/lib/to-base-64 */ "../shared/lib/to-base-64");

var _imageConfig = __webpack_require__(/*! ../server/image-config */ "../server/image-config");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const loadedImageURLs = new Set();

if (true) {
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['default', defaultLoader], ['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['custom', customLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];

function isStaticRequire(src) {
  return src.default !== undefined;
}

function isStaticImageData(src) {
  return src.src !== undefined;
}

function isStaticImport(src) {
  return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}

const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":[]} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];

    for (let match; match = viewportWidthRe.exec(sizes); match) {
      percentSizes.push(parseInt(match[2]));
    }

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout, sizes);
  const last = widths.length - 1;
  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({
      src,
      quality,
      width: widths[last]
    })
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load(_objectSpread({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
} // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.


function handleLoading(img, src, layout, placeholder, onLoadingComplete) {
  if (!img) {
    return;
  }

  const handleLoad = () => {
    if (!img.src.startsWith('data:')) {
      const p = 'decode' in img ? img.decode() : Promise.resolve();
      p.catch(() => {}).then(() => {
        if (placeholder === 'blur') {
          img.style.filter = 'none';
          img.style.backgroundSize = 'none';
          img.style.backgroundImage = 'none';
        }

        loadedImageURLs.add(src);

        if (onLoadingComplete) {
          const {
            naturalWidth,
            naturalHeight
          } = img; // Pass back read-only primitive values but not the
          // underlying DOM element because it could be misused.

          onLoadingComplete({
            naturalWidth,
            naturalHeight
          });
        }

        if (true) {
          var ref;

          if ((ref = img.parentElement) === null || ref === void 0 ? void 0 : ref.parentElement) {
            const parent = getComputedStyle(img.parentElement.parentElement);

            if (layout === 'responsive' && parent.display === 'flex') {
              console.warn(`Image with src "${src}" may not render properly as a child of a flex container. Consider wrapping the image with a div to configure the width.`);
            } else if (layout === 'fill' && parent.position !== 'relative') {
              console.warn(`Image with src "${src}" may not render properly with a parent using position:"${parent.position}". Consider changing the parent style to position:"relative" with a width and height.`);
            }
          }
        }
      });
    }
  };

  if (img.complete) {
    // If the real image fails to load, this will still remove the placeholder.
    // This is the desired behavior for now, and will be revisited when error
    // handling is worked on for the image component itself.
    handleLoad();
  } else {
    img.onload = handleLoad;
  }
}

function Image1(_param) {
  var {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    lazyBoundary = '200px',
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    onLoadingComplete,
    loader = defaultImageLoader,
    placeholder = 'empty',
    blurDataURL
  } = _param,
      all = _objectWithoutProperties(_param, ["src", "sizes", "unoptimized", "priority", "loading", "lazyBoundary", "className", "quality", "width", "height", "objectFit", "objectPosition", "onLoadingComplete", "loader", "placeholder", "blurDataURL"]);

  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';

  if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  let staticSrc = '';

  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
    }

    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;

    if (!layout || layout !== 'fill') {
      height = height || staticImageData.height;
      width = width || staticImageData.width;

      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
      }
    }
  }

  src = typeof src === 'string' ? src : staticSrc;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);
  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src.startsWith('data:') || src.startsWith('blob:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  if (false) {}

  if (true) {
    if (!src) {
      throw new Error(`Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify({
        width,
        height,
        quality
      })}`);
    }

    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(`Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(String).join(',')}.`);
    }

    if (typeof widthInt !== 'undefined' && isNaN(widthInt) || typeof heightInt !== 'undefined' && isNaN(heightInt)) {
      throw new Error(`Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`);
    }

    if (layout === 'fill' && (width || height)) {
      console.warn(`Image with src "${src}" and "layout='fill'" has unused properties assigned. Please remove "width" and "height".`);
    }

    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`);
    }

    if (priority && loading === 'lazy') {
      throw new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`);
    }

    if (placeholder === 'blur') {
      if (layout !== 'fill' && (widthInt || 0) * (heightInt || 0) < 1600) {
        console.warn(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`);
      }

      if (!blurDataURL) {
        const VALID_BLUR_EXT = ['jpeg', 'png', 'webp'] // should match next-image-loader
        ;
        throw new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`);
      }
    }

    if ('ref' in rest) {
      console.warn(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoadingComplete" property instead.`);
    }

    if ('style' in rest) {
      console.warn(`Image with src "${src}" is using unsupported "style" property. Please use the "className" property instead.`);
    }

    const rand = Math.floor(Math.random() * 1000) + 100;

    if (!unoptimized && !loader({
      src,
      width: rand,
      quality: 75
    }).includes(rand.toString())) {
      console.warn(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
    }
  }

  const [setRef, isIntersected] = (0, _useIntersection).useIntersection({
    rootMargin: lazyBoundary,
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  };
  const blurStyle = placeholder === 'blur' ? {
    filter: 'blur(20px)',
    backgroundSize: objectFit || 'cover',
    backgroundImage: `url("${blurDataURL}")`,
    backgroundPosition: objectPosition || '0% 0%'
  } : {};

  if (layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else {
    // <Image src="i.png" />
    if (true) {
      throw new Error(`Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`);
    }
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  let srcString = src;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    src: `data:image/svg+xml;base64,${(0, _toBase64).toBase64(sizerSvg)}`
  }) : null) : null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    "data-nimg": layout,
    className: className,
    ref: img => {
      setRef(img);
      handleLoading(img, srcString, layout, placeholder, onLoadingComplete);
    },
    style: _objectSpread({}, imgStyle, blurStyle)
  })), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
    src,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes,
    loader
  }), {
    decoding: "async",
    "data-nimg": layout,
    style: imgStyle,
    className: className,
    loading: loading || 'lazy'
  }))), priority ? // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset

  /*#__PURE__*/
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src,
    // @ts-ignore: imagesrcset is not yet in the link element type.
    imagesrcset: imgAttributes.srcSet,
    // @ts-ignore: imagesizes is not yet in the link element type.
    imagesizes: imgAttributes.sizes
  })) : null);
}

function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?auto=format&fit=max&w=300
  const url = new URL(`${root}${normalizeSrc(src)}`);
  const params = url.searchParams;
  params.set('auto', params.get('auto') || 'format');
  params.set('fit', params.get('fit') || 'max');
  params.set('w', params.get('w') || width.toString());

  if (quality) {
    params.set('q', quality.toString());
  }

  return url.href;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function customLoader({
  src
}) {
  throw new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`);
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (true) {
    const missingValues = []; // these should always be provided but make sure they are

    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');

    if (missingValues.length > 0) {
      throw new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
        src,
        width,
        quality
      })}`);
    }

    if (src.startsWith('//')) {
      throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc;

      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
      }

      if ( true && !configDomains.includes(parsedSrc.hostname)) {
        throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`);
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ../shared/lib/router/router */ "./node_modules/next/dist/shared/lib/router/router.js");

var _router1 = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router).isLocalURL(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (true) {
      // rethrow to show invalid URL errors
      throw err;
    }
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router).isLocalURL(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null && as.indexOf('#') >= 0) {
    scroll = false;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  });
}

function Link(props) {
  if (true) {
    function createPropError(args) {
      return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + ( false ? 0 : ''));
    } // TypeScript trick for type-guarding:


    const requiredPropsGuard = {
      href: true
    };
    const requiredProps = Object.keys(requiredPropsGuard);
    requiredProps.forEach(key => {
      if (key === 'href') {
        if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: props[key] === null ? 'null' : typeof props[key]
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // TypeScript trick for type-guarding:

    const optionalPropsGuard = {
      as: true,
      replace: true,
      scroll: true,
      shallow: true,
      passHref: true,
      prefetch: true,
      locale: true
    };
    const optionalProps = Object.keys(optionalPropsGuard);
    optionalProps.forEach(key => {
      const valType = typeof props[key];

      if (key === 'as') {
        if (props[key] && valType !== 'string' && valType !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: valType
          });
        }
      } else if (key === 'locale') {
        if (props[key] && valType !== 'string') {
          throw createPropError({
            key,
            expected: '`string`',
            actual: valType
          });
        }
      } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch') {
        if (props[key] != null && valType !== 'boolean') {
          throw createPropError({
            key,
            expected: '`boolean`',
            actual: valType
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const hasWarned = _react.default.useRef(false);

    if (props.prefetch && !hasWarned.current) {
      hasWarned.current = true;
      console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated');
    }
  }

  const p = props.prefetch !== false;
  const router = (0, _router1).useRouter();

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router).resolveHref(router, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router).resolveHref(router, props.as) : resolvedAs || resolvedHref
    };
  }, [router, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  let child;

  if (true) {
    try {
      child = _react.default.Children.only(children);
    } catch (err) {
      throw new Error(`Multiple children were passed to <Link> with \`href\` of \`${props.href}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + ( false ? 0 : ''));
    }
  } else {}

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection).useIntersection({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  _react.default.useEffect(() => {
    const shouldPrefetch = isVisible && p && (0, _router).isLocalURL(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);

  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router).isLocalURL(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router).getDomainLocale(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router).addBasePath((0, _router).addLocale(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/normalize-trailing-slash.js":
/*!*******************************************************************!*\
  !*** ./node_modules/next/dist/client/normalize-trailing-slash.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

const normalizePathTrailingSlash =  false ? 0 : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.requestIdleCallback = exports.cancelIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/route-loader.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/route-loader.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.createRouteLoader = createRouteLoader;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(/*! ../shared/lib/router/utils/get-asset-path-from-route */ "../shared/lib/router/utils/get-asset-path-from-route"));

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (e) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR');

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // We wait for pages to be built in dev before we start the route transition
// timeout to prevent an un-necessary hard navigation in development.


let devBuildPromise; // Resolve a promise that times out after given amount of milliseconds.

function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject); // We wrap these checks separately for better dead-code elimination in
    // production bundles.

    if (true) {
      (devBuildPromise || Promise.resolve()).then(() => {
        (0, _requestIdleCallback).requestIdleCallback(() => setTimeout(() => {
          if (!cancelled) {
            reject(err);
          }
        }, ms));
      });
    }

    if (false) {}
  });
}

function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (true) {
    return Promise.resolve({
      scripts: [assetPrefix + '/_next/static/chunks/pages' + encodeURI((0, _getAssetPathFromRoute).default(route, '.js'))],
      // Styles are handled by `style-loader` in development:
      css: []
    });
  }

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route, prefetch) {
      return withFuture(route, routes, () => {
        const routeFilesPromise = getFilesForRoute(assetPrefix, route).then(({
          scripts,
          css
        }) => {
          return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
        }).then(res => {
          return this.whenEntrypoint(route).then(entrypoint => ({
            entrypoint,
            styles: res[1]
          }));
        });

        if (true) {
          devBuildPromise = new Promise(resolve => {
            if (routeFilesPromise) {
              return routeFilesPromise.finally(() => {
                resolve();
              });
            }
          });
        }

        return resolvePromiseWithTimeout(routeFilesPromise, MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({
          entrypoint,
          styles
        }) => {
          const res = Object.assign({
            styles: styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        }).catch(err => {
          if (prefetch) {
            // we don't want to cache errors during prefetch
            throw err;
          }

          return {
            error: err
          };
        });
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback).requestIdleCallback(() => this.loadRoute(route, true).catch(() => {}));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "Router", ({
  enumerable: true,
  get: function () {
    return _router.default;
  }
}));
Object.defineProperty(exports, "withRouter", ({
  enumerable: true,
  get: function () {
    return _withRouter.default;
  }
}));
exports.useRouter = useRouter;
exports.createRouter = createRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = _interopRequireDefault(__webpack_require__(/*! ../shared/lib/router/router */ "./node_modules/next/dist/shared/lib/router/router.js"));

var _routerContext = __webpack_require__(/*! ../shared/lib/router-context */ "../shared/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const singletonRouter = {
  router: null,
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain', 'domainLocales'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" on the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
}

var _default = singletonRouter;
exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
}

function createRouter(...args) {
  singletonRouter.router = new _router.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}

function makePublicRouterInstance(router) {
  const _router1 = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router1[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router1[property]) ? [] : {}, _router1[property]) // makes sure query is not stateful
      ;
      continue;
    }

    instance[property] = _router1[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router1[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react).useRef();
  const [visible, setVisible] = (0, _react).useState(false);
  const setRef = (0, _react).useCallback(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react).useEffect(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback).requestIdleCallback(() => setVisible(true));
        return () => (0, _requestIdleCallback).cancelIdleCallback(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router).useRouter()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = `withRouter(${name})`;
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/shared/lib/router/router.js":
/*!************************************************************!*\
  !*** ./node_modules/next/dist/shared/lib/router/router.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__(/*! ../../../client/normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _routeLoader = __webpack_require__(/*! ../../../client/route-loader */ "./node_modules/next/dist/client/route-loader.js");

var _denormalizePagePath = __webpack_require__(/*! ../../../server/denormalize-page-path */ "../../../server/denormalize-page-path");

var _normalizeLocalePath = __webpack_require__(/*! ../i18n/normalize-locale-path */ "../i18n/normalize-locale-path");

var _mitt = _interopRequireDefault(__webpack_require__(/*! ../mitt */ "../mitt"));

var _utils = __webpack_require__(/*! ../utils */ "../shared/lib/utils");

var _isDynamic = __webpack_require__(/*! ./utils/is-dynamic */ "./utils/is-dynamic");

var _parseRelativeUrl = __webpack_require__(/*! ./utils/parse-relative-url */ "./utils/parse-relative-url");

var _querystring = __webpack_require__(/*! ./utils/querystring */ "./utils/querystring");

var _resolveRewrites = _interopRequireDefault(__webpack_require__(/*! ./utils/resolve-rewrites */ "?5c99"));

var _routeMatcher = __webpack_require__(/*! ./utils/route-matcher */ "./utils/route-matcher");

var _routeRegex = __webpack_require__(/*! ./utils/route-regex */ "./utils/route-regex");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash).normalizePathTrailingSlash(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {} else {
    return false;
  }
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}

function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils).getLocationOrigin();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex).getRouteRegex(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher).getRouteMatcher(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = '' // did not satisfy all requirements
    ; // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}

function resolveHref(router, href, resolveAs) {
  // we use a dummy base url for relative urls
  let base;
  let urlAsString = typeof href === 'string' ? href : (0, _utils).formatWithValidation(href); // repeated slashes and backslashes in the URL are considered
  // invalid and will never match a Next.js page/file

  const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
  const urlAsStringNoProto = urlProtoMatch ? urlAsString.substr(urlProtoMatch[0].length) : urlAsString;
  const urlParts = urlAsStringNoProto.split('?');

  if ((urlParts[0] || '').match(/(\/\/|\\)/)) {
    console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
    const normalizedUrl = (0, _utils).normalizeRepeatedSlashes(urlAsStringNoProto);
    urlAsString = (urlProtoMatch ? urlProtoMatch[0] : '') + normalizedUrl;
  } // Return because it cannot be routed by the Next.js router


  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    base = new URL(urlAsString.startsWith('#') ? router.asPath : router.pathname, 'http://n');
  } catch (_) {
    // fallback to / for invalid asPath values e.g. //
    base = new URL('/', 'http://n');
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils).formatWithValidation({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils).getLocationOrigin();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router, url, true);
  const origin = (0, _utils).getLocationOrigin();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _denormalizePagePath).denormalizePagePath(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic).isDynamicRoute(page) && (0, _routeRegex).getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }

  return (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname);
}

const manualScrollRestoration =  false && 0;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader).markAssetError(err);
    }

    throw err;
  });
}

class Router {
  constructor(pathname1, query1, as1, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component: Component1,
    err: err1,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    // Static Data Cache
    this.sdc = {}; // In-flight Server Data Requests, for deduping

    this.sdr = {};
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname: pathname1,
          query: query1
        } = this;
        this.changeState('replaceState', (0, _utils).formatWithValidation({
          pathname: addBasePath(pathname1),
          query: query1
        }), (0, _utils).getURL());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as: as1,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname: pathname1
      } = (0, _parseRelativeUrl).parseRelativeUrl(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as1 === this.asPath && pathname1 === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as1, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname1 !== '/_error') {
      this.components[this.route] = {
        Component: Component1,
        initial: true,
        props: initialProps,
        err: err1,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: []
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname1;
    this.query = query1; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic).isDynamicRoute(pathname1) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? pathname1 : as1;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !false);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    const shouldResolveHref = url === as || options._h || options._shouldResolveHref; // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated

    if (options._h) {
      this.isReady = true;
    }

    const prevLocale = this.locale;

    if (false) { var ref; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as;
    let localeChange = prevLocale !== this.locale; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs) && !localeChange) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
    let {
      pathname: pathname1,
      query: query1
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader).getClientBuildManifest());
    } catch (err1) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    } // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url


    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    } // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly


    let resolvedAs = as; // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1

    pathname1 = pathname1 ? (0, _normalizeTrailingSlash).removePathTrailingSlash(delBasePath(pathname1)) : pathname1;

    if (shouldResolveHref && pathname1 !== '/_error') {
      options._shouldResolveHref = true;

      if (false) {} else {
        parsed.pathname = resolveDynamicRoute(pathname1, pages);

        if (parsed.pathname !== pathname1) {
          pathname1 = parsed.pathname;
          parsed.pathname = addBasePath(pathname1);
          url = (0, _utils).formatWithValidation(parsed);
        }
      }
    }

    const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1);

    if (!isLocalURL(as)) {
      if (true) {
        throw new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as` + `\nSee more info: https://nextjs.org/docs/messages/invalid-relative-url-external-as`);
      }

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic).isDynamicRoute(route)) {
      const parsedAs = (0, _parseRelativeUrl).parseRelativeUrl(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex).getRouteRegex(route);
      const routeMatch = (0, _routeMatcher).getRouteMatcher(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query1) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query1[param]);

        if (missingParams.length > 0) {
          if (true) {
            console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
          }

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils).formatWithValidation(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query1, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query1, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var ref, ref1;
      let routeInfo = await this.getRouteInfo(route, pathname1, query1, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
            const {
              url: newUrl,
              as: newAs
            } = prepareUrlAs(this, destination, destination);
            return this.change(method, newUrl, newAs, options);
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query1, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (true) {
        const appComp = this.components['/_app'].Component;
        window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
      }

      if (options._h && pathname1 === '/_error' && ((ref = self.__NEXT_DATA__.props) === null || ref === void 0 ? void 0 : (ref1 = ref.pageProps) === null || ref1 === void 0 ? void 0 : ref1.statusCode) === 500 && (props === null || props === void 0 ? void 0 : props.pageProps)) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      } // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      var _scroll;

      const shouldScroll = (_scroll = options.scroll) !== null && _scroll !== void 0 ? _scroll : !isValidShallowRoute;
      const resetScroll = shouldScroll ? {
        x: 0,
        y: 0
      } : null;
      await this.set(route, pathname1, query1, cleanedAs, routeInfo, forcedScroll !== null && forcedScroll !== void 0 ? forcedScroll : resetScroll).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err1) {
      if (err1.cancelled) {
        return false;
      }

      throw err1;
    }
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || (0, _utils).getURL() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader).isAssetError(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component1;
      let styleSheets;
      let props;

      if (typeof Component1 === 'undefined' || typeof styleSheets === 'undefined') {
        ({
          page: Component1,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component: Component1,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component1, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component: Component1,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component1)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils).formatWithValidation({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component1, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as,
        locale: this.locale,
        locales: this.locales,
        defaultLocale: this.defaultLocale
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err2) {
      return this.handleRouteInfoError(err2, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
    let {
      pathname: pathname2
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;

    if (false) {} else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);

      if (parsed.pathname !== pathname2) {
        pathname2 = parsed.pathname;
        parsed.pathname = pathname2;
        url = (0, _utils).formatWithValidation(parsed);
      }
    }

    const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname2); // Prefetch is not supported in development mode because it would trigger on-demand-entries

    if (true) {
      return;
    }

    await Promise.all([this.pageLoader._isSsg(route).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err2 = new Error('Loading initial props cancelled');
        err2.cancelled = true;
        throw err2;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if (false) {}

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err2 => {
      delete this.sdr[resourceKey];
      throw err2;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App1
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App1);

    ctx.AppTree = AppTree;
    return (0, _utils).loadGetInitialProps(App1, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

Router.events = (0, _mitt).default();
exports.default = Router;

/***/ }),

/***/ "./src/components/Breadcrumb/BreadcrumbItem.tsx":
/*!******************************************************!*\
  !*** ./src/components/Breadcrumb/BreadcrumbItem.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BreadcrumbItem": () => (/* binding */ BreadcrumbItem)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/Breadcrumb/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\Breadcrumb\\BreadcrumbItem.tsx";



const BreadcrumbItem = ({
  label,
  href
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("li", {
    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["breadcrumb-item-container"]),
    children: href ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
      href: href,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("a", {
        children: label
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
      children: label
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/Breadcrumb/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/Breadcrumb/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Breadcrumb": () => (/* binding */ Breadcrumb)
/* harmony export */ });
/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BreadcrumbItem */ "./src/components/Breadcrumb/BreadcrumbItem.tsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/Breadcrumb/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\Breadcrumb\\index.tsx";



const Breadcrumb = ({
  items
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("ul", {
    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["breadcrumb-container"]),
    children: items.map(({
      label,
      href
    }) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_BreadcrumbItem__WEBPACK_IMPORTED_MODULE_0__.BreadcrumbItem, {
      label: label,
      href: href
    }, label, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }, undefined))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/ContactForm/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/ContactForm/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fi */ "./node_modules/react-icons/fi/index.esm.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/ContactForm/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\ContactForm\\index.tsx";






const ContactForm = (_, ref) => {
  const {
    0: isVisible,
    1: setIsVisible
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const openContactForm = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsVisible(true);
  }, []);
  const closeContactForm = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsVisible(false);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, () => {
    return {
      openContactForm
    };
  }, [openContactForm]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
    className: `${(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().contactFormContainer)} ${isVisible ? (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().isVisible) : ''}`,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("button", {
      "aria-label": "Clique para fechar o formul\xE1rio",
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().closeButton),
      title: "Fechar formul\xE1rio de contato",
      type: "button",
      onClick: closeContactForm,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_icons_fi__WEBPACK_IMPORTED_MODULE_4__.FiX, {
        size: 24
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h3", {
      className: "heading3 white ",
      children: "Entre em contato"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["contact-section"]),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "https://www.linkedin.com/in/lucasthomazella/",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("a", {
          target: "_blank",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("img", {
            src: "https://i.imgur.com/OrrIarK.png",
            width: 80,
            height: 80
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "https://www.facebook.com/lucas.thomazella/",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("a", {
          target: "_blank",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("img", {
            src: "https://i.imgur.com/EKDv07w.png",
            width: 80,
            height: 80
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["contact-section"]),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "https://wa.me/5511965988585",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("a", {
          target: "_blank",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("img", {
            src: "https://i.imgur.com/axUDnew.png",
            width: 80,
            height: 80
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 85,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "https://www.instagram.com/lucasthomz/",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("a", {
          target: "_blank",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("img", {
            src: "https://i.imgur.com/iqcabYt.png",
            width: 80,
            height: 80
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("article", {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("img", {
        src: "/views/home/imgs/nave-espacial.png"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 52,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(ContactForm));

/***/ }),

/***/ "./src/components/Form/Button/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/Form/Button/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/Form/Button/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
const _excluded = ["children", "background", "isOutlined", "className"];
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\Form\\Button\\index.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



const Button = _ref => {
  let {
    children,
    background,
    isOutlined,
    className
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", _objectSpread(_objectSpread({
    className: [(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default().buttonContainer), `${background ? (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default())[`btn-${background}`] : (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default())[`btn-primary`]}`, `${isOutlined ? (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default())[`btn-outlined-${background}`] : ''}`, `${className ? className : ''}`].join(' ')
  }, rest), {}, {
    children: children
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 3
  }, undefined);
};

/***/ }),

/***/ "./src/components/SEO.tsx":
/*!********************************!*\
  !*** ./src/components/SEO.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SEO": () => (/* binding */ SEO)
/* harmony export */ });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\SEO.tsx";



const SEO = ({
  tabName
}) => {
  const {
    asPath
  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("title", {
      children: [tabName, " \u2022 Dev"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("meta", {
      property: "og:url",
      content: `${asPath}`
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/Utilities/ClickableList/ListOptions/index.tsx":
/*!**********************************************************************!*\
  !*** ./src/components/Utilities/ClickableList/ListOptions/index.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListOptions": () => (/* binding */ ListOptions)
/* harmony export */ });
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/Utilities/ClickableList/ListOptions/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\Utilities\\ClickableList\\ListOptions\\index.tsx";


const ListOptions = ({
  activeItem,
  labels,
  onItemClick
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default().listOptionsContainer),
    children: labels.map(label => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
      className: `${(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default().listOption)} ${activeItem === label ? (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default().isActive) : ''}`,
      onClick: () => onItemClick(label),
      title: `Visualizar ${label}`,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        className: "text",
        children: label
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 11
      }, undefined)
    }, label, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }, undefined))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/Utilities/ClickableList/index.tsx":
/*!**********************************************************!*\
  !*** ./src/components/Utilities/ClickableList/index.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClickableList": () => (/* binding */ ClickableList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ListOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListOptions */ "./src/components/Utilities/ClickableList/ListOptions/index.tsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/Utilities/ClickableList/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\components\\Utilities\\ClickableList\\index.tsx";




const ClickableList = ({
  children,
  labels
}) => {
  const {
    0: activeItem,
    1: setActiveItem
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(labels[0]);
  const {
    0: applyAnimation,
    1: setApplyAnimation
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setApplyAnimation(true);
    const interval = setInterval(() => {
      setApplyAnimation(false);
    }, 500);
    return () => clearInterval(interval);
  }, [activeItem]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().clickableListContainer),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_ListOptions__WEBPACK_IMPORTED_MODULE_1__.ListOptions, {
      labels: labels,
      activeItem: activeItem,
      onItemClick: label => setActiveItem(label)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: `${(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().listContent)} ${!!applyAnimation ? (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().animate) : ''}`,
      children: /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children[labels.findIndex(value => value === activeItem)])
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/layouts/DefaultLayout/components/Footer/index.tsx":
/*!***************************************************************!*\
  !*** ./src/layouts/DefaultLayout/components/Footer/index.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Footer": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/layouts/DefaultLayout/components/Footer/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\layouts\\DefaultLayout\\components\\Footer\\index.tsx";



const Footer = () => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
    id: "footer-section",
    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["footer-section"]),
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "centralized-container",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["footer-section-content"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["footer-layout-container"]),
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
            className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["contact-address"]),
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
              "data-aos": "fade-right",
              children: "Lt"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 18,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 17,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 16,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 5
  }, undefined)
}, void 0, false);

/***/ }),

/***/ "./src/layouts/DefaultLayout/components/Menu/index.tsx":
/*!*************************************************************!*\
  !*** ./src/layouts/DefaultLayout/components/Menu/index.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Form_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Form/Button */ "./src/components/Form/Button/index.tsx");
/* harmony import */ var components_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/Breadcrumb */ "./src/components/Breadcrumb/index.tsx");
/* harmony import */ var components_ContactForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/ContactForm */ "./src/components/ContactForm/index.tsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.module.scss */ "./src/layouts/DefaultLayout/components/Menu/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\layouts\\DefaultLayout\\components\\Menu\\index.tsx";








const Menu = ({
  breadcrumb
}) => {
  const contactFormRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    0: isMenuOpen,
    1: setIsMenuOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: activeMenu,
    1: setActiveMenu
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);

  const handleMenuActive = option => {
    setActiveMenu(state => option === state ? null : option);
  };

  next_router__WEBPACK_IMPORTED_MODULE_0___default().events.on('routeChangeComplete', () => setTimeout(() => {
    setActiveMenu(null);
  }, 200));
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(components_ContactForm__WEBPACK_IMPORTED_MODULE_4__.default, {
      ref: contactFormRef
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("header", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default()["menu-container"]),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "centralized-container",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
          className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default()["menu-content"]),
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
            className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default().logo),
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("h2", {
              children: "Lt"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 39,
              columnNumber: 15
            }, undefined), breadcrumb && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(components_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, {
              items: breadcrumb.items
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 40,
              columnNumber: 30
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("nav", {
            className: `${(_styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default()["navbar-container"])} ${isMenuOpen ? (_styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default()["is-menu-open"]) : ''}`,
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("ul", {
              className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default()["nav-list-container"])
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 48,
              columnNumber: 15
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(components_Form_Button__WEBPACK_IMPORTED_MODULE_2__.Button, {
              type: "button",
              title: "Entre em contato",
              background: "primary",
              onClick: () => {
                var _contactFormRef$curre;

                return (_contactFormRef$curre = contactFormRef.current) === null || _contactFormRef$curre === void 0 ? void 0 : _contactFormRef$curre.openContactForm();
              },
              children: "Contato"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 50,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

/***/ }),

/***/ "./src/layouts/DefaultLayout/index.tsx":
/*!*********************************************!*\
  !*** ./src/layouts/DefaultLayout/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultLayout": () => (/* binding */ DefaultLayout)
/* harmony export */ });
/* harmony import */ var _components_Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Menu */ "./src/layouts/DefaultLayout/components/Menu/index.tsx");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Footer */ "./src/layouts/DefaultLayout/components/Footer/index.tsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/layouts/DefaultLayout/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\layouts\\DefaultLayout\\index.tsx";




const DefaultLayout = ({
  children,
  breadcrumb
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
  className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default().defaultLayoutContainer),
  children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_components_Menu__WEBPACK_IMPORTED_MODULE_0__.Menu, {
    breadcrumb: breadcrumb
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, undefined), children, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_components_Footer__WEBPACK_IMPORTED_MODULE_1__.Footer, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 5
  }, undefined)]
}, void 0, true, {
  fileName: _jsxFileName,
  lineNumber: 16,
  columnNumber: 3
}, undefined);

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var components_SEO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/SEO */ "./src/components/SEO.tsx");
/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/home */ "./src/views/home/index.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\pages\\index.tsx";





const Home = () => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(components_SEO__WEBPACK_IMPORTED_MODULE_0__.SEO, {
      tabName: "Lucas Thomazella"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_views_home__WEBPACK_IMPORTED_MODULE_1__.HomeView, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

const getStaticProps = async () => {
  return {
    props: {}
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ }),

/***/ "./src/views/home/components/Blog/RecourseCard.tsx":
/*!*********************************************************!*\
  !*** ./src/views/home/components/Blog/RecourseCard.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecourseCard": () => (/* binding */ RecourseCard)
/* harmony export */ });
/* harmony import */ var _RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecourseCard.module.scss */ "./src/views/home/components/Blog/RecourseCard.module.scss");
/* harmony import */ var _RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\Blog\\RecourseCard.tsx";


const RecourseCard = ({
  item
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("a", {
    href: `${item.link}`,
    className: (_RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1___default().link),
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["recourse-card-container"]),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["recourse-card-title"]),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: item.category
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          children: item.createdAt
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("figure", {
        className: (_RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["recourse-card-image-container"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
          src: `${item.img}`,
          alt: `${item.category} - Imagem ilustrativa`,
          title: `${item.category} - Imagem ilustrativa`
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("article", {
        className: (_RecourseCard_module_scss__WEBPACK_IMPORTED_MODULE_1___default()["recourse-card-content"]),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
          children: item.title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
          className: "body6",
          children: item.resume
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/views/home/components/Blog/RecourseCardList.tsx":
/*!*************************************************************!*\
  !*** ./src/views/home/components/Blog/RecourseCardList.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecourseList": () => (/* binding */ RecourseList)
/* harmony export */ });
/* harmony import */ var _RecourseCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecourseCard */ "./src/views/home/components/Blog/RecourseCard.tsx");
/* harmony import */ var _RecourseCardList_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RecourseCardList.module.scss */ "./src/views/home/components/Blog/RecourseCardList.module.scss");
/* harmony import */ var _RecourseCardList_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_RecourseCardList_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\Blog\\RecourseCardList.tsx";



const RecourseList = ({
  items
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("section", {
  id: "recursos-section",
  className: (_RecourseCardList_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["recursos-section"]),
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: "centralized-container",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: (_RecourseCardList_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["recursos-list-container"]),
      children: items.map((item, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_RecourseCard__WEBPACK_IMPORTED_MODULE_0__.RecourseCard, {
        item: item
      }, index, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 17,
  columnNumber: 3
}, undefined);

/***/ }),

/***/ "./src/views/home/components/Blog/index.tsx":
/*!**************************************************!*\
  !*** ./src/views/home/components/Blog/index.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Blog": () => (/* binding */ Blog)
/* harmony export */ });
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/views/home/components/Blog/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RecourseCardList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecourseCardList */ "./src/views/home/components/Blog/RecourseCardList.tsx");
/* harmony import */ var _recourseItems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recourseItems */ "./src/views/home/components/Blog/recourseItems.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\Blog\\index.tsx";




const Blog = () => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("section", {
  className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["blog-section"]),
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
    className: "centralized-container",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["blog-section-content"]),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("article", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["blog-section-description"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("h2", {
          className: "heading2",
          children: "Explore meus trabalhos"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 17,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_RecourseCardList__WEBPACK_IMPORTED_MODULE_0__.RecourseList, {
        items: _recourseItems__WEBPACK_IMPORTED_MODULE_1__.recourseItems
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 14,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 13,
  columnNumber: 3
}, undefined);

/***/ }),

/***/ "./src/views/home/components/Blog/recourseItems.ts":
/*!*********************************************************!*\
  !*** ./src/views/home/components/Blog/recourseItems.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recourseItems": () => (/* binding */ recourseItems)
/* harmony export */ });
const recourseItems = [{
  category: 'Brinov Blog',
  createdAt: 'janeiro de 2022',
  title: 'Aplicacao NextJs com typescript, interacao com apis GraphQl',
  resume: 'Foi aplicado Single Page Application e estilizacao em Sass',
  img: '/views/home/imgs/blog.png',
  link: 'https://brinov.com/blog'
}, {
  category: 'Brinov Webpage',
  createdAt: 'outubro de 2021',
  title: 'Aplicacao NextJs com typescript, página inicial da Brinov',
  resume: 'Foi aplicado Single Page Application e estilizacao em Sass',
  img: '/views/home/imgs/brinov.png',
  link: 'https://brinov.com/'
}, {
  category: 'Warzone',
  createdAt: 'janeiro de 2020',
  title: 'Aplicacao com html,css e jquery',
  resume: 'Um dos meus primeiros projetos, incompleto',
  img: '/views/home/imgs/warzone.png',
  link: 'https://lucdee.github.io/Warzone/'
}, {
  category: 'Sobre Esporte',
  createdAt: 'fevereiro de 2020',
  title: 'Aplicacao com html,css e jquery',
  resume: 'Um site de noticias de esportes, incompleto',
  img: '/views/home/imgs/sobreesporte.png',
  link: 'https://lucdee.github.io/Sobreesporte/'
}];

/***/ }),

/***/ "./src/views/home/components/ExpertiseBrinov/index.tsx":
/*!*************************************************************!*\
  !*** ./src/views/home/components/ExpertiseBrinov/index.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpertiseBrinov": () => (/* binding */ ExpertiseBrinov)
/* harmony export */ });
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/views/home/components/ExpertiseBrinov/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\ExpertiseBrinov\\index.tsx";




const ExpertiseBrinov = () => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("section", {
  id: "expertise-brinov-section",
  className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["expertise-section"]),
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
    className: "centralized-container",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["expertise-section-content"]),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["companies-logos"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_0___default()), {
          src: "/views/home/imgs/astronauta3.png",
          width: 500,
          height: 500,
          alt: "decathlon"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 13,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("article", {
        "data-aos": "fade-up",
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default()["expertise-section-description"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
          href: "https://github.com/lucdee",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("a", {
            target: "_blank",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_0___default()), {
              src: "/views/home/imgs/github.png",
              width: 500,
              height: 500,
              alt: "decathlon"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 27,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 26,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 6,
  columnNumber: 3
}, undefined);

/***/ }),

/***/ "./src/views/home/components/Hero/index.tsx":
/*!**************************************************!*\
  !*** ./src/views/home/components/Hero/index.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hero": () => (/* binding */ Hero)
/* harmony export */ });
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/views/home/components/Hero/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\Hero\\index.tsx";



const Hero = () => {
  const scrollToFooter = () => {
    if (false) {}
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("section", {
    id: "hero-section",
    className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["hero-section"]),
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "centralized-container",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["hero-section-content"]),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("article", {
          "data-aos": "fade-right",
          className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["hero-section-description"]),
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h1", {
            className: "heading1",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
              children: "Lucas Thomazella"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 20,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 19,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
            className: "body1",
            children: "Uma viagem para os meus trabalhos"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 22,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
            className: "body2",
            children: "Aplica\xE7\xE3o em Nextjs para portf\xF3lio"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("a", {
            target: "_blank",
            rel: "noreferrer",
            title: "Clique para ler nosso novo Ebook",
            onClick: scrollToFooter,
            children: "Viajar"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 25,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 15,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("figure", {
          className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["image-container"]),
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_0___default()), {
            src: "/views/home/imgs/astronauta2.png",
            width: 1000,
            height: 800,
            layout: "intrinsic",
            alt: "Ilustra\xE7\xE3o mulher com \xF3culos de realidade aumentada",
            title: "Ilustra\xE7\xE3o mulher com \xF3culos de realidade aumentada"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/views/home/components/SuccessCases/SuccessCasesDepoiments.tsx":
/*!***************************************************************************!*\
  !*** ./src/views/home/components/SuccessCases/SuccessCasesDepoiments.tsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuccessCasesDepoiments": () => (/* binding */ SuccessCasesDepoiments)
/* harmony export */ });
/* harmony import */ var components_Utilities_ClickableList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/Utilities/ClickableList */ "./src/components/Utilities/ClickableList/index.tsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/views/home/components/SuccessCases/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\SuccessCases\\SuccessCasesDepoiments.tsx";



const SuccessCasesDepoiments = () => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(components_Utilities_ClickableList__WEBPACK_IMPORTED_MODULE_0__.ClickableList, {
    labels: ['Objetivos', 'Focos', 'Conhecimentos'],
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      "data-aos": "fade-up",
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["depoiment-card"]),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["depoiment-card-content"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
          className: "body6",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("b", {
            children: "Oportunidade em desenvolvimento Front end, onde eu possa colocar minhas habilidades em pr\xE1tica e colaborar com equipes de trabalho, crescimento da empresa e meu pr\xF3prio crescimento pessoal e profissional."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 13,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 12,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["depoiment-card"]),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["depoiment-card-content"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
          className: "caption",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("b", {
            children: "Estou atualmente focado em me desenvolver em Front end, utilizando NextJs(Reactjs), por\xE9m tamb\xE9m quero ganhar conhecimento em outros Frameworks que utilizam javacript."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 26,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["depoiment-card"]),
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["depoiment-card-content"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
          className: "caption",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("b", {
            children: "Possuo conhecimento em Front end com ReactJs/NextJs, Angular, VueJs, implementa\xE7ao e cria\xE7ao de Apis Rest e GraphQl, versionamento de c\xF3digo com Git e GitHub, al\xE9m de conhecimentos no Back end em mysql e java com spring boot."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 13
          }, undefined), ' ']
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/views/home/components/SuccessCases/index.tsx":
/*!**********************************************************!*\
  !*** ./src/views/home/components/SuccessCases/index.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuccessCases": () => (/* binding */ SuccessCases)
/* harmony export */ });
/* harmony import */ var _SuccessCasesDepoiments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuccessCasesDepoiments */ "./src/views/home/components/SuccessCases/SuccessCasesDepoiments.tsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/views/home/components/SuccessCases/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\components\\SuccessCases\\index.tsx";



const SuccessCases = () => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("section", {
  id: "cases-de-sucesso-section",
  className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["success-cases-section"]),
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: "centralized-container",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["success-cases-section-content"]),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["gray-circle"])
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("article", {
        className: (_styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default()["success-cases-section-description"]),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h2", {
          className: "heading2",
          children: "Sobre mim"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 15,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_SuccessCasesDepoiments__WEBPACK_IMPORTED_MODULE_0__.SuccessCasesDepoiments, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 6,
  columnNumber: 3
}, undefined);

/***/ }),

/***/ "./src/views/home/index.tsx":
/*!**********************************!*\
  !*** ./src/views/home/index.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeView": () => (/* binding */ HomeView)
/* harmony export */ });
/* harmony import */ var _layouts_DefaultLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../layouts/DefaultLayout */ "./src/layouts/DefaultLayout/index.tsx");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aos */ "aos");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Hero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Hero */ "./src/views/home/components/Hero/index.tsx");
/* harmony import */ var _components_Blog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Blog */ "./src/views/home/components/Blog/index.tsx");
/* harmony import */ var _components_ExpertiseBrinov__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ExpertiseBrinov */ "./src/views/home/components/ExpertiseBrinov/index.tsx");
/* harmony import */ var _components_SuccessCases__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/SuccessCases */ "./src/views/home/components/SuccessCases/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! aos/dist/aos.css */ "./node_modules/aos/dist/aos.css");
/* harmony import */ var aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "C:\\Users\\bocsg\\Desktop\\port\\src\\views\\home\\index.tsx";









const HomeView = () => {
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    aos__WEBPACK_IMPORTED_MODULE_1___default().init({
      duration: 1500
    });
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_layouts_DefaultLayout__WEBPACK_IMPORTED_MODULE_0__.DefaultLayout, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_components_Hero__WEBPACK_IMPORTED_MODULE_2__.Hero, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_components_SuccessCases__WEBPACK_IMPORTED_MODULE_5__.SuccessCases, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_components_ExpertiseBrinov__WEBPACK_IMPORTED_MODULE_4__.ExpertiseBrinov, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_components_Blog__WEBPACK_IMPORTED_MODULE_3__.Blog, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/Breadcrumb/styles.module.scss":
/*!******************************************************!*\
  !*** ./src/components/Breadcrumb/styles.module.scss ***!
  \******************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"breadcrumb-container": "styles_breadcrumb-container__1AbxF",
	"breadcrumb-item-container": "styles_breadcrumb-item-container__9VHor"
};


/***/ }),

/***/ "./src/components/ContactForm/styles.module.scss":
/*!*******************************************************!*\
  !*** ./src/components/ContactForm/styles.module.scss ***!
  \*******************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"contactFormContainer": "styles_contactFormContainer__1T-vh",
	"isVisible": "styles_isVisible__15Exg",
	"closeButton": "styles_closeButton__2ABiv",
	"contact-section": "styles_contact-section__38ueg"
};


/***/ }),

/***/ "./src/components/Form/Button/styles.module.scss":
/*!*******************************************************!*\
  !*** ./src/components/Form/Button/styles.module.scss ***!
  \*******************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"btn-primary": "styles_btn-primary__3eOXt",
	"btn-secondary": "styles_btn-secondary__gFtYC",
	"btn-success": "styles_btn-success__2qgPG",
	"btn-info": "styles_btn-info__2RGql",
	"btn-warning": "styles_btn-warning__OI5l6",
	"btn-danger": "styles_btn-danger__2WbSA",
	"btn-outlined-primary": "styles_btn-outlined-primary__GPT-5",
	"btn-outlined-secondary": "styles_btn-outlined-secondary__2KVA5",
	"btn-outlined-success": "styles_btn-outlined-success__Radjt",
	"btn-outlined-info": "styles_btn-outlined-info__J4Imp",
	"btn-outlined-warning": "styles_btn-outlined-warning__3jeZN",
	"btn-outlined-danger": "styles_btn-outlined-danger__SCTw_",
	"buttonContainer": "styles_buttonContainer__3A0m3"
};


/***/ }),

/***/ "./src/components/Utilities/ClickableList/ListOptions/styles.module.scss":
/*!*******************************************************************************!*\
  !*** ./src/components/Utilities/ClickableList/ListOptions/styles.module.scss ***!
  \*******************************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"listOptionsContainer": "styles_listOptionsContainer__1lOrT",
	"listOption": "styles_listOption__1lEGX",
	"isActive": "styles_isActive__Tc12l"
};


/***/ }),

/***/ "./src/components/Utilities/ClickableList/styles.module.scss":
/*!*******************************************************************!*\
  !*** ./src/components/Utilities/ClickableList/styles.module.scss ***!
  \*******************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"clickableListContainer": "styles_clickableListContainer__b5doS",
	"listContent": "styles_listContent__1LEBx",
	"animate": "styles_animate__3bdsF",
	"opacityAnimation": "styles_opacityAnimation__p9uVF"
};


/***/ }),

/***/ "./src/layouts/DefaultLayout/components/Footer/styles.module.scss":
/*!************************************************************************!*\
  !*** ./src/layouts/DefaultLayout/components/Footer/styles.module.scss ***!
  \************************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"footer-section": "styles_footer-section__MOVDb",
	"footer-section-content": "styles_footer-section-content__qiHjC",
	"footer-layout-container": "styles_footer-layout-container__2xxr-",
	"contact-address": "styles_contact-address__3yj2y",
	"social-media-items": "styles_social-media-items__1wE7Z",
	"footer-menu-section": "styles_footer-menu-section__11TF-",
	"footer-menu-nav-column": "styles_footer-menu-nav-column__3MWV8",
	"news-section": "styles_news-section__2fE7E"
};


/***/ }),

/***/ "./src/layouts/DefaultLayout/components/Menu/styles.module.scss":
/*!**********************************************************************!*\
  !*** ./src/layouts/DefaultLayout/components/Menu/styles.module.scss ***!
  \**********************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"menu-container": "styles_menu-container__3TXwV",
	"menu-content": "styles_menu-content__2Z6N3",
	"logo": "styles_logo__21vbI",
	"navbar-container": "styles_navbar-container__3h7oM",
	"is-menu-open": "styles_is-menu-open__2rIXB",
	"nav-list-container": "styles_nav-list-container__1AZoh",
	"appearFromLeft": "styles_appearFromLeft__2I8_G"
};


/***/ }),

/***/ "./src/layouts/DefaultLayout/styles.module.scss":
/*!******************************************************!*\
  !*** ./src/layouts/DefaultLayout/styles.module.scss ***!
  \******************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"defaultLayoutContainer": "styles_defaultLayoutContainer__1iXY4"
};


/***/ }),

/***/ "./src/views/home/components/Blog/RecourseCard.module.scss":
/*!*****************************************************************!*\
  !*** ./src/views/home/components/Blog/RecourseCard.module.scss ***!
  \*****************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"recourse-card-container": "RecourseCard_recourse-card-container__24DQ9",
	"link": "RecourseCard_link__2lrdX",
	"recourse-card-title": "RecourseCard_recourse-card-title__Pq00Y",
	"recourse-card-image-container": "RecourseCard_recourse-card-image-container__2hdQo",
	"recourse-card-content": "RecourseCard_recourse-card-content__37Y9V"
};


/***/ }),

/***/ "./src/views/home/components/Blog/RecourseCardList.module.scss":
/*!*********************************************************************!*\
  !*** ./src/views/home/components/Blog/RecourseCardList.module.scss ***!
  \*********************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"recursos-section": "RecourseCardList_recursos-section__RG8vs",
	"recursos-list-container": "RecourseCardList_recursos-list-container__2b73o"
};


/***/ }),

/***/ "./src/views/home/components/Blog/styles.module.scss":
/*!***********************************************************!*\
  !*** ./src/views/home/components/Blog/styles.module.scss ***!
  \***********************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"blog-section": "styles_blog-section__1h_EK",
	"blog-section-content": "styles_blog-section-content__1uDkK",
	"blog-section-description": "styles_blog-section-description__2oUVk",
	"blog-preview-container": "styles_blog-preview-container__9j2hM",
	"blue-circle": "styles_blue-circle__36A50",
	"card-container": "styles_card-container__DH568",
	"topic-preview-container": "styles_topic-preview-container__2XbvP",
	"topic-description": "styles_topic-description__3_Jy0"
};


/***/ }),

/***/ "./src/views/home/components/ExpertiseBrinov/styles.module.scss":
/*!**********************************************************************!*\
  !*** ./src/views/home/components/ExpertiseBrinov/styles.module.scss ***!
  \**********************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"expertise-section": "styles_expertise-section__15JVP",
	"expertise-section-content": "styles_expertise-section-content__1kNxN",
	"expertise-section-description": "styles_expertise-section-description__2B7BS",
	"companies-logos": "styles_companies-logos__2aQEH"
};


/***/ }),

/***/ "./src/views/home/components/Hero/styles.module.scss":
/*!***********************************************************!*\
  !*** ./src/views/home/components/Hero/styles.module.scss ***!
  \***********************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"hero-section": "styles_hero-section__3ynxM",
	"hero-section-content": "styles_hero-section-content__3y3m3",
	"hero-section-description": "styles_hero-section-description__QChqZ",
	"image-container": "styles_image-container__rYTSN",
	"go-back": "styles_go-back__1da0c"
};


/***/ }),

/***/ "./src/views/home/components/SuccessCases/styles.module.scss":
/*!*******************************************************************!*\
  !*** ./src/views/home/components/SuccessCases/styles.module.scss ***!
  \*******************************************************************/
/***/ ((module) => {

// Exports
module.exports = {
	"success-cases-section": "styles_success-cases-section__2mzYN",
	"success-cases-section-content": "styles_success-cases-section-content__3PfDW",
	"success-cases-section-description": "styles_success-cases-section-description__2GYXw",
	"gray-circle": "styles_gray-circle__UGF2X",
	"colors": "styles_colors__1eYQ3",
	"depoiment-card": "styles_depoiment-card__2ES68",
	"depoiment-card-content": "styles_depoiment-card-content__1yiSH",
	"depoiment-card-footer": "styles_depoiment-card-footer__2AOCX",
	"depoiment-card-author": "styles_depoiment-card-author__3L0Vs"
};


/***/ }),

/***/ "./node_modules/aos/dist/aos.css":
/*!***************************************!*\
  !*** ./node_modules/aos/dist/aos.css ***!
  \***************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/next/image.js":
/*!************************************!*\
  !*** ./node_modules/next/image.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/client/image */ "./node_modules/next/dist/client/image.js")


/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/react-icons/fi/index.esm.js":
/*!**************************************************!*\
  !*** ./node_modules/react-icons/fi/index.esm.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FiActivity": () => (/* binding */ FiActivity),
/* harmony export */   "FiAirplay": () => (/* binding */ FiAirplay),
/* harmony export */   "FiAlertCircle": () => (/* binding */ FiAlertCircle),
/* harmony export */   "FiAlertOctagon": () => (/* binding */ FiAlertOctagon),
/* harmony export */   "FiAlertTriangle": () => (/* binding */ FiAlertTriangle),
/* harmony export */   "FiAlignCenter": () => (/* binding */ FiAlignCenter),
/* harmony export */   "FiAlignJustify": () => (/* binding */ FiAlignJustify),
/* harmony export */   "FiAlignLeft": () => (/* binding */ FiAlignLeft),
/* harmony export */   "FiAlignRight": () => (/* binding */ FiAlignRight),
/* harmony export */   "FiAnchor": () => (/* binding */ FiAnchor),
/* harmony export */   "FiAperture": () => (/* binding */ FiAperture),
/* harmony export */   "FiArchive": () => (/* binding */ FiArchive),
/* harmony export */   "FiArrowDownCircle": () => (/* binding */ FiArrowDownCircle),
/* harmony export */   "FiArrowDownLeft": () => (/* binding */ FiArrowDownLeft),
/* harmony export */   "FiArrowDownRight": () => (/* binding */ FiArrowDownRight),
/* harmony export */   "FiArrowDown": () => (/* binding */ FiArrowDown),
/* harmony export */   "FiArrowLeftCircle": () => (/* binding */ FiArrowLeftCircle),
/* harmony export */   "FiArrowLeft": () => (/* binding */ FiArrowLeft),
/* harmony export */   "FiArrowRightCircle": () => (/* binding */ FiArrowRightCircle),
/* harmony export */   "FiArrowRight": () => (/* binding */ FiArrowRight),
/* harmony export */   "FiArrowUpCircle": () => (/* binding */ FiArrowUpCircle),
/* harmony export */   "FiArrowUpLeft": () => (/* binding */ FiArrowUpLeft),
/* harmony export */   "FiArrowUpRight": () => (/* binding */ FiArrowUpRight),
/* harmony export */   "FiArrowUp": () => (/* binding */ FiArrowUp),
/* harmony export */   "FiAtSign": () => (/* binding */ FiAtSign),
/* harmony export */   "FiAward": () => (/* binding */ FiAward),
/* harmony export */   "FiBarChart2": () => (/* binding */ FiBarChart2),
/* harmony export */   "FiBarChart": () => (/* binding */ FiBarChart),
/* harmony export */   "FiBatteryCharging": () => (/* binding */ FiBatteryCharging),
/* harmony export */   "FiBattery": () => (/* binding */ FiBattery),
/* harmony export */   "FiBellOff": () => (/* binding */ FiBellOff),
/* harmony export */   "FiBell": () => (/* binding */ FiBell),
/* harmony export */   "FiBluetooth": () => (/* binding */ FiBluetooth),
/* harmony export */   "FiBold": () => (/* binding */ FiBold),
/* harmony export */   "FiBookOpen": () => (/* binding */ FiBookOpen),
/* harmony export */   "FiBook": () => (/* binding */ FiBook),
/* harmony export */   "FiBookmark": () => (/* binding */ FiBookmark),
/* harmony export */   "FiBox": () => (/* binding */ FiBox),
/* harmony export */   "FiBriefcase": () => (/* binding */ FiBriefcase),
/* harmony export */   "FiCalendar": () => (/* binding */ FiCalendar),
/* harmony export */   "FiCameraOff": () => (/* binding */ FiCameraOff),
/* harmony export */   "FiCamera": () => (/* binding */ FiCamera),
/* harmony export */   "FiCast": () => (/* binding */ FiCast),
/* harmony export */   "FiCheckCircle": () => (/* binding */ FiCheckCircle),
/* harmony export */   "FiCheckSquare": () => (/* binding */ FiCheckSquare),
/* harmony export */   "FiCheck": () => (/* binding */ FiCheck),
/* harmony export */   "FiChevronDown": () => (/* binding */ FiChevronDown),
/* harmony export */   "FiChevronLeft": () => (/* binding */ FiChevronLeft),
/* harmony export */   "FiChevronRight": () => (/* binding */ FiChevronRight),
/* harmony export */   "FiChevronUp": () => (/* binding */ FiChevronUp),
/* harmony export */   "FiChevronsDown": () => (/* binding */ FiChevronsDown),
/* harmony export */   "FiChevronsLeft": () => (/* binding */ FiChevronsLeft),
/* harmony export */   "FiChevronsRight": () => (/* binding */ FiChevronsRight),
/* harmony export */   "FiChevronsUp": () => (/* binding */ FiChevronsUp),
/* harmony export */   "FiChrome": () => (/* binding */ FiChrome),
/* harmony export */   "FiCircle": () => (/* binding */ FiCircle),
/* harmony export */   "FiClipboard": () => (/* binding */ FiClipboard),
/* harmony export */   "FiClock": () => (/* binding */ FiClock),
/* harmony export */   "FiCloudDrizzle": () => (/* binding */ FiCloudDrizzle),
/* harmony export */   "FiCloudLightning": () => (/* binding */ FiCloudLightning),
/* harmony export */   "FiCloudOff": () => (/* binding */ FiCloudOff),
/* harmony export */   "FiCloudRain": () => (/* binding */ FiCloudRain),
/* harmony export */   "FiCloudSnow": () => (/* binding */ FiCloudSnow),
/* harmony export */   "FiCloud": () => (/* binding */ FiCloud),
/* harmony export */   "FiCode": () => (/* binding */ FiCode),
/* harmony export */   "FiCodepen": () => (/* binding */ FiCodepen),
/* harmony export */   "FiCodesandbox": () => (/* binding */ FiCodesandbox),
/* harmony export */   "FiCoffee": () => (/* binding */ FiCoffee),
/* harmony export */   "FiColumns": () => (/* binding */ FiColumns),
/* harmony export */   "FiCommand": () => (/* binding */ FiCommand),
/* harmony export */   "FiCompass": () => (/* binding */ FiCompass),
/* harmony export */   "FiCopy": () => (/* binding */ FiCopy),
/* harmony export */   "FiCornerDownLeft": () => (/* binding */ FiCornerDownLeft),
/* harmony export */   "FiCornerDownRight": () => (/* binding */ FiCornerDownRight),
/* harmony export */   "FiCornerLeftDown": () => (/* binding */ FiCornerLeftDown),
/* harmony export */   "FiCornerLeftUp": () => (/* binding */ FiCornerLeftUp),
/* harmony export */   "FiCornerRightDown": () => (/* binding */ FiCornerRightDown),
/* harmony export */   "FiCornerRightUp": () => (/* binding */ FiCornerRightUp),
/* harmony export */   "FiCornerUpLeft": () => (/* binding */ FiCornerUpLeft),
/* harmony export */   "FiCornerUpRight": () => (/* binding */ FiCornerUpRight),
/* harmony export */   "FiCpu": () => (/* binding */ FiCpu),
/* harmony export */   "FiCreditCard": () => (/* binding */ FiCreditCard),
/* harmony export */   "FiCrop": () => (/* binding */ FiCrop),
/* harmony export */   "FiCrosshair": () => (/* binding */ FiCrosshair),
/* harmony export */   "FiDatabase": () => (/* binding */ FiDatabase),
/* harmony export */   "FiDelete": () => (/* binding */ FiDelete),
/* harmony export */   "FiDisc": () => (/* binding */ FiDisc),
/* harmony export */   "FiDivideCircle": () => (/* binding */ FiDivideCircle),
/* harmony export */   "FiDivideSquare": () => (/* binding */ FiDivideSquare),
/* harmony export */   "FiDivide": () => (/* binding */ FiDivide),
/* harmony export */   "FiDollarSign": () => (/* binding */ FiDollarSign),
/* harmony export */   "FiDownloadCloud": () => (/* binding */ FiDownloadCloud),
/* harmony export */   "FiDownload": () => (/* binding */ FiDownload),
/* harmony export */   "FiDribbble": () => (/* binding */ FiDribbble),
/* harmony export */   "FiDroplet": () => (/* binding */ FiDroplet),
/* harmony export */   "FiEdit2": () => (/* binding */ FiEdit2),
/* harmony export */   "FiEdit3": () => (/* binding */ FiEdit3),
/* harmony export */   "FiEdit": () => (/* binding */ FiEdit),
/* harmony export */   "FiExternalLink": () => (/* binding */ FiExternalLink),
/* harmony export */   "FiEyeOff": () => (/* binding */ FiEyeOff),
/* harmony export */   "FiEye": () => (/* binding */ FiEye),
/* harmony export */   "FiFacebook": () => (/* binding */ FiFacebook),
/* harmony export */   "FiFastForward": () => (/* binding */ FiFastForward),
/* harmony export */   "FiFeather": () => (/* binding */ FiFeather),
/* harmony export */   "FiFigma": () => (/* binding */ FiFigma),
/* harmony export */   "FiFileMinus": () => (/* binding */ FiFileMinus),
/* harmony export */   "FiFilePlus": () => (/* binding */ FiFilePlus),
/* harmony export */   "FiFileText": () => (/* binding */ FiFileText),
/* harmony export */   "FiFile": () => (/* binding */ FiFile),
/* harmony export */   "FiFilm": () => (/* binding */ FiFilm),
/* harmony export */   "FiFilter": () => (/* binding */ FiFilter),
/* harmony export */   "FiFlag": () => (/* binding */ FiFlag),
/* harmony export */   "FiFolderMinus": () => (/* binding */ FiFolderMinus),
/* harmony export */   "FiFolderPlus": () => (/* binding */ FiFolderPlus),
/* harmony export */   "FiFolder": () => (/* binding */ FiFolder),
/* harmony export */   "FiFramer": () => (/* binding */ FiFramer),
/* harmony export */   "FiFrown": () => (/* binding */ FiFrown),
/* harmony export */   "FiGift": () => (/* binding */ FiGift),
/* harmony export */   "FiGitBranch": () => (/* binding */ FiGitBranch),
/* harmony export */   "FiGitCommit": () => (/* binding */ FiGitCommit),
/* harmony export */   "FiGitMerge": () => (/* binding */ FiGitMerge),
/* harmony export */   "FiGitPullRequest": () => (/* binding */ FiGitPullRequest),
/* harmony export */   "FiGithub": () => (/* binding */ FiGithub),
/* harmony export */   "FiGitlab": () => (/* binding */ FiGitlab),
/* harmony export */   "FiGlobe": () => (/* binding */ FiGlobe),
/* harmony export */   "FiGrid": () => (/* binding */ FiGrid),
/* harmony export */   "FiHardDrive": () => (/* binding */ FiHardDrive),
/* harmony export */   "FiHash": () => (/* binding */ FiHash),
/* harmony export */   "FiHeadphones": () => (/* binding */ FiHeadphones),
/* harmony export */   "FiHeart": () => (/* binding */ FiHeart),
/* harmony export */   "FiHelpCircle": () => (/* binding */ FiHelpCircle),
/* harmony export */   "FiHexagon": () => (/* binding */ FiHexagon),
/* harmony export */   "FiHome": () => (/* binding */ FiHome),
/* harmony export */   "FiImage": () => (/* binding */ FiImage),
/* harmony export */   "FiInbox": () => (/* binding */ FiInbox),
/* harmony export */   "FiInfo": () => (/* binding */ FiInfo),
/* harmony export */   "FiInstagram": () => (/* binding */ FiInstagram),
/* harmony export */   "FiItalic": () => (/* binding */ FiItalic),
/* harmony export */   "FiKey": () => (/* binding */ FiKey),
/* harmony export */   "FiLayers": () => (/* binding */ FiLayers),
/* harmony export */   "FiLayout": () => (/* binding */ FiLayout),
/* harmony export */   "FiLifeBuoy": () => (/* binding */ FiLifeBuoy),
/* harmony export */   "FiLink2": () => (/* binding */ FiLink2),
/* harmony export */   "FiLink": () => (/* binding */ FiLink),
/* harmony export */   "FiLinkedin": () => (/* binding */ FiLinkedin),
/* harmony export */   "FiList": () => (/* binding */ FiList),
/* harmony export */   "FiLoader": () => (/* binding */ FiLoader),
/* harmony export */   "FiLock": () => (/* binding */ FiLock),
/* harmony export */   "FiLogIn": () => (/* binding */ FiLogIn),
/* harmony export */   "FiLogOut": () => (/* binding */ FiLogOut),
/* harmony export */   "FiMail": () => (/* binding */ FiMail),
/* harmony export */   "FiMapPin": () => (/* binding */ FiMapPin),
/* harmony export */   "FiMap": () => (/* binding */ FiMap),
/* harmony export */   "FiMaximize2": () => (/* binding */ FiMaximize2),
/* harmony export */   "FiMaximize": () => (/* binding */ FiMaximize),
/* harmony export */   "FiMeh": () => (/* binding */ FiMeh),
/* harmony export */   "FiMenu": () => (/* binding */ FiMenu),
/* harmony export */   "FiMessageCircle": () => (/* binding */ FiMessageCircle),
/* harmony export */   "FiMessageSquare": () => (/* binding */ FiMessageSquare),
/* harmony export */   "FiMicOff": () => (/* binding */ FiMicOff),
/* harmony export */   "FiMic": () => (/* binding */ FiMic),
/* harmony export */   "FiMinimize2": () => (/* binding */ FiMinimize2),
/* harmony export */   "FiMinimize": () => (/* binding */ FiMinimize),
/* harmony export */   "FiMinusCircle": () => (/* binding */ FiMinusCircle),
/* harmony export */   "FiMinusSquare": () => (/* binding */ FiMinusSquare),
/* harmony export */   "FiMinus": () => (/* binding */ FiMinus),
/* harmony export */   "FiMonitor": () => (/* binding */ FiMonitor),
/* harmony export */   "FiMoon": () => (/* binding */ FiMoon),
/* harmony export */   "FiMoreHorizontal": () => (/* binding */ FiMoreHorizontal),
/* harmony export */   "FiMoreVertical": () => (/* binding */ FiMoreVertical),
/* harmony export */   "FiMousePointer": () => (/* binding */ FiMousePointer),
/* harmony export */   "FiMove": () => (/* binding */ FiMove),
/* harmony export */   "FiMusic": () => (/* binding */ FiMusic),
/* harmony export */   "FiNavigation2": () => (/* binding */ FiNavigation2),
/* harmony export */   "FiNavigation": () => (/* binding */ FiNavigation),
/* harmony export */   "FiOctagon": () => (/* binding */ FiOctagon),
/* harmony export */   "FiPackage": () => (/* binding */ FiPackage),
/* harmony export */   "FiPaperclip": () => (/* binding */ FiPaperclip),
/* harmony export */   "FiPauseCircle": () => (/* binding */ FiPauseCircle),
/* harmony export */   "FiPause": () => (/* binding */ FiPause),
/* harmony export */   "FiPenTool": () => (/* binding */ FiPenTool),
/* harmony export */   "FiPercent": () => (/* binding */ FiPercent),
/* harmony export */   "FiPhoneCall": () => (/* binding */ FiPhoneCall),
/* harmony export */   "FiPhoneForwarded": () => (/* binding */ FiPhoneForwarded),
/* harmony export */   "FiPhoneIncoming": () => (/* binding */ FiPhoneIncoming),
/* harmony export */   "FiPhoneMissed": () => (/* binding */ FiPhoneMissed),
/* harmony export */   "FiPhoneOff": () => (/* binding */ FiPhoneOff),
/* harmony export */   "FiPhoneOutgoing": () => (/* binding */ FiPhoneOutgoing),
/* harmony export */   "FiPhone": () => (/* binding */ FiPhone),
/* harmony export */   "FiPieChart": () => (/* binding */ FiPieChart),
/* harmony export */   "FiPlayCircle": () => (/* binding */ FiPlayCircle),
/* harmony export */   "FiPlay": () => (/* binding */ FiPlay),
/* harmony export */   "FiPlusCircle": () => (/* binding */ FiPlusCircle),
/* harmony export */   "FiPlusSquare": () => (/* binding */ FiPlusSquare),
/* harmony export */   "FiPlus": () => (/* binding */ FiPlus),
/* harmony export */   "FiPocket": () => (/* binding */ FiPocket),
/* harmony export */   "FiPower": () => (/* binding */ FiPower),
/* harmony export */   "FiPrinter": () => (/* binding */ FiPrinter),
/* harmony export */   "FiRadio": () => (/* binding */ FiRadio),
/* harmony export */   "FiRefreshCcw": () => (/* binding */ FiRefreshCcw),
/* harmony export */   "FiRefreshCw": () => (/* binding */ FiRefreshCw),
/* harmony export */   "FiRepeat": () => (/* binding */ FiRepeat),
/* harmony export */   "FiRewind": () => (/* binding */ FiRewind),
/* harmony export */   "FiRotateCcw": () => (/* binding */ FiRotateCcw),
/* harmony export */   "FiRotateCw": () => (/* binding */ FiRotateCw),
/* harmony export */   "FiRss": () => (/* binding */ FiRss),
/* harmony export */   "FiSave": () => (/* binding */ FiSave),
/* harmony export */   "FiScissors": () => (/* binding */ FiScissors),
/* harmony export */   "FiSearch": () => (/* binding */ FiSearch),
/* harmony export */   "FiSend": () => (/* binding */ FiSend),
/* harmony export */   "FiServer": () => (/* binding */ FiServer),
/* harmony export */   "FiSettings": () => (/* binding */ FiSettings),
/* harmony export */   "FiShare2": () => (/* binding */ FiShare2),
/* harmony export */   "FiShare": () => (/* binding */ FiShare),
/* harmony export */   "FiShieldOff": () => (/* binding */ FiShieldOff),
/* harmony export */   "FiShield": () => (/* binding */ FiShield),
/* harmony export */   "FiShoppingBag": () => (/* binding */ FiShoppingBag),
/* harmony export */   "FiShoppingCart": () => (/* binding */ FiShoppingCart),
/* harmony export */   "FiShuffle": () => (/* binding */ FiShuffle),
/* harmony export */   "FiSidebar": () => (/* binding */ FiSidebar),
/* harmony export */   "FiSkipBack": () => (/* binding */ FiSkipBack),
/* harmony export */   "FiSkipForward": () => (/* binding */ FiSkipForward),
/* harmony export */   "FiSlack": () => (/* binding */ FiSlack),
/* harmony export */   "FiSlash": () => (/* binding */ FiSlash),
/* harmony export */   "FiSliders": () => (/* binding */ FiSliders),
/* harmony export */   "FiSmartphone": () => (/* binding */ FiSmartphone),
/* harmony export */   "FiSmile": () => (/* binding */ FiSmile),
/* harmony export */   "FiSpeaker": () => (/* binding */ FiSpeaker),
/* harmony export */   "FiSquare": () => (/* binding */ FiSquare),
/* harmony export */   "FiStar": () => (/* binding */ FiStar),
/* harmony export */   "FiStopCircle": () => (/* binding */ FiStopCircle),
/* harmony export */   "FiSun": () => (/* binding */ FiSun),
/* harmony export */   "FiSunrise": () => (/* binding */ FiSunrise),
/* harmony export */   "FiSunset": () => (/* binding */ FiSunset),
/* harmony export */   "FiTablet": () => (/* binding */ FiTablet),
/* harmony export */   "FiTag": () => (/* binding */ FiTag),
/* harmony export */   "FiTarget": () => (/* binding */ FiTarget),
/* harmony export */   "FiTerminal": () => (/* binding */ FiTerminal),
/* harmony export */   "FiThermometer": () => (/* binding */ FiThermometer),
/* harmony export */   "FiThumbsDown": () => (/* binding */ FiThumbsDown),
/* harmony export */   "FiThumbsUp": () => (/* binding */ FiThumbsUp),
/* harmony export */   "FiToggleLeft": () => (/* binding */ FiToggleLeft),
/* harmony export */   "FiToggleRight": () => (/* binding */ FiToggleRight),
/* harmony export */   "FiTool": () => (/* binding */ FiTool),
/* harmony export */   "FiTrash2": () => (/* binding */ FiTrash2),
/* harmony export */   "FiTrash": () => (/* binding */ FiTrash),
/* harmony export */   "FiTrello": () => (/* binding */ FiTrello),
/* harmony export */   "FiTrendingDown": () => (/* binding */ FiTrendingDown),
/* harmony export */   "FiTrendingUp": () => (/* binding */ FiTrendingUp),
/* harmony export */   "FiTriangle": () => (/* binding */ FiTriangle),
/* harmony export */   "FiTruck": () => (/* binding */ FiTruck),
/* harmony export */   "FiTv": () => (/* binding */ FiTv),
/* harmony export */   "FiTwitch": () => (/* binding */ FiTwitch),
/* harmony export */   "FiTwitter": () => (/* binding */ FiTwitter),
/* harmony export */   "FiType": () => (/* binding */ FiType),
/* harmony export */   "FiUmbrella": () => (/* binding */ FiUmbrella),
/* harmony export */   "FiUnderline": () => (/* binding */ FiUnderline),
/* harmony export */   "FiUnlock": () => (/* binding */ FiUnlock),
/* harmony export */   "FiUploadCloud": () => (/* binding */ FiUploadCloud),
/* harmony export */   "FiUpload": () => (/* binding */ FiUpload),
/* harmony export */   "FiUserCheck": () => (/* binding */ FiUserCheck),
/* harmony export */   "FiUserMinus": () => (/* binding */ FiUserMinus),
/* harmony export */   "FiUserPlus": () => (/* binding */ FiUserPlus),
/* harmony export */   "FiUserX": () => (/* binding */ FiUserX),
/* harmony export */   "FiUser": () => (/* binding */ FiUser),
/* harmony export */   "FiUsers": () => (/* binding */ FiUsers),
/* harmony export */   "FiVideoOff": () => (/* binding */ FiVideoOff),
/* harmony export */   "FiVideo": () => (/* binding */ FiVideo),
/* harmony export */   "FiVoicemail": () => (/* binding */ FiVoicemail),
/* harmony export */   "FiVolume1": () => (/* binding */ FiVolume1),
/* harmony export */   "FiVolume2": () => (/* binding */ FiVolume2),
/* harmony export */   "FiVolumeX": () => (/* binding */ FiVolumeX),
/* harmony export */   "FiVolume": () => (/* binding */ FiVolume),
/* harmony export */   "FiWatch": () => (/* binding */ FiWatch),
/* harmony export */   "FiWifiOff": () => (/* binding */ FiWifiOff),
/* harmony export */   "FiWifi": () => (/* binding */ FiWifi),
/* harmony export */   "FiWind": () => (/* binding */ FiWind),
/* harmony export */   "FiXCircle": () => (/* binding */ FiXCircle),
/* harmony export */   "FiXOctagon": () => (/* binding */ FiXOctagon),
/* harmony export */   "FiXSquare": () => (/* binding */ FiXSquare),
/* harmony export */   "FiX": () => (/* binding */ FiX),
/* harmony export */   "FiYoutube": () => (/* binding */ FiYoutube),
/* harmony export */   "FiZapOff": () => (/* binding */ FiZapOff),
/* harmony export */   "FiZap": () => (/* binding */ FiZap),
/* harmony export */   "FiZoomIn": () => (/* binding */ FiZoomIn),
/* harmony export */   "FiZoomOut": () => (/* binding */ FiZoomOut)
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./node_modules/react-icons/lib/cjs/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
// THIS FILE IS AUTO GENERATED

function FiActivity (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"22 12 18 12 15 21 9 3 6 12 2 12"}}]})(props);
};
function FiAirplay (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}},{"tag":"polygon","attr":{"points":"12 15 17 21 7 21 12 15"}}]})(props);
};
function FiAlertCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12.01","y2":"16"}}]})(props);
};
function FiAlertOctagon (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12.01","y2":"16"}}]})(props);
};
function FiAlertTriangle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}},{"tag":"line","attr":{"x1":"12","y1":"9","x2":"12","y2":"13"}},{"tag":"line","attr":{"x1":"12","y1":"17","x2":"12.01","y2":"17"}}]})(props);
};
function FiAlignCenter (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"18","y1":"10","x2":"6","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"18","y1":"18","x2":"6","y2":"18"}}]})(props);
};
function FiAlignJustify (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"21","y1":"10","x2":"3","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"3","y2":"18"}}]})(props);
};
function FiAlignLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"17","y1":"10","x2":"3","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"17","y1":"18","x2":"3","y2":"18"}}]})(props);
};
function FiAlignRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"21","y1":"10","x2":"7","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"7","y2":"18"}}]})(props);
};
function FiAnchor (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"5","r":"3"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"8"}},{"tag":"path","attr":{"d":"M5 12H2a10 10 0 0 0 20 0h-3"}}]})(props);
};
function FiAperture (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"14.31","y1":"8","x2":"20.05","y2":"17.94"}},{"tag":"line","attr":{"x1":"9.69","y1":"8","x2":"21.17","y2":"8"}},{"tag":"line","attr":{"x1":"7.38","y1":"12","x2":"13.12","y2":"2.06"}},{"tag":"line","attr":{"x1":"9.69","y1":"16","x2":"3.95","y2":"6.06"}},{"tag":"line","attr":{"x1":"14.31","y1":"16","x2":"2.83","y2":"16"}},{"tag":"line","attr":{"x1":"16.62","y1":"12","x2":"10.88","y2":"21.94"}}]})(props);
};
function FiArchive (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"21 8 21 21 3 21 3 8"}},{"tag":"rect","attr":{"x":"1","y":"3","width":"22","height":"5"}},{"tag":"line","attr":{"x1":"10","y1":"12","x2":"14","y2":"12"}}]})(props);
};
function FiArrowDownCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"8 12 12 16 16 12"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"16"}}]})(props);
};
function FiArrowDownLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"17","y1":"7","x2":"7","y2":"17"}},{"tag":"polyline","attr":{"points":"17 17 7 17 7 7"}}]})(props);
};
function FiArrowDownRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"7","y1":"7","x2":"17","y2":"17"}},{"tag":"polyline","attr":{"points":"17 7 17 17 7 17"}}]})(props);
};
function FiArrowDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"5","x2":"12","y2":"19"}},{"tag":"polyline","attr":{"points":"19 12 12 19 5 12"}}]})(props);
};
function FiArrowLeftCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"12 8 8 12 12 16"}},{"tag":"line","attr":{"x1":"16","y1":"12","x2":"8","y2":"12"}}]})(props);
};
function FiArrowLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"19","y1":"12","x2":"5","y2":"12"}},{"tag":"polyline","attr":{"points":"12 19 5 12 12 5"}}]})(props);
};
function FiArrowRightCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"12 16 16 12 12 8"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiArrowRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}},{"tag":"polyline","attr":{"points":"12 5 19 12 12 19"}}]})(props);
};
function FiArrowUpCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"16 12 12 8 8 12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"8"}}]})(props);
};
function FiArrowUpLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"17","y1":"17","x2":"7","y2":"7"}},{"tag":"polyline","attr":{"points":"7 17 7 7 17 7"}}]})(props);
};
function FiArrowUpRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"7","y1":"17","x2":"17","y2":"7"}},{"tag":"polyline","attr":{"points":"7 7 17 7 17 17"}}]})(props);
};
function FiArrowUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"19","x2":"12","y2":"5"}},{"tag":"polyline","attr":{"points":"5 12 12 5 19 12"}}]})(props);
};
function FiAtSign (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"path","attr":{"d":"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"}}]})(props);
};
function FiAward (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"8","r":"7"}},{"tag":"polyline","attr":{"points":"8.21 13.89 7 23 12 20 17 23 15.79 13.88"}}]})(props);
};
function FiBarChart2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"18","y1":"20","x2":"18","y2":"10"}},{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12","y2":"4"}},{"tag":"line","attr":{"x1":"6","y1":"20","x2":"6","y2":"14"}}]})(props);
};
function FiBarChart (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12","y2":"10"}},{"tag":"line","attr":{"x1":"18","y1":"20","x2":"18","y2":"4"}},{"tag":"line","attr":{"x1":"6","y1":"20","x2":"6","y2":"16"}}]})(props);
};
function FiBatteryCharging (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"}},{"tag":"line","attr":{"x1":"23","y1":"13","x2":"23","y2":"11"}},{"tag":"polyline","attr":{"points":"11 6 7 12 13 12 9 18"}}]})(props);
};
function FiBattery (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"6","width":"18","height":"12","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"23","y1":"13","x2":"23","y2":"11"}}]})(props);
};
function FiBellOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M13.73 21a2 2 0 0 1-3.46 0"}},{"tag":"path","attr":{"d":"M18.63 13A17.89 17.89 0 0 1 18 8"}},{"tag":"path","attr":{"d":"M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"}},{"tag":"path","attr":{"d":"M18 8a6 6 0 0 0-9.33-5"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiBell (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}},{"tag":"path","attr":{"d":"M13.73 21a2 2 0 0 1-3.46 0"}}]})(props);
};
function FiBluetooth (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"}}]})(props);
};
function FiBold (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}},{"tag":"path","attr":{"d":"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}}]})(props);
};
function FiBookOpen (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}},{"tag":"path","attr":{"d":"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}}]})(props);
};
function FiBook (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}},{"tag":"path","attr":{"d":"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"}}]})(props);
};
function FiBookmark (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"}}]})(props);
};
function FiBox (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}},{"tag":"polyline","attr":{"points":"3.27 6.96 12 12.01 20.73 6.96"}},{"tag":"line","attr":{"x1":"12","y1":"22.08","x2":"12","y2":"12"}}]})(props);
};
function FiBriefcase (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"7","width":"20","height":"14","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}}]})(props);
};
function FiCalendar (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"4","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"16","y1":"2","x2":"16","y2":"6"}},{"tag":"line","attr":{"x1":"8","y1":"2","x2":"8","y2":"6"}},{"tag":"line","attr":{"x1":"3","y1":"10","x2":"21","y2":"10"}}]})(props);
};
function FiCameraOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}},{"tag":"path","attr":{"d":"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"}}]})(props);
};
function FiCamera (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"}},{"tag":"circle","attr":{"cx":"12","cy":"13","r":"4"}}]})(props);
};
function FiCast (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}},{"tag":"line","attr":{"x1":"2","y1":"20","x2":"2.01","y2":"20"}}]})(props);
};
function FiCheckCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 11.08V12a10 10 0 1 1-5.93-9.14"}},{"tag":"polyline","attr":{"points":"22 4 12 14.01 9 11.01"}}]})(props);
};
function FiCheckSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 11 12 14 22 4"}},{"tag":"path","attr":{"d":"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"}}]})(props);
};
function FiCheck (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"20 6 9 17 4 12"}}]})(props);
};
function FiChevronDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"6 9 12 15 18 9"}}]})(props);
};
function FiChevronLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 18 9 12 15 6"}}]})(props);
};
function FiChevronRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 18 15 12 9 6"}}]})(props);
};
function FiChevronUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"18 15 12 9 6 15"}}]})(props);
};
function FiChevronsDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"7 13 12 18 17 13"}},{"tag":"polyline","attr":{"points":"7 6 12 11 17 6"}}]})(props);
};
function FiChevronsLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"11 17 6 12 11 7"}},{"tag":"polyline","attr":{"points":"18 17 13 12 18 7"}}]})(props);
};
function FiChevronsRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"13 17 18 12 13 7"}},{"tag":"polyline","attr":{"points":"6 17 11 12 6 7"}}]})(props);
};
function FiChevronsUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"17 11 12 6 7 11"}},{"tag":"polyline","attr":{"points":"17 18 12 13 7 18"}}]})(props);
};
function FiChrome (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"line","attr":{"x1":"21.17","y1":"8","x2":"12","y2":"8"}},{"tag":"line","attr":{"x1":"3.95","y1":"6.06","x2":"8.54","y2":"14"}},{"tag":"line","attr":{"x1":"10.88","y1":"21.94","x2":"15.46","y2":"14"}}]})(props);
};
function FiCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}}]})(props);
};
function FiClipboard (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}},{"tag":"rect","attr":{"x":"8","y":"2","width":"8","height":"4","rx":"1","ry":"1"}}]})(props);
};
function FiClock (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"12 6 12 12 16 14"}}]})(props);
};
function FiCloudDrizzle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"8","y1":"19","x2":"8","y2":"21"}},{"tag":"line","attr":{"x1":"8","y1":"13","x2":"8","y2":"15"}},{"tag":"line","attr":{"x1":"16","y1":"19","x2":"16","y2":"21"}},{"tag":"line","attr":{"x1":"16","y1":"13","x2":"16","y2":"15"}},{"tag":"line","attr":{"x1":"12","y1":"21","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"12","y1":"15","x2":"12","y2":"17"}},{"tag":"path","attr":{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}}]})(props);
};
function FiCloudLightning (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"}},{"tag":"polyline","attr":{"points":"13 11 9 17 15 17 11 23"}}]})(props);
};
function FiCloudOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiCloudRain (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"16","y1":"13","x2":"16","y2":"21"}},{"tag":"line","attr":{"x1":"8","y1":"13","x2":"8","y2":"21"}},{"tag":"line","attr":{"x1":"12","y1":"15","x2":"12","y2":"23"}},{"tag":"path","attr":{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}}]})(props);
};
function FiCloudSnow (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"}},{"tag":"line","attr":{"x1":"8","y1":"16","x2":"8.01","y2":"16"}},{"tag":"line","attr":{"x1":"8","y1":"20","x2":"8.01","y2":"20"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12.01","y2":"18"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12.01","y2":"22"}},{"tag":"line","attr":{"x1":"16","y1":"16","x2":"16.01","y2":"16"}},{"tag":"line","attr":{"x1":"16","y1":"20","x2":"16.01","y2":"20"}}]})(props);
};
function FiCloud (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"}}]})(props);
};
function FiCode (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 18 22 12 16 6"}},{"tag":"polyline","attr":{"points":"8 6 2 12 8 18"}}]})(props);
};
function FiCodepen (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"15.5"}},{"tag":"polyline","attr":{"points":"22 8.5 12 15.5 2 8.5"}},{"tag":"polyline","attr":{"points":"2 15.5 12 8.5 22 15.5"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"8.5"}}]})(props);
};
function FiCodesandbox (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}},{"tag":"polyline","attr":{"points":"7.5 4.21 12 6.81 16.5 4.21"}},{"tag":"polyline","attr":{"points":"7.5 19.79 7.5 14.6 3 12"}},{"tag":"polyline","attr":{"points":"21 12 16.5 14.6 16.5 19.79"}},{"tag":"polyline","attr":{"points":"3.27 6.96 12 12.01 20.73 6.96"}},{"tag":"line","attr":{"x1":"12","y1":"22.08","x2":"12","y2":"12"}}]})(props);
};
function FiCoffee (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 8h1a4 4 0 0 1 0 8h-1"}},{"tag":"path","attr":{"d":"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"}},{"tag":"line","attr":{"x1":"6","y1":"1","x2":"6","y2":"4"}},{"tag":"line","attr":{"x1":"10","y1":"1","x2":"10","y2":"4"}},{"tag":"line","attr":{"x1":"14","y1":"1","x2":"14","y2":"4"}}]})(props);
};
function FiColumns (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"}}]})(props);
};
function FiCommand (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"}}]})(props);
};
function FiCompass (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polygon","attr":{"points":"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"}}]})(props);
};
function FiCopy (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"9","y":"9","width":"13","height":"13","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"}}]})(props);
};
function FiCornerDownLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 10 4 15 9 20"}},{"tag":"path","attr":{"d":"M20 4v7a4 4 0 0 1-4 4H4"}}]})(props);
};
function FiCornerDownRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 10 20 15 15 20"}},{"tag":"path","attr":{"d":"M4 4v7a4 4 0 0 0 4 4h12"}}]})(props);
};
function FiCornerLeftDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"14 15 9 20 4 15"}},{"tag":"path","attr":{"d":"M20 4h-7a4 4 0 0 0-4 4v12"}}]})(props);
};
function FiCornerLeftUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"14 9 9 4 4 9"}},{"tag":"path","attr":{"d":"M20 20h-7a4 4 0 0 1-4-4V4"}}]})(props);
};
function FiCornerRightDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"10 15 15 20 20 15"}},{"tag":"path","attr":{"d":"M4 4h7a4 4 0 0 1 4 4v12"}}]})(props);
};
function FiCornerRightUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"10 9 15 4 20 9"}},{"tag":"path","attr":{"d":"M4 20h7a4 4 0 0 0 4-4V4"}}]})(props);
};
function FiCornerUpLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 14 4 9 9 4"}},{"tag":"path","attr":{"d":"M20 20v-7a4 4 0 0 0-4-4H4"}}]})(props);
};
function FiCornerUpRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 14 20 9 15 4"}},{"tag":"path","attr":{"d":"M4 20v-7a4 4 0 0 1 4-4h12"}}]})(props);
};
function FiCpu (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"4","y":"4","width":"16","height":"16","rx":"2","ry":"2"}},{"tag":"rect","attr":{"x":"9","y":"9","width":"6","height":"6"}},{"tag":"line","attr":{"x1":"9","y1":"1","x2":"9","y2":"4"}},{"tag":"line","attr":{"x1":"15","y1":"1","x2":"15","y2":"4"}},{"tag":"line","attr":{"x1":"9","y1":"20","x2":"9","y2":"23"}},{"tag":"line","attr":{"x1":"15","y1":"20","x2":"15","y2":"23"}},{"tag":"line","attr":{"x1":"20","y1":"9","x2":"23","y2":"9"}},{"tag":"line","attr":{"x1":"20","y1":"14","x2":"23","y2":"14"}},{"tag":"line","attr":{"x1":"1","y1":"9","x2":"4","y2":"9"}},{"tag":"line","attr":{"x1":"1","y1":"14","x2":"4","y2":"14"}}]})(props);
};
function FiCreditCard (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"4","width":"22","height":"16","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"1","y1":"10","x2":"23","y2":"10"}}]})(props);
};
function FiCrop (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6.13 1L6 16a2 2 0 0 0 2 2h15"}},{"tag":"path","attr":{"d":"M1 6.13L16 6a2 2 0 0 1 2 2v15"}}]})(props);
};
function FiCrosshair (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"22","y1":"12","x2":"18","y2":"12"}},{"tag":"line","attr":{"x1":"6","y1":"12","x2":"2","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"6","x2":"12","y2":"2"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"18"}}]})(props);
};
function FiDatabase (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"ellipse","attr":{"cx":"12","cy":"5","rx":"9","ry":"3"}},{"tag":"path","attr":{"d":"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}},{"tag":"path","attr":{"d":"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}}]})(props);
};
function FiDelete (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"}},{"tag":"line","attr":{"x1":"18","y1":"9","x2":"12","y2":"15"}},{"tag":"line","attr":{"x1":"12","y1":"9","x2":"18","y2":"15"}}]})(props);
};
function FiDisc (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"3"}}]})(props);
};
function FiDivideCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"8"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}}]})(props);
};
function FiDivideSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"8"}}]})(props);
};
function FiDivide (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"6","r":"2"}},{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}},{"tag":"circle","attr":{"cx":"12","cy":"18","r":"2"}}]})(props);
};
function FiDollarSign (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"1","x2":"12","y2":"23"}},{"tag":"path","attr":{"d":"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}}]})(props);
};
function FiDownloadCloud (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"8 17 12 21 16 17"}},{"tag":"line","attr":{"x1":"12","y1":"12","x2":"12","y2":"21"}},{"tag":"path","attr":{"d":"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"}}]})(props);
};
function FiDownload (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}},{"tag":"polyline","attr":{"points":"7 10 12 15 17 10"}},{"tag":"line","attr":{"x1":"12","y1":"15","x2":"12","y2":"3"}}]})(props);
};
function FiDribbble (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"}}]})(props);
};
function FiDroplet (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"}}]})(props);
};
function FiEdit2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"}}]})(props);
};
function FiEdit3 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 20h9"}},{"tag":"path","attr":{"d":"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"}}]})(props);
};
function FiEdit (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}},{"tag":"path","attr":{"d":"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"}}]})(props);
};
function FiExternalLink (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}},{"tag":"polyline","attr":{"points":"15 3 21 3 21 9"}},{"tag":"line","attr":{"x1":"10","y1":"14","x2":"21","y2":"3"}}]})(props);
};
function FiEyeOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiEye (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"3"}}]})(props);
};
function FiFacebook (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}}]})(props);
};
function FiFastForward (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"13 19 22 12 13 5 13 19"}},{"tag":"polygon","attr":{"points":"2 19 11 12 2 5 2 19"}}]})(props);
};
function FiFeather (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"}},{"tag":"line","attr":{"x1":"16","y1":"8","x2":"2","y2":"22"}},{"tag":"line","attr":{"x1":"17.5","y1":"15","x2":"9","y2":"15"}}]})(props);
};
function FiFigma (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"}},{"tag":"path","attr":{"d":"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"}},{"tag":"path","attr":{"d":"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"}},{"tag":"path","attr":{"d":"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"}},{"tag":"path","attr":{"d":"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"}}]})(props);
};
function FiFileMinus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}},{"tag":"polyline","attr":{"points":"14 2 14 8 20 8"}},{"tag":"line","attr":{"x1":"9","y1":"15","x2":"15","y2":"15"}}]})(props);
};
function FiFilePlus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}},{"tag":"polyline","attr":{"points":"14 2 14 8 20 8"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"9","y1":"15","x2":"15","y2":"15"}}]})(props);
};
function FiFileText (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}},{"tag":"polyline","attr":{"points":"14 2 14 8 20 8"}},{"tag":"line","attr":{"x1":"16","y1":"13","x2":"8","y2":"13"}},{"tag":"line","attr":{"x1":"16","y1":"17","x2":"8","y2":"17"}},{"tag":"polyline","attr":{"points":"10 9 9 9 8 9"}}]})(props);
};
function FiFile (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}},{"tag":"polyline","attr":{"points":"13 2 13 9 20 9"}}]})(props);
};
function FiFilm (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"2","width":"20","height":"20","rx":"2.18","ry":"2.18"}},{"tag":"line","attr":{"x1":"7","y1":"2","x2":"7","y2":"22"}},{"tag":"line","attr":{"x1":"17","y1":"2","x2":"17","y2":"22"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"22","y2":"12"}},{"tag":"line","attr":{"x1":"2","y1":"7","x2":"7","y2":"7"}},{"tag":"line","attr":{"x1":"2","y1":"17","x2":"7","y2":"17"}},{"tag":"line","attr":{"x1":"17","y1":"17","x2":"22","y2":"17"}},{"tag":"line","attr":{"x1":"17","y1":"7","x2":"22","y2":"7"}}]})(props);
};
function FiFilter (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}}]})(props);
};
function FiFlag (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}},{"tag":"line","attr":{"x1":"4","y1":"22","x2":"4","y2":"15"}}]})(props);
};
function FiFolderMinus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}},{"tag":"line","attr":{"x1":"9","y1":"14","x2":"15","y2":"14"}}]})(props);
};
function FiFolderPlus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}},{"tag":"line","attr":{"x1":"12","y1":"11","x2":"12","y2":"17"}},{"tag":"line","attr":{"x1":"9","y1":"14","x2":"15","y2":"14"}}]})(props);
};
function FiFolder (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}]})(props);
};
function FiFramer (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"}}]})(props);
};
function FiFrown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M16 16s-1.5-2-4-2-4 2-4 2"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"9.01","y2":"9"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"15.01","y2":"9"}}]})(props);
};
function FiGift (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"20 12 20 22 4 22 4 12"}},{"tag":"rect","attr":{"x":"2","y":"7","width":"20","height":"5"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"7"}},{"tag":"path","attr":{"d":"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"}},{"tag":"path","attr":{"d":"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"}}]})(props);
};
function FiGitBranch (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"6","y1":"3","x2":"6","y2":"15"}},{"tag":"circle","attr":{"cx":"18","cy":"6","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"18","r":"3"}},{"tag":"path","attr":{"d":"M18 9a9 9 0 0 1-9 9"}}]})(props);
};
function FiGitCommit (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"line","attr":{"x1":"1.05","y1":"12","x2":"7","y2":"12"}},{"tag":"line","attr":{"x1":"17.01","y1":"12","x2":"22.96","y2":"12"}}]})(props);
};
function FiGitMerge (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"18","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"6","r":"3"}},{"tag":"path","attr":{"d":"M6 21V9a9 9 0 0 0 9 9"}}]})(props);
};
function FiGitPullRequest (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"18","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"6","r":"3"}},{"tag":"path","attr":{"d":"M13 6h3a2 2 0 0 1 2 2v7"}},{"tag":"line","attr":{"x1":"6","y1":"9","x2":"6","y2":"21"}}]})(props);
};
function FiGithub (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}}]})(props);
};
function FiGitlab (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"}}]})(props);
};
function FiGlobe (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"22","y2":"12"}},{"tag":"path","attr":{"d":"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}}]})(props);
};
function FiGrid (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"7","height":"7"}},{"tag":"rect","attr":{"x":"14","y":"3","width":"7","height":"7"}},{"tag":"rect","attr":{"x":"14","y":"14","width":"7","height":"7"}},{"tag":"rect","attr":{"x":"3","y":"14","width":"7","height":"7"}}]})(props);
};
function FiHardDrive (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"22","y1":"12","x2":"2","y2":"12"}},{"tag":"path","attr":{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}},{"tag":"line","attr":{"x1":"6","y1":"16","x2":"6.01","y2":"16"}},{"tag":"line","attr":{"x1":"10","y1":"16","x2":"10.01","y2":"16"}}]})(props);
};
function FiHash (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"4","y1":"9","x2":"20","y2":"9"}},{"tag":"line","attr":{"x1":"4","y1":"15","x2":"20","y2":"15"}},{"tag":"line","attr":{"x1":"10","y1":"3","x2":"8","y2":"21"}},{"tag":"line","attr":{"x1":"16","y1":"3","x2":"14","y2":"21"}}]})(props);
};
function FiHeadphones (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M3 18v-6a9 9 0 0 1 18 0v6"}},{"tag":"path","attr":{"d":"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"}}]})(props);
};
function FiHeart (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"}}]})(props);
};
function FiHelpCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}},{"tag":"line","attr":{"x1":"12","y1":"17","x2":"12.01","y2":"17"}}]})(props);
};
function FiHexagon (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}}]})(props);
};
function FiHome (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}},{"tag":"polyline","attr":{"points":"9 22 9 12 15 12 15 22"}}]})(props);
};
function FiImage (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"8.5","r":"1.5"}},{"tag":"polyline","attr":{"points":"21 15 16 10 5 21"}}]})(props);
};
function FiInbox (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"22 12 16 12 14 15 10 15 8 12 2 12"}},{"tag":"path","attr":{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}}]})(props);
};
function FiInfo (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12.01","y2":"8"}}]})(props);
};
function FiInstagram (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"2","width":"20","height":"20","rx":"5","ry":"5"}},{"tag":"path","attr":{"d":"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}},{"tag":"line","attr":{"x1":"17.5","y1":"6.5","x2":"17.51","y2":"6.5"}}]})(props);
};
function FiItalic (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"19","y1":"4","x2":"10","y2":"4"}},{"tag":"line","attr":{"x1":"14","y1":"20","x2":"5","y2":"20"}},{"tag":"line","attr":{"x1":"15","y1":"4","x2":"9","y2":"20"}}]})(props);
};
function FiKey (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"}}]})(props);
};
function FiLayers (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 2 7 12 12 22 7 12 2"}},{"tag":"polyline","attr":{"points":"2 17 12 22 22 17"}},{"tag":"polyline","attr":{"points":"2 12 12 17 22 12"}}]})(props);
};
function FiLayout (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"3","y1":"9","x2":"21","y2":"9"}},{"tag":"line","attr":{"x1":"9","y1":"21","x2":"9","y2":"9"}}]})(props);
};
function FiLifeBuoy (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"line","attr":{"x1":"4.93","y1":"4.93","x2":"9.17","y2":"9.17"}},{"tag":"line","attr":{"x1":"14.83","y1":"14.83","x2":"19.07","y2":"19.07"}},{"tag":"line","attr":{"x1":"14.83","y1":"9.17","x2":"19.07","y2":"4.93"}},{"tag":"line","attr":{"x1":"14.83","y1":"9.17","x2":"18.36","y2":"5.64"}},{"tag":"line","attr":{"x1":"4.93","y1":"19.07","x2":"9.17","y2":"14.83"}}]})(props);
};
function FiLink2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiLink (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}},{"tag":"path","attr":{"d":"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}}]})(props);
};
function FiLinkedin (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}},{"tag":"rect","attr":{"x":"2","y":"9","width":"4","height":"12"}},{"tag":"circle","attr":{"cx":"4","cy":"4","r":"2"}}]})(props);
};
function FiList (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"8","y1":"6","x2":"21","y2":"6"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"21","y2":"12"}},{"tag":"line","attr":{"x1":"8","y1":"18","x2":"21","y2":"18"}},{"tag":"line","attr":{"x1":"3","y1":"6","x2":"3.01","y2":"6"}},{"tag":"line","attr":{"x1":"3","y1":"12","x2":"3.01","y2":"12"}},{"tag":"line","attr":{"x1":"3","y1":"18","x2":"3.01","y2":"18"}}]})(props);
};
function FiLoader (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"6"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12","y2":"22"}},{"tag":"line","attr":{"x1":"4.93","y1":"4.93","x2":"7.76","y2":"7.76"}},{"tag":"line","attr":{"x1":"16.24","y1":"16.24","x2":"19.07","y2":"19.07"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"6","y2":"12"}},{"tag":"line","attr":{"x1":"18","y1":"12","x2":"22","y2":"12"}},{"tag":"line","attr":{"x1":"4.93","y1":"19.07","x2":"7.76","y2":"16.24"}},{"tag":"line","attr":{"x1":"16.24","y1":"7.76","x2":"19.07","y2":"4.93"}}]})(props);
};
function FiLock (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M7 11V7a5 5 0 0 1 10 0v4"}}]})(props);
};
function FiLogIn (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}},{"tag":"polyline","attr":{"points":"10 17 15 12 10 7"}},{"tag":"line","attr":{"x1":"15","y1":"12","x2":"3","y2":"12"}}]})(props);
};
function FiLogOut (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}},{"tag":"polyline","attr":{"points":"16 17 21 12 16 7"}},{"tag":"line","attr":{"x1":"21","y1":"12","x2":"9","y2":"12"}}]})(props);
};
function FiMail (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}},{"tag":"polyline","attr":{"points":"22,6 12,13 2,6"}}]})(props);
};
function FiMapPin (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}},{"tag":"circle","attr":{"cx":"12","cy":"10","r":"3"}}]})(props);
};
function FiMap (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"}},{"tag":"line","attr":{"x1":"8","y1":"2","x2":"8","y2":"18"}},{"tag":"line","attr":{"x1":"16","y1":"6","x2":"16","y2":"22"}}]})(props);
};
function FiMaximize2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 3 21 3 21 9"}},{"tag":"polyline","attr":{"points":"9 21 3 21 3 15"}},{"tag":"line","attr":{"x1":"21","y1":"3","x2":"14","y2":"10"}},{"tag":"line","attr":{"x1":"3","y1":"21","x2":"10","y2":"14"}}]})(props);
};
function FiMaximize (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"}}]})(props);
};
function FiMeh (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"8","y1":"15","x2":"16","y2":"15"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"9.01","y2":"9"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"15.01","y2":"9"}}]})(props);
};
function FiMenu (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"3","y1":"12","x2":"21","y2":"12"}},{"tag":"line","attr":{"x1":"3","y1":"6","x2":"21","y2":"6"}},{"tag":"line","attr":{"x1":"3","y1":"18","x2":"21","y2":"18"}}]})(props);
};
function FiMessageCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"}}]})(props);
};
function FiMessageSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}}]})(props);
};
function FiMicOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}},{"tag":"path","attr":{"d":"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"}},{"tag":"path","attr":{"d":"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"}},{"tag":"line","attr":{"x1":"12","y1":"19","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"8","y1":"23","x2":"16","y2":"23"}}]})(props);
};
function FiMic (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}},{"tag":"path","attr":{"d":"M19 10v2a7 7 0 0 1-14 0v-2"}},{"tag":"line","attr":{"x1":"12","y1":"19","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"8","y1":"23","x2":"16","y2":"23"}}]})(props);
};
function FiMinimize2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"4 14 10 14 10 20"}},{"tag":"polyline","attr":{"points":"20 10 14 10 14 4"}},{"tag":"line","attr":{"x1":"14","y1":"10","x2":"21","y2":"3"}},{"tag":"line","attr":{"x1":"3","y1":"21","x2":"10","y2":"14"}}]})(props);
};
function FiMinimize (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"}}]})(props);
};
function FiMinusCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiMinusSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiMinus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}}]})(props);
};
function FiMonitor (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"3","width":"20","height":"14","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"8","y1":"21","x2":"16","y2":"21"}},{"tag":"line","attr":{"x1":"12","y1":"17","x2":"12","y2":"21"}}]})(props);
};
function FiMoon (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}}]})(props);
};
function FiMoreHorizontal (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"1"}},{"tag":"circle","attr":{"cx":"19","cy":"12","r":"1"}},{"tag":"circle","attr":{"cx":"5","cy":"12","r":"1"}}]})(props);
};
function FiMoreVertical (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"1"}},{"tag":"circle","attr":{"cx":"12","cy":"5","r":"1"}},{"tag":"circle","attr":{"cx":"12","cy":"19","r":"1"}}]})(props);
};
function FiMousePointer (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"}},{"tag":"path","attr":{"d":"M13 13l6 6"}}]})(props);
};
function FiMove (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"5 9 2 12 5 15"}},{"tag":"polyline","attr":{"points":"9 5 12 2 15 5"}},{"tag":"polyline","attr":{"points":"15 19 12 22 9 19"}},{"tag":"polyline","attr":{"points":"19 9 22 12 19 15"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"22","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"22"}}]})(props);
};
function FiMusic (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9 18V5l12-2v13"}},{"tag":"circle","attr":{"cx":"6","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"18","cy":"16","r":"3"}}]})(props);
};
function FiNavigation2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 19 21 12 17 5 21 12 2"}}]})(props);
};
function FiNavigation (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"3 11 22 2 13 21 11 13 3 11"}}]})(props);
};
function FiOctagon (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}}]})(props);
};
function FiPackage (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"16.5","y1":"9.4","x2":"7.5","y2":"4.21"}},{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}},{"tag":"polyline","attr":{"points":"3.27 6.96 12 12.01 20.73 6.96"}},{"tag":"line","attr":{"x1":"12","y1":"22.08","x2":"12","y2":"12"}}]})(props);
};
function FiPaperclip (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"}}]})(props);
};
function FiPauseCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"10","y1":"15","x2":"10","y2":"9"}},{"tag":"line","attr":{"x1":"14","y1":"15","x2":"14","y2":"9"}}]})(props);
};
function FiPause (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"6","y":"4","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"14","y":"4","width":"4","height":"16"}}]})(props);
};
function FiPenTool (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 19l7-7 3 3-7 7-3-3z"}},{"tag":"path","attr":{"d":"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"}},{"tag":"path","attr":{"d":"M2 2l7.586 7.586"}},{"tag":"circle","attr":{"cx":"11","cy":"11","r":"2"}}]})(props);
};
function FiPercent (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"19","y1":"5","x2":"5","y2":"19"}},{"tag":"circle","attr":{"cx":"6.5","cy":"6.5","r":"2.5"}},{"tag":"circle","attr":{"cx":"17.5","cy":"17.5","r":"2.5"}}]})(props);
};
function FiPhoneCall (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneForwarded (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"19 1 23 5 19 9"}},{"tag":"line","attr":{"x1":"15","y1":"5","x2":"23","y2":"5"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneIncoming (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 2 16 8 22 8"}},{"tag":"line","attr":{"x1":"23","y1":"1","x2":"16","y2":"8"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneMissed (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"23","y1":"1","x2":"17","y2":"7"}},{"tag":"line","attr":{"x1":"17","y1":"1","x2":"23","y2":"7"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}},{"tag":"line","attr":{"x1":"23","y1":"1","x2":"1","y2":"23"}}]})(props);
};
function FiPhoneOutgoing (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 7 23 1 17 1"}},{"tag":"line","attr":{"x1":"16","y1":"8","x2":"23","y2":"1"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhone (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPieChart (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21.21 15.89A10 10 0 1 1 8 2.83"}},{"tag":"path","attr":{"d":"M22 12A10 10 0 0 0 12 2v10z"}}]})(props);
};
function FiPlayCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polygon","attr":{"points":"10 8 16 12 10 16 10 8"}}]})(props);
};
function FiPlay (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"5 3 19 12 5 21 5 3"}}]})(props);
};
function FiPlusCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiPlusSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiPlus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"5","x2":"12","y2":"19"}},{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}}]})(props);
};
function FiPocket (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"}},{"tag":"polyline","attr":{"points":"8 10 12 14 16 10"}}]})(props);
};
function FiPower (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18.36 6.64a9 9 0 1 1-12.73 0"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"12"}}]})(props);
};
function FiPrinter (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"6 9 6 2 18 2 18 9"}},{"tag":"path","attr":{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}},{"tag":"rect","attr":{"x":"6","y":"14","width":"12","height":"8"}}]})(props);
};
function FiRadio (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"2"}},{"tag":"path","attr":{"d":"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"}}]})(props);
};
function FiRefreshCcw (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"1 4 1 10 7 10"}},{"tag":"polyline","attr":{"points":"23 20 23 14 17 14"}},{"tag":"path","attr":{"d":"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"}}]})(props);
};
function FiRefreshCw (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 4 23 10 17 10"}},{"tag":"polyline","attr":{"points":"1 20 1 14 7 14"}},{"tag":"path","attr":{"d":"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"}}]})(props);
};
function FiRepeat (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"17 1 21 5 17 9"}},{"tag":"path","attr":{"d":"M3 11V9a4 4 0 0 1 4-4h14"}},{"tag":"polyline","attr":{"points":"7 23 3 19 7 15"}},{"tag":"path","attr":{"d":"M21 13v2a4 4 0 0 1-4 4H3"}}]})(props);
};
function FiRewind (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 19 2 12 11 5 11 19"}},{"tag":"polygon","attr":{"points":"22 19 13 12 22 5 22 19"}}]})(props);
};
function FiRotateCcw (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"1 4 1 10 7 10"}},{"tag":"path","attr":{"d":"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"}}]})(props);
};
function FiRotateCw (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 4 23 10 17 10"}},{"tag":"path","attr":{"d":"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}}]})(props);
};
function FiRss (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 11a9 9 0 0 1 9 9"}},{"tag":"path","attr":{"d":"M4 4a16 16 0 0 1 16 16"}},{"tag":"circle","attr":{"cx":"5","cy":"19","r":"1"}}]})(props);
};
function FiSave (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}},{"tag":"polyline","attr":{"points":"17 21 17 13 7 13 7 21"}},{"tag":"polyline","attr":{"points":"7 3 7 8 15 8"}}]})(props);
};
function FiScissors (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"6","cy":"6","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"18","r":"3"}},{"tag":"line","attr":{"x1":"20","y1":"4","x2":"8.12","y2":"15.88"}},{"tag":"line","attr":{"x1":"14.47","y1":"14.48","x2":"20","y2":"20"}},{"tag":"line","attr":{"x1":"8.12","y1":"8.12","x2":"12","y2":"12"}}]})(props);
};
function FiSearch (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}]})(props);
};
function FiSend (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"22","y1":"2","x2":"11","y2":"13"}},{"tag":"polygon","attr":{"points":"22 2 15 22 11 13 2 9 22 2"}}]})(props);
};
function FiServer (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"2","width":"20","height":"8","rx":"2","ry":"2"}},{"tag":"rect","attr":{"x":"2","y":"14","width":"20","height":"8","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"6","y1":"6","x2":"6.01","y2":"6"}},{"tag":"line","attr":{"x1":"6","y1":"18","x2":"6.01","y2":"18"}}]})(props);
};
function FiSettings (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"3"}},{"tag":"path","attr":{"d":"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"}}]})(props);
};
function FiShare2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"18","cy":"5","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"12","r":"3"}},{"tag":"circle","attr":{"cx":"18","cy":"19","r":"3"}},{"tag":"line","attr":{"x1":"8.59","y1":"13.51","x2":"15.42","y2":"17.49"}},{"tag":"line","attr":{"x1":"15.41","y1":"6.51","x2":"8.59","y2":"10.49"}}]})(props);
};
function FiShare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}},{"tag":"polyline","attr":{"points":"16 6 12 2 8 6"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"15"}}]})(props);
};
function FiShieldOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"}},{"tag":"path","attr":{"d":"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiShield (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}}]})(props);
};
function FiShoppingBag (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}},{"tag":"line","attr":{"x1":"3","y1":"6","x2":"21","y2":"6"}},{"tag":"path","attr":{"d":"M16 10a4 4 0 0 1-8 0"}}]})(props);
};
function FiShoppingCart (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"9","cy":"21","r":"1"}},{"tag":"circle","attr":{"cx":"20","cy":"21","r":"1"}},{"tag":"path","attr":{"d":"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"}}]})(props);
};
function FiShuffle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 3 21 3 21 8"}},{"tag":"line","attr":{"x1":"4","y1":"20","x2":"21","y2":"3"}},{"tag":"polyline","attr":{"points":"21 16 21 21 16 21"}},{"tag":"line","attr":{"x1":"15","y1":"15","x2":"21","y2":"21"}},{"tag":"line","attr":{"x1":"4","y1":"4","x2":"9","y2":"9"}}]})(props);
};
function FiSidebar (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"9","y1":"3","x2":"9","y2":"21"}}]})(props);
};
function FiSkipBack (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"19 20 9 12 19 4 19 20"}},{"tag":"line","attr":{"x1":"5","y1":"19","x2":"5","y2":"5"}}]})(props);
};
function FiSkipForward (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"5 4 15 12 5 20 5 4"}},{"tag":"line","attr":{"x1":"19","y1":"5","x2":"19","y2":"19"}}]})(props);
};
function FiSlack (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"}},{"tag":"path","attr":{"d":"M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"}},{"tag":"path","attr":{"d":"M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"}},{"tag":"path","attr":{"d":"M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"}},{"tag":"path","attr":{"d":"M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"}},{"tag":"path","attr":{"d":"M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"}},{"tag":"path","attr":{"d":"M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"}},{"tag":"path","attr":{"d":"M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"}}]})(props);
};
function FiSlash (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"4.93","y1":"4.93","x2":"19.07","y2":"19.07"}}]})(props);
};
function FiSliders (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"4","y1":"21","x2":"4","y2":"14"}},{"tag":"line","attr":{"x1":"4","y1":"10","x2":"4","y2":"3"}},{"tag":"line","attr":{"x1":"12","y1":"21","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"3"}},{"tag":"line","attr":{"x1":"20","y1":"21","x2":"20","y2":"16"}},{"tag":"line","attr":{"x1":"20","y1":"12","x2":"20","y2":"3"}},{"tag":"line","attr":{"x1":"1","y1":"14","x2":"7","y2":"14"}},{"tag":"line","attr":{"x1":"9","y1":"8","x2":"15","y2":"8"}},{"tag":"line","attr":{"x1":"17","y1":"16","x2":"23","y2":"16"}}]})(props);
};
function FiSmartphone (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"5","y":"2","width":"14","height":"20","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12.01","y2":"18"}}]})(props);
};
function FiSmile (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M8 14s1.5 2 4 2 4-2 4-2"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"9.01","y2":"9"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"15.01","y2":"9"}}]})(props);
};
function FiSpeaker (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2"}},{"tag":"circle","attr":{"cx":"12","cy":"14","r":"4"}},{"tag":"line","attr":{"x1":"12","y1":"6","x2":"12.01","y2":"6"}}]})(props);
};
function FiSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}]})(props);
};
function FiStar (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}}]})(props);
};
function FiStopCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"rect","attr":{"x":"9","y":"9","width":"6","height":"6"}}]})(props);
};
function FiSun (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"5"}},{"tag":"line","attr":{"x1":"12","y1":"1","x2":"12","y2":"3"}},{"tag":"line","attr":{"x1":"12","y1":"21","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"4.22","y1":"4.22","x2":"5.64","y2":"5.64"}},{"tag":"line","attr":{"x1":"18.36","y1":"18.36","x2":"19.78","y2":"19.78"}},{"tag":"line","attr":{"x1":"1","y1":"12","x2":"3","y2":"12"}},{"tag":"line","attr":{"x1":"21","y1":"12","x2":"23","y2":"12"}},{"tag":"line","attr":{"x1":"4.22","y1":"19.78","x2":"5.64","y2":"18.36"}},{"tag":"line","attr":{"x1":"18.36","y1":"5.64","x2":"19.78","y2":"4.22"}}]})(props);
};
function FiSunrise (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 18a5 5 0 0 0-10 0"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"9"}},{"tag":"line","attr":{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}},{"tag":"line","attr":{"x1":"1","y1":"18","x2":"3","y2":"18"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"23","y2":"18"}},{"tag":"line","attr":{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}},{"tag":"line","attr":{"x1":"23","y1":"22","x2":"1","y2":"22"}},{"tag":"polyline","attr":{"points":"8 6 12 2 16 6"}}]})(props);
};
function FiSunset (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 18a5 5 0 0 0-10 0"}},{"tag":"line","attr":{"x1":"12","y1":"9","x2":"12","y2":"2"}},{"tag":"line","attr":{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}},{"tag":"line","attr":{"x1":"1","y1":"18","x2":"3","y2":"18"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"23","y2":"18"}},{"tag":"line","attr":{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}},{"tag":"line","attr":{"x1":"23","y1":"22","x2":"1","y2":"22"}},{"tag":"polyline","attr":{"points":"16 5 12 9 8 5"}}]})(props);
};
function FiTablet (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12.01","y2":"18"}}]})(props);
};
function FiTag (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}},{"tag":"line","attr":{"x1":"7","y1":"7","x2":"7.01","y2":"7"}}]})(props);
};
function FiTarget (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"6"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"2"}}]})(props);
};
function FiTerminal (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"4 17 10 11 4 5"}},{"tag":"line","attr":{"x1":"12","y1":"19","x2":"20","y2":"19"}}]})(props);
};
function FiThermometer (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"}}]})(props);
};
function FiThumbsDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"}}]})(props);
};
function FiThumbsUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"}}]})(props);
};
function FiToggleLeft (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}},{"tag":"circle","attr":{"cx":"8","cy":"12","r":"3"}}]})(props);
};
function FiToggleRight (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}},{"tag":"circle","attr":{"cx":"16","cy":"12","r":"3"}}]})(props);
};
function FiTool (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}}]})(props);
};
function FiTrash2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"3 6 5 6 21 6"}},{"tag":"path","attr":{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}},{"tag":"line","attr":{"x1":"10","y1":"11","x2":"10","y2":"17"}},{"tag":"line","attr":{"x1":"14","y1":"11","x2":"14","y2":"17"}}]})(props);
};
function FiTrash (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"3 6 5 6 21 6"}},{"tag":"path","attr":{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}}]})(props);
};
function FiTrello (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"rect","attr":{"x":"7","y":"7","width":"3","height":"9"}},{"tag":"rect","attr":{"x":"14","y":"7","width":"3","height":"5"}}]})(props);
};
function FiTrendingDown (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 18 13.5 8.5 8.5 13.5 1 6"}},{"tag":"polyline","attr":{"points":"17 18 23 18 23 12"}}]})(props);
};
function FiTrendingUp (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 6 13.5 15.5 8.5 10.5 1 18"}},{"tag":"polyline","attr":{"points":"17 6 23 6 23 12"}}]})(props);
};
function FiTriangle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}}]})(props);
};
function FiTruck (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"3","width":"15","height":"13"}},{"tag":"polygon","attr":{"points":"16 8 20 8 23 11 23 16 16 16 16 8"}},{"tag":"circle","attr":{"cx":"5.5","cy":"18.5","r":"2.5"}},{"tag":"circle","attr":{"cx":"18.5","cy":"18.5","r":"2.5"}}]})(props);
};
function FiTv (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"7","width":"20","height":"15","rx":"2","ry":"2"}},{"tag":"polyline","attr":{"points":"17 2 12 7 7 2"}}]})(props);
};
function FiTwitch (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"}}]})(props);
};
function FiTwitter (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}}]})(props);
};
function FiType (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"4 7 4 4 20 4 20 7"}},{"tag":"line","attr":{"x1":"9","y1":"20","x2":"15","y2":"20"}},{"tag":"line","attr":{"x1":"12","y1":"4","x2":"12","y2":"20"}}]})(props);
};
function FiUmbrella (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"}}]})(props);
};
function FiUnderline (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"}},{"tag":"line","attr":{"x1":"4","y1":"21","x2":"20","y2":"21"}}]})(props);
};
function FiUnlock (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M7 11V7a5 5 0 0 1 9.9-1"}}]})(props);
};
function FiUploadCloud (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 16 12 12 8 16"}},{"tag":"line","attr":{"x1":"12","y1":"12","x2":"12","y2":"21"}},{"tag":"path","attr":{"d":"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"}},{"tag":"polyline","attr":{"points":"16 16 12 12 8 16"}}]})(props);
};
function FiUpload (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}},{"tag":"polyline","attr":{"points":"17 8 12 3 7 8"}},{"tag":"line","attr":{"x1":"12","y1":"3","x2":"12","y2":"15"}}]})(props);
};
function FiUserCheck (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"polyline","attr":{"points":"17 11 19 13 23 9"}}]})(props);
};
function FiUserMinus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"line","attr":{"x1":"23","y1":"11","x2":"17","y2":"11"}}]})(props);
};
function FiUserPlus (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"line","attr":{"x1":"20","y1":"8","x2":"20","y2":"14"}},{"tag":"line","attr":{"x1":"23","y1":"11","x2":"17","y2":"11"}}]})(props);
};
function FiUserX (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"line","attr":{"x1":"18","y1":"8","x2":"23","y2":"13"}},{"tag":"line","attr":{"x1":"23","y1":"8","x2":"18","y2":"13"}}]})(props);
};
function FiUser (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"12","cy":"7","r":"4"}}]})(props);
};
function FiUsers (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"9","cy":"7","r":"4"}},{"tag":"path","attr":{"d":"M23 21v-2a4 4 0 0 0-3-3.87"}},{"tag":"path","attr":{"d":"M16 3.13a4 4 0 0 1 0 7.75"}}]})(props);
};
function FiVideoOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiVideo (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"23 7 16 12 23 17 23 7"}},{"tag":"rect","attr":{"x":"1","y":"5","width":"15","height":"14","rx":"2","ry":"2"}}]})(props);
};
function FiVoicemail (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"5.5","cy":"11.5","r":"4.5"}},{"tag":"circle","attr":{"cx":"18.5","cy":"11.5","r":"4.5"}},{"tag":"line","attr":{"x1":"5.5","y1":"16","x2":"18.5","y2":"16"}}]})(props);
};
function FiVolume1 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"path","attr":{"d":"M15.54 8.46a5 5 0 0 1 0 7.07"}}]})(props);
};
function FiVolume2 (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"path","attr":{"d":"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"}}]})(props);
};
function FiVolumeX (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"line","attr":{"x1":"23","y1":"9","x2":"17","y2":"15"}},{"tag":"line","attr":{"x1":"17","y1":"9","x2":"23","y2":"15"}}]})(props);
};
function FiVolume (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}]})(props);
};
function FiWatch (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"7"}},{"tag":"polyline","attr":{"points":"12 9 12 12 13.5 13.5"}},{"tag":"path","attr":{"d":"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"}}]})(props);
};
function FiWifiOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}},{"tag":"path","attr":{"d":"M16.72 11.06A10.94 10.94 0 0 1 19 12.55"}},{"tag":"path","attr":{"d":"M5 12.55a10.94 10.94 0 0 1 5.17-2.39"}},{"tag":"path","attr":{"d":"M10.71 5.05A16 16 0 0 1 22.58 9"}},{"tag":"path","attr":{"d":"M1.42 9a15.91 15.91 0 0 1 4.7-2.88"}},{"tag":"path","attr":{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}},{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12.01","y2":"20"}}]})(props);
};
function FiWifi (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 12.55a11 11 0 0 1 14.08 0"}},{"tag":"path","attr":{"d":"M1.42 9a16 16 0 0 1 21.16 0"}},{"tag":"path","attr":{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}},{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12.01","y2":"20"}}]})(props);
};
function FiWind (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"}}]})(props);
};
function FiXCircle (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"9","y2":"15"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"15","y2":"15"}}]})(props);
};
function FiXOctagon (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"9","y2":"15"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"15","y2":"15"}}]})(props);
};
function FiXSquare (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"15","y2":"15"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"9","y2":"15"}}]})(props);
};
function FiX (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"18","y1":"6","x2":"6","y2":"18"}},{"tag":"line","attr":{"x1":"6","y1":"6","x2":"18","y2":"18"}}]})(props);
};
function FiYoutube (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"}},{"tag":"polygon","attr":{"points":"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"}}]})(props);
};
function FiZapOff (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"12.41 6.75 13 2 10.57 4.92"}},{"tag":"polyline","attr":{"points":"18.57 12.91 21 10 15.66 10"}},{"tag":"polyline","attr":{"points":"8 8 3 14 12 14 11 22 16 16"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiZap (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"13 2 3 14 12 14 11 22 21 10 12 10 13 2"}}]})(props);
};
function FiZoomIn (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}},{"tag":"line","attr":{"x1":"11","y1":"8","x2":"11","y2":"14"}},{"tag":"line","attr":{"x1":"8","y1":"11","x2":"14","y2":"11"}}]})(props);
};
function FiZoomOut (props) {
  return (0,_lib__WEBPACK_IMPORTED_MODULE_0__.GenIcon)({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}},{"tag":"line","attr":{"x1":"8","y1":"11","x2":"14","y2":"11"}}]})(props);
};


/***/ }),

/***/ "./node_modules/react-icons/lib/cjs/iconBase.js":
/*!******************************************************!*\
  !*** ./node_modules/react-icons/lib/cjs/iconBase.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IconBase = exports.GenIcon = void 0;
var React = __webpack_require__(/*! react */ "react");
var iconContext_1 = __webpack_require__(/*! ./iconContext */ "./node_modules/react-icons/lib/cjs/iconContext.js");
function Tree2Element(tree) {
    return tree && tree.map(function (node, i) { return React.createElement(node.tag, __assign({ key: i }, node.attr), Tree2Element(node.child)); });
}
function GenIcon(data) {
    return function (props) { return (React.createElement(IconBase, __assign({ attr: __assign({}, data.attr) }, props), Tree2Element(data.child))); };
}
exports.GenIcon = GenIcon;
function IconBase(props) {
    var elem = function (conf) {
        var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
        var computedSize = size || conf.size || "1em";
        var className;
        if (conf.className)
            className = conf.className;
        if (props.className)
            className = (className ? className + ' ' : '') + props.className;
        return (React.createElement("svg", __assign({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0" }, conf.attr, attr, svgProps, { className: className, style: __assign(__assign({ color: props.color || conf.color }, conf.style), props.style), height: computedSize, width: computedSize, xmlns: "http://www.w3.org/2000/svg" }),
            title && React.createElement("title", null, title),
            props.children));
    };
    return iconContext_1.IconContext !== undefined
        ? React.createElement(iconContext_1.IconContext.Consumer, null, function (conf) { return elem(conf); })
        : elem(iconContext_1.DefaultContext);
}
exports.IconBase = IconBase;


/***/ }),

/***/ "./node_modules/react-icons/lib/cjs/iconContext.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-icons/lib/cjs/iconContext.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IconContext = exports.DefaultContext = void 0;
var React = __webpack_require__(/*! react */ "react");
exports.DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined,
};
exports.IconContext = React.createContext && React.createContext(exports.DefaultContext);


/***/ }),

/***/ "./node_modules/react-icons/lib/cjs/iconsManifest.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-icons/lib/cjs/iconsManifest.js ***!
  \***********************************************************/
/***/ ((module) => {

module.exports.IconsManifest = [
  {
    "id": "fa",
    "name": "Font Awesome",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "io",
    "name": "Ionicons 4",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "io5",
    "name": "Ionicons 5",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "md",
    "name": "Material Design icons",
    "projectUrl": "http://google.github.io/material-design-icons/",
    "license": "Apache License Version 2.0",
    "licenseUrl": "https://github.com/google/material-design-icons/blob/master/LICENSE"
  },
  {
    "id": "ti",
    "name": "Typicons",
    "projectUrl": "http://s-ings.com/typicons/",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "id": "go",
    "name": "Github Octicons icons",
    "projectUrl": "https://octicons.github.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/primer/octicons/blob/master/LICENSE"
  },
  {
    "id": "fi",
    "name": "Feather",
    "projectUrl": "https://feathericons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/feathericons/feather/blob/master/LICENSE"
  },
  {
    "id": "gi",
    "name": "Game Icons",
    "projectUrl": "https://game-icons.net/",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
  },
  {
    "id": "wi",
    "name": "Weather Icons",
    "projectUrl": "https://erikflowers.github.io/weather-icons/",
    "license": "SIL OFL 1.1",
    "licenseUrl": "http://scripts.sil.org/OFL"
  },
  {
    "id": "di",
    "name": "Devicons",
    "projectUrl": "https://vorillaz.github.io/devicons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ai",
    "name": "Ant Design Icons",
    "projectUrl": "https://github.com/ant-design/ant-design-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "bs",
    "name": "Bootstrap Icons",
    "projectUrl": "https://github.com/twbs/icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ri",
    "name": "Remix Icon",
    "projectUrl": "https://github.com/Remix-Design/RemixIcon",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "fc",
    "name": "Flat Color Icons",
    "projectUrl": "https://github.com/icons8/flat-color-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "gr",
    "name": "Grommet-Icons",
    "projectUrl": "https://github.com/grommet/grommet-icons",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "hi",
    "name": "Heroicons",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "si",
    "name": "Simple Icons",
    "projectUrl": "https://simpleicons.org/",
    "license": "CC0 1.0 Universal",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    "id": "im",
    "name": "IcoMoon Free",
    "projectUrl": "https://github.com/Keyamoon/IcoMoon-Free",
    "license": "CC BY 4.0 License"
  },
  {
    "id": "bi",
    "name": "BoxIcons",
    "projectUrl": "https://github.com/atisawd/boxicons",
    "license": "CC BY 4.0 License"
  },
  {
    "id": "cg",
    "name": "css.gg",
    "projectUrl": "https://github.com/astrit/css.gg",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "vsc",
    "name": "VS Code Icons",
    "projectUrl": "https://github.com/microsoft/vscode-codicons",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  }
]

/***/ }),

/***/ "./node_modules/react-icons/lib/cjs/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-icons/lib/cjs/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./iconsManifest */ "./node_modules/react-icons/lib/cjs/iconsManifest.js"), exports);
__exportStar(__webpack_require__(/*! ./iconBase */ "./node_modules/react-icons/lib/cjs/iconBase.js"), exports);
__exportStar(__webpack_require__(/*! ./iconContext */ "./node_modules/react-icons/lib/cjs/iconContext.js"), exports);


/***/ }),

/***/ "aos":
/*!**********************!*\
  !*** external "aos" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("aos");

/***/ }),

/***/ "../../../server/denormalize-page-path":
/*!************************************************************!*\
  !*** external "next/dist/server/denormalize-page-path.js" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ "../server/image-config":
/*!***************************************************!*\
  !*** external "next/dist/server/image-config.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ "../shared/lib/head":
/*!***********************************************!*\
  !*** external "next/dist/shared/lib/head.js" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ "../i18n/normalize-locale-path":
/*!*********************************************************************!*\
  !*** external "next/dist/shared/lib/i18n/normalize-locale-path.js" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ "../mitt":
/*!***********************************************!*\
  !*** external "next/dist/shared/lib/mitt.js" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ "../shared/lib/router-context":
/*!*********************************************************!*\
  !*** external "next/dist/shared/lib/router-context.js" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ "../shared/lib/router/utils/get-asset-path-from-route":
/*!*********************************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/get-asset-path-from-route.js" ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "./utils/is-dynamic":
/*!******************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/is-dynamic.js" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ "./utils/parse-relative-url":
/*!**************************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/parse-relative-url.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ "./utils/querystring":
/*!*******************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/querystring.js" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ "./utils/route-matcher":
/*!*********************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/route-matcher.js" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ "./utils/route-regex":
/*!*******************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/route-regex.js" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ "../shared/lib/to-base-64":
/*!*****************************************************!*\
  !*** external "next/dist/shared/lib/to-base-64.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-is");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "?5c99":
/*!******************************************!*\
  !*** ./utils/resolve-rewrites (ignored) ***!
  \******************************************/
/***/ (() => {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/index.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbEphO0FBQ2I7QUFDQTtBQUNBLG1DQUFtQyxvQ0FBb0MsZ0JBQWdCO0FBQ3ZGLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLG1CQUFPLENBQUMsNEVBQWlCO0FBQ3RDLGFBQWEsbUJBQU8sQ0FBQyxrRUFBWTtBQUNqQyxhQUFhLG1CQUFPLENBQUMsd0VBQWU7Ozs7Ozs7Ozs7OztBQ2RwQzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9pbWFnZS5qcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2xpbmsuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2guanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yb3V0ZS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLmpzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvd2l0aC1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3JvdXRlci5qcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWIvQnJlYWRjcnVtYkl0ZW0udHN4Iiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvQnJlYWRjcnVtYi9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvY29tcG9uZW50cy9Db250YWN0Rm9ybS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvY29tcG9uZW50cy9Gb3JtL0J1dHRvbi9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvY29tcG9uZW50cy9TRU8udHN4Iiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvVXRpbGl0aWVzL0NsaWNrYWJsZUxpc3QvTGlzdE9wdGlvbnMvaW5kZXgudHN4Iiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvVXRpbGl0aWVzL0NsaWNrYWJsZUxpc3QvaW5kZXgudHN4Iiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2xheW91dHMvRGVmYXVsdExheW91dC9jb21wb25lbnRzL0Zvb3Rlci9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvbGF5b3V0cy9EZWZhdWx0TGF5b3V0L2NvbXBvbmVudHMvTWVudS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvbGF5b3V0cy9EZWZhdWx0TGF5b3V0L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy9wYWdlcy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvdmlld3MvaG9tZS9jb21wb25lbnRzL0Jsb2cvUmVjb3Vyc2VDYXJkLnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvQmxvZy9SZWNvdXJzZUNhcmRMaXN0LnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvQmxvZy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvdmlld3MvaG9tZS9jb21wb25lbnRzL0Jsb2cvcmVjb3Vyc2VJdGVtcy50cyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvRXhwZXJ0aXNlQnJpbm92L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvSGVyby9pbmRleC50c3giLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvdmlld3MvaG9tZS9jb21wb25lbnRzL1N1Y2Nlc3NDYXNlcy9TdWNjZXNzQ2FzZXNEZXBvaW1lbnRzLnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvU3VjY2Vzc0Nhc2VzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy9jb21wb25lbnRzL0JyZWFkY3J1bWIvc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvQ29udGFjdEZvcm0vc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9CdXR0b24vc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvVXRpbGl0aWVzL0NsaWNrYWJsZUxpc3QvTGlzdE9wdGlvbnMvc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2NvbXBvbmVudHMvVXRpbGl0aWVzL0NsaWNrYWJsZUxpc3Qvc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL2xheW91dHMvRGVmYXVsdExheW91dC9jb21wb25lbnRzL0Zvb3Rlci9zdHlsZXMubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvbGF5b3V0cy9EZWZhdWx0TGF5b3V0L2NvbXBvbmVudHMvTWVudS9zdHlsZXMubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvbGF5b3V0cy9EZWZhdWx0TGF5b3V0L3N0eWxlcy5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvQmxvZy9SZWNvdXJzZUNhcmQubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvdmlld3MvaG9tZS9jb21wb25lbnRzL0Jsb2cvUmVjb3Vyc2VDYXJkTGlzdC5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL3NyYy92aWV3cy9ob21lL2NvbXBvbmVudHMvQmxvZy9zdHlsZXMubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvdmlld3MvaG9tZS9jb21wb25lbnRzL0V4cGVydGlzZUJyaW5vdi9zdHlsZXMubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9zcmMvdmlld3MvaG9tZS9jb21wb25lbnRzL0hlcm8vc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vc3JjL3ZpZXdzL2hvbWUvY29tcG9uZW50cy9TdWNjZXNzQ2FzZXMvc3R5bGVzLm1vZHVsZS5zY3NzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vbm9kZV9tb2R1bGVzL2Fvcy9kaXN0L2Fvcy5jc3MiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvbmV4dC9pbWFnZS5qcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL25vZGVfbW9kdWxlcy9uZXh0L2xpbmsuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvcmVhY3QtaWNvbnMvZmkvaW5kZXguZXNtLmpzIiwid2VicGFjazovL2JyaW5vdi1zaXRlLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWljb25zL2xpYi9janMvaWNvbkJhc2UuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvcmVhY3QtaWNvbnMvbGliL2Nqcy9pY29uQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS8uL25vZGVfbW9kdWxlcy9yZWFjdC1pY29ucy9saWIvY2pzL2ljb25zTWFuaWZlc3QuanMiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvLi9ub2RlX21vZHVsZXMvcmVhY3QtaWNvbnMvbGliL2Nqcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS9leHRlcm5hbCBcImFvc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanNcIiIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS9leHRlcm5hbCBcIm5leHQvZGlzdC9zZXJ2ZXIvaW1hZ2UtY29uZmlnLmpzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLmpzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aC5qc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvbWl0dC5qc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyLWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlLmpzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvaXMtZHluYW1pYy5qc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybC5qc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3F1ZXJ5c3RyaW5nLmpzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtbWF0Y2hlci5qc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLXJlZ2V4LmpzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi90by1iYXNlLTY0LmpzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwibmV4dC9oZWFkXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovL2JyaW5vdi1zaXRlL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS9leHRlcm5hbCBcInJlYWN0LWlzXCIiLCJ3ZWJwYWNrOi8vYnJpbm92LXNpdGUvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9icmlub3Ytc2l0ZS9pZ25vcmVkfEM6XFxVc2Vyc1xcYm9jc2dcXERlc2t0b3BcXHBvcnRcXG5vZGVfbW9kdWxlc1xcbmV4dFxcZGlzdFxcc2hhcmVkXFxsaWJcXHJvdXRlcnwuL3V0aWxzL3Jlc29sdmUtcmV3cml0ZXMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBJbWFnZTE7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF9oZWFkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9oZWFkXCIpKTtcbnZhciBfdG9CYXNlNjQgPSByZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi90by1iYXNlLTY0XCIpO1xudmFyIF9pbWFnZUNvbmZpZyA9IHJlcXVpcmUoXCIuLi9zZXJ2ZXIvaW1hZ2UtY29uZmlnXCIpO1xudmFyIF91c2VJbnRlcnNlY3Rpb24gPSByZXF1aXJlKFwiLi91c2UtaW50ZXJzZWN0aW9uXCIpO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uKHN5bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xuICAgIH07XG4gICAgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICAgIHZhciBrZXksIGk7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICAgIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHtcbiAgICB9O1xuICAgIHZhciB0YXJnZXQgPSB7XG4gICAgfTtcbiAgICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgdmFyIGtleSwgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmNvbnN0IGxvYWRlZEltYWdlVVJMcyA9IG5ldyBTZXQoKTtcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIGdsb2JhbC5fX05FWFRfSU1BR0VfSU1QT1JURUQgPSB0cnVlO1xufVxuY29uc3QgVkFMSURfTE9BRElOR19WQUxVRVMgPSBbXG4gICAgJ2xhenknLFxuICAgICdlYWdlcicsXG4gICAgdW5kZWZpbmVkXG5dO1xuY29uc3QgbG9hZGVycyA9IG5ldyBNYXAoW1xuICAgIFtcbiAgICAgICAgJ2RlZmF1bHQnLFxuICAgICAgICBkZWZhdWx0TG9hZGVyXG4gICAgXSxcbiAgICBbXG4gICAgICAgICdpbWdpeCcsXG4gICAgICAgIGltZ2l4TG9hZGVyXG4gICAgXSxcbiAgICBbXG4gICAgICAgICdjbG91ZGluYXJ5JyxcbiAgICAgICAgY2xvdWRpbmFyeUxvYWRlclxuICAgIF0sXG4gICAgW1xuICAgICAgICAnYWthbWFpJyxcbiAgICAgICAgYWthbWFpTG9hZGVyXG4gICAgXSxcbiAgICBbXG4gICAgICAgICdjdXN0b20nLFxuICAgICAgICBjdXN0b21Mb2FkZXJcbiAgICBdLCBcbl0pO1xuY29uc3QgVkFMSURfTEFZT1VUX1ZBTFVFUyA9IFtcbiAgICAnZmlsbCcsXG4gICAgJ2ZpeGVkJyxcbiAgICAnaW50cmluc2ljJyxcbiAgICAncmVzcG9uc2l2ZScsXG4gICAgdW5kZWZpbmVkLCBcbl07XG5mdW5jdGlvbiBpc1N0YXRpY1JlcXVpcmUoc3JjKSB7XG4gICAgcmV0dXJuIHNyYy5kZWZhdWx0ICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc1N0YXRpY0ltYWdlRGF0YShzcmMpIHtcbiAgICByZXR1cm4gc3JjLnNyYyAhPT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gaXNTdGF0aWNJbXBvcnQoc3JjKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzcmMgPT09ICdvYmplY3QnICYmIChpc1N0YXRpY1JlcXVpcmUoc3JjKSB8fCBpc1N0YXRpY0ltYWdlRGF0YShzcmMpKTtcbn1cbmNvbnN0IHsgZGV2aWNlU2l6ZXM6IGNvbmZpZ0RldmljZVNpemVzICwgaW1hZ2VTaXplczogY29uZmlnSW1hZ2VTaXplcyAsIGxvYWRlcjogY29uZmlnTG9hZGVyICwgcGF0aDogY29uZmlnUGF0aCAsIGRvbWFpbnM6IGNvbmZpZ0RvbWFpbnMgLCAgfSA9IHByb2Nlc3MuZW52Ll9fTkVYVF9JTUFHRV9PUFRTIHx8IF9pbWFnZUNvbmZpZy5pbWFnZUNvbmZpZ0RlZmF1bHQ7XG4vLyBzb3J0IHNtYWxsZXN0IHRvIGxhcmdlc3RcbmNvbnN0IGFsbFNpemVzID0gW1xuICAgIC4uLmNvbmZpZ0RldmljZVNpemVzLFxuICAgIC4uLmNvbmZpZ0ltYWdlU2l6ZXNcbl07XG5jb25maWdEZXZpY2VTaXplcy5zb3J0KChhLCBiKT0+YSAtIGJcbik7XG5hbGxTaXplcy5zb3J0KChhLCBiKT0+YSAtIGJcbik7XG5mdW5jdGlvbiBnZXRXaWR0aHMod2lkdGgsIGxheW91dCwgc2l6ZXMpIHtcbiAgICBpZiAoc2l6ZXMgJiYgKGxheW91dCA9PT0gJ2ZpbGwnIHx8IGxheW91dCA9PT0gJ3Jlc3BvbnNpdmUnKSkge1xuICAgICAgICAvLyBGaW5kIGFsbCB0aGUgXCJ2d1wiIHBlcmNlbnQgc2l6ZXMgdXNlZCBpbiB0aGUgc2l6ZXMgcHJvcFxuICAgICAgICBjb25zdCB2aWV3cG9ydFdpZHRoUmUgPSAvKF58XFxzKSgxP1xcZD9cXGQpdncvZztcbiAgICAgICAgY29uc3QgcGVyY2VudFNpemVzID0gW107XG4gICAgICAgIGZvcihsZXQgbWF0Y2g7IG1hdGNoID0gdmlld3BvcnRXaWR0aFJlLmV4ZWMoc2l6ZXMpOyBtYXRjaCl7XG4gICAgICAgICAgICBwZXJjZW50U2l6ZXMucHVzaChwYXJzZUludChtYXRjaFsyXSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwZXJjZW50U2l6ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBzbWFsbGVzdFJhdGlvID0gTWF0aC5taW4oLi4ucGVyY2VudFNpemVzKSAqIDAuMDE7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdpZHRoczogYWxsU2l6ZXMuZmlsdGVyKChzKT0+cyA+PSBjb25maWdEZXZpY2VTaXplc1swXSAqIHNtYWxsZXN0UmF0aW9cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGtpbmQ6ICd3J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGhzOiBhbGxTaXplcyxcbiAgICAgICAgICAgIGtpbmQ6ICd3J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpZHRoICE9PSAnbnVtYmVyJyB8fCBsYXlvdXQgPT09ICdmaWxsJyB8fCBsYXlvdXQgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGhzOiBjb25maWdEZXZpY2VTaXplcyxcbiAgICAgICAgICAgIGtpbmQ6ICd3J1xuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB3aWR0aHMgPSBbXG4gICAgICAgIC4uLm5ldyBTZXQoLy8gPiBUaGlzIG1lYW5zIHRoYXQgbW9zdCBPTEVEIHNjcmVlbnMgdGhhdCBzYXkgdGhleSBhcmUgM3ggcmVzb2x1dGlvbixcbiAgICAgICAgLy8gPiBhcmUgYWN0dWFsbHkgM3ggaW4gdGhlIGdyZWVuIGNvbG9yLCBidXQgb25seSAxLjV4IGluIHRoZSByZWQgYW5kXG4gICAgICAgIC8vID4gYmx1ZSBjb2xvcnMuIFNob3dpbmcgYSAzeCByZXNvbHV0aW9uIGltYWdlIGluIHRoZSBhcHAgdnMgYSAyeFxuICAgICAgICAvLyA+IHJlc29sdXRpb24gaW1hZ2Ugd2lsbCBiZSB2aXN1YWxseSB0aGUgc2FtZSwgdGhvdWdoIHRoZSAzeCBpbWFnZVxuICAgICAgICAvLyA+IHRha2VzIHNpZ25pZmljYW50bHkgbW9yZSBkYXRhLiBFdmVuIHRydWUgM3ggcmVzb2x1dGlvbiBzY3JlZW5zIGFyZVxuICAgICAgICAvLyA+IHdhc3RlZnVsIGFzIHRoZSBodW1hbiBleWUgY2Fubm90IHNlZSB0aGF0IGxldmVsIG9mIGRldGFpbCB3aXRob3V0XG4gICAgICAgIC8vID4gc29tZXRoaW5nIGxpa2UgYSBtYWduaWZ5aW5nIGdsYXNzLlxuICAgICAgICAvLyBodHRwczovL2Jsb2cudHdpdHRlci5jb20vZW5naW5lZXJpbmcvZW5fdXMvdG9waWNzL2luZnJhc3RydWN0dXJlLzIwMTkvY2FwcGluZy1pbWFnZS1maWRlbGl0eS1vbi11bHRyYS1oaWdoLXJlc29sdXRpb24tZGV2aWNlcy5odG1sXG4gICAgICAgIFtcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgd2lkdGggKiAyIC8qLCB3aWR0aCAqIDMqLyBcbiAgICAgICAgXS5tYXAoKHcpPT5hbGxTaXplcy5maW5kKChwKT0+cCA+PSB3XG4gICAgICAgICAgICApIHx8IGFsbFNpemVzW2FsbFNpemVzLmxlbmd0aCAtIDFdXG4gICAgICAgICkpLCBcbiAgICBdO1xuICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRocyxcbiAgICAgICAga2luZDogJ3gnXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlSW1nQXR0cnMoeyBzcmMgLCB1bm9wdGltaXplZCAsIGxheW91dCAsIHdpZHRoICwgcXVhbGl0eSAsIHNpemVzICwgbG9hZGVyICB9KSB7XG4gICAgaWYgKHVub3B0aW1pemVkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICBzcmNTZXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNpemVzOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgeyB3aWR0aHMgLCBraW5kICB9ID0gZ2V0V2lkdGhzKHdpZHRoLCBsYXlvdXQsIHNpemVzKTtcbiAgICBjb25zdCBsYXN0ID0gd2lkdGhzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2l6ZXM6ICFzaXplcyAmJiBraW5kID09PSAndycgPyAnMTAwdncnIDogc2l6ZXMsXG4gICAgICAgIHNyY1NldDogd2lkdGhzLm1hcCgodywgaSk9PmAke2xvYWRlcih7XG4gICAgICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgICAgIHF1YWxpdHksXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdcbiAgICAgICAgICAgIH0pfSAke2tpbmQgPT09ICd3JyA/IHcgOiBpICsgMX0ke2tpbmR9YFxuICAgICAgICApLmpvaW4oJywgJyksXG4gICAgICAgIC8vIEl0J3MgaW50ZW5kZWQgdG8ga2VlcCBgc3JjYCB0aGUgbGFzdCBhdHRyaWJ1dGUgYmVjYXVzZSBSZWFjdCB1cGRhdGVzXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMgaW4gb3JkZXIuIElmIHdlIGtlZXAgYHNyY2AgdGhlIGZpcnN0IG9uZSwgU2FmYXJpIHdpbGxcbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgc3RhcnQgdG8gZmV0Y2ggYHNyY2AsIGJlZm9yZSBgc2l6ZXNgIGFuZCBgc3JjU2V0YCBhcmUgZXZlblxuICAgICAgICAvLyB1cGRhdGVkIGJ5IFJlYWN0LiBUaGF0IGNhdXNlcyBtdWx0aXBsZSB1bm5lY2Vzc2FyeSByZXF1ZXN0cyBpZiBgc3JjU2V0YFxuICAgICAgICAvLyBhbmQgYHNpemVzYCBhcmUgZGVmaW5lZC5cbiAgICAgICAgLy8gVGhpcyBidWcgY2Fubm90IGJlIHJlcHJvZHVjZWQgaW4gQ2hyb21lIG9yIEZpcmVmb3guXG4gICAgICAgIHNyYzogbG9hZGVyKHtcbiAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgIHF1YWxpdHksXG4gICAgICAgICAgICB3aWR0aDogd2lkdGhzW2xhc3RdXG4gICAgICAgIH0pXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldEludCh4KSB7XG4gICAgaWYgKHR5cGVvZiB4ID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoeCwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZGVmYXVsdEltYWdlTG9hZGVyKGxvYWRlclByb3BzKSB7XG4gICAgY29uc3QgbG9hZCA9IGxvYWRlcnMuZ2V0KGNvbmZpZ0xvYWRlcik7XG4gICAgaWYgKGxvYWQpIHtcbiAgICAgICAgcmV0dXJuIGxvYWQoX29iamVjdFNwcmVhZCh7XG4gICAgICAgICAgICByb290OiBjb25maWdQYXRoXG4gICAgICAgIH0sIGxvYWRlclByb3BzKSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBcImxvYWRlclwiIGZvdW5kIGluIFwibmV4dC5jb25maWcuanNcIi4gRXhwZWN0ZWQ6ICR7X2ltYWdlQ29uZmlnLlZBTElEX0xPQURFUlMuam9pbignLCAnKX0uIFJlY2VpdmVkOiAke2NvbmZpZ0xvYWRlcn1gKTtcbn1cbi8vIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMzk3Nzc4MzMvMjY2NTM1IGZvciB3aHkgd2UgdXNlIHRoaXMgcmVmXG4vLyBoYW5kbGVyIGluc3RlYWQgb2YgdGhlIGltZydzIG9uTG9hZCBhdHRyaWJ1dGUuXG5mdW5jdGlvbiBoYW5kbGVMb2FkaW5nKGltZywgc3JjLCBsYXlvdXQsIHBsYWNlaG9sZGVyLCBvbkxvYWRpbmdDb21wbGV0ZSkge1xuICAgIGlmICghaW1nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGFuZGxlTG9hZCA9ICgpPT57XG4gICAgICAgIGlmICghaW1nLnNyYy5zdGFydHNXaXRoKCdkYXRhOicpKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gJ2RlY29kZScgaW4gaW1nID8gaW1nLmRlY29kZSgpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICBwLmNhdGNoKCgpPT57XG4gICAgICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09PSAnYmx1cicpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmZpbHRlciA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2FkZWRJbWFnZVVSTHMuYWRkKHNyYyk7XG4gICAgICAgICAgICAgICAgaWYgKG9uTG9hZGluZ0NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbmF0dXJhbFdpZHRoICwgbmF0dXJhbEhlaWdodCAgfSA9IGltZztcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyBiYWNrIHJlYWQtb25seSBwcmltaXRpdmUgdmFsdWVzIGJ1dCBub3QgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuZGVybHlpbmcgRE9NIGVsZW1lbnQgYmVjYXVzZSBpdCBjb3VsZCBiZSBtaXN1c2VkLlxuICAgICAgICAgICAgICAgICAgICBvbkxvYWRpbmdDb21wbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXR1cmFsV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXR1cmFsSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHJlZiA9IGltZy5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZi5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBnZXRDb21wdXRlZFN0eWxlKGltZy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxheW91dCA9PT0gJ3Jlc3BvbnNpdmUnICYmIHBhcmVudC5kaXNwbGF5ID09PSAnZmxleCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgbWF5IG5vdCByZW5kZXIgcHJvcGVybHkgYXMgYSBjaGlsZCBvZiBhIGZsZXggY29udGFpbmVyLiBDb25zaWRlciB3cmFwcGluZyB0aGUgaW1hZ2Ugd2l0aCBhIGRpdiB0byBjb25maWd1cmUgdGhlIHdpZHRoLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdmaWxsJyAmJiBwYXJlbnQucG9zaXRpb24gIT09ICdyZWxhdGl2ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgbWF5IG5vdCByZW5kZXIgcHJvcGVybHkgd2l0aCBhIHBhcmVudCB1c2luZyBwb3NpdGlvbjpcIiR7cGFyZW50LnBvc2l0aW9ufVwiLiBDb25zaWRlciBjaGFuZ2luZyB0aGUgcGFyZW50IHN0eWxlIHRvIHBvc2l0aW9uOlwicmVsYXRpdmVcIiB3aXRoIGEgd2lkdGggYW5kIGhlaWdodC5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoaW1nLmNvbXBsZXRlKSB7XG4gICAgICAgIC8vIElmIHRoZSByZWFsIGltYWdlIGZhaWxzIHRvIGxvYWQsIHRoaXMgd2lsbCBzdGlsbCByZW1vdmUgdGhlIHBsYWNlaG9sZGVyLlxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBkZXNpcmVkIGJlaGF2aW9yIGZvciBub3csIGFuZCB3aWxsIGJlIHJldmlzaXRlZCB3aGVuIGVycm9yXG4gICAgICAgIC8vIGhhbmRsaW5nIGlzIHdvcmtlZCBvbiBmb3IgdGhlIGltYWdlIGNvbXBvbmVudCBpdHNlbGYuXG4gICAgICAgIGhhbmRsZUxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbWcub25sb2FkID0gaGFuZGxlTG9hZDtcbiAgICB9XG59XG5mdW5jdGlvbiBJbWFnZTEoX3BhcmFtKSB7XG4gICAgdmFyIHsgc3JjICwgc2l6ZXMgLCB1bm9wdGltaXplZCA9ZmFsc2UgLCBwcmlvcml0eSA9ZmFsc2UgLCBsb2FkaW5nICwgbGF6eUJvdW5kYXJ5ID0nMjAwcHgnICwgY2xhc3NOYW1lICwgcXVhbGl0eSAsIHdpZHRoICwgaGVpZ2h0ICwgb2JqZWN0Rml0ICwgb2JqZWN0UG9zaXRpb24gLCBvbkxvYWRpbmdDb21wbGV0ZSAsIGxvYWRlciA9ZGVmYXVsdEltYWdlTG9hZGVyICwgcGxhY2Vob2xkZXIgPSdlbXB0eScgLCBibHVyRGF0YVVSTCAgfSA9IF9wYXJhbSwgYWxsID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wYXJhbSwgW1wic3JjXCIsIFwic2l6ZXNcIiwgXCJ1bm9wdGltaXplZFwiLCBcInByaW9yaXR5XCIsIFwibG9hZGluZ1wiLCBcImxhenlCb3VuZGFyeVwiLCBcImNsYXNzTmFtZVwiLCBcInF1YWxpdHlcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcIm9iamVjdEZpdFwiLCBcIm9iamVjdFBvc2l0aW9uXCIsIFwib25Mb2FkaW5nQ29tcGxldGVcIiwgXCJsb2FkZXJcIiwgXCJwbGFjZWhvbGRlclwiLCBcImJsdXJEYXRhVVJMXCJdKTtcbiAgICBsZXQgcmVzdCA9IGFsbDtcbiAgICBsZXQgbGF5b3V0ID0gc2l6ZXMgPyAncmVzcG9uc2l2ZScgOiAnaW50cmluc2ljJztcbiAgICBpZiAoJ2xheW91dCcgaW4gcmVzdCkge1xuICAgICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IGxheW91dCBpZiB0aGUgdXNlciBzcGVjaWZpZWQgb25lOlxuICAgICAgICBpZiAocmVzdC5sYXlvdXQpIGxheW91dCA9IHJlc3QubGF5b3V0O1xuICAgICAgICAvLyBSZW1vdmUgcHJvcGVydHkgc28gaXQncyBub3Qgc3ByZWFkIGludG8gaW1hZ2U6XG4gICAgICAgIGRlbGV0ZSByZXN0WydsYXlvdXQnXTtcbiAgICB9XG4gICAgbGV0IHN0YXRpY1NyYyA9ICcnO1xuICAgIGlmIChpc1N0YXRpY0ltcG9ydChzcmMpKSB7XG4gICAgICAgIGNvbnN0IHN0YXRpY0ltYWdlRGF0YSA9IGlzU3RhdGljUmVxdWlyZShzcmMpID8gc3JjLmRlZmF1bHQgOiBzcmM7XG4gICAgICAgIGlmICghc3RhdGljSW1hZ2VEYXRhLnNyYykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbiBvYmplY3Qgc2hvdWxkIG9ubHkgYmUgcGFzc2VkIHRvIHRoZSBpbWFnZSBjb21wb25lbnQgc3JjIHBhcmFtZXRlciBpZiBpdCBjb21lcyBmcm9tIGEgc3RhdGljIGltYWdlIGltcG9ydC4gSXQgbXVzdCBpbmNsdWRlIHNyYy4gUmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShzdGF0aWNJbWFnZURhdGEpfWApO1xuICAgICAgICB9XG4gICAgICAgIGJsdXJEYXRhVVJMID0gYmx1ckRhdGFVUkwgfHwgc3RhdGljSW1hZ2VEYXRhLmJsdXJEYXRhVVJMO1xuICAgICAgICBzdGF0aWNTcmMgPSBzdGF0aWNJbWFnZURhdGEuc3JjO1xuICAgICAgICBpZiAoIWxheW91dCB8fCBsYXlvdXQgIT09ICdmaWxsJykge1xuICAgICAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IHN0YXRpY0ltYWdlRGF0YS5oZWlnaHQ7XG4gICAgICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IHN0YXRpY0ltYWdlRGF0YS53aWR0aDtcbiAgICAgICAgICAgIGlmICghc3RhdGljSW1hZ2VEYXRhLmhlaWdodCB8fCAhc3RhdGljSW1hZ2VEYXRhLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbiBvYmplY3Qgc2hvdWxkIG9ubHkgYmUgcGFzc2VkIHRvIHRoZSBpbWFnZSBjb21wb25lbnQgc3JjIHBhcmFtZXRlciBpZiBpdCBjb21lcyBmcm9tIGEgc3RhdGljIGltYWdlIGltcG9ydC4gSXQgbXVzdCBpbmNsdWRlIGhlaWdodCBhbmQgd2lkdGguIFJlY2VpdmVkICR7SlNPTi5zdHJpbmdpZnkoc3RhdGljSW1hZ2VEYXRhKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzcmMgPSB0eXBlb2Ygc3JjID09PSAnc3RyaW5nJyA/IHNyYyA6IHN0YXRpY1NyYztcbiAgICBjb25zdCB3aWR0aEludCA9IGdldEludCh3aWR0aCk7XG4gICAgY29uc3QgaGVpZ2h0SW50ID0gZ2V0SW50KGhlaWdodCk7XG4gICAgY29uc3QgcXVhbGl0eUludCA9IGdldEludChxdWFsaXR5KTtcbiAgICBsZXQgaXNMYXp5ID0gIXByaW9yaXR5ICYmIChsb2FkaW5nID09PSAnbGF6eScgfHwgdHlwZW9mIGxvYWRpbmcgPT09ICd1bmRlZmluZWQnKTtcbiAgICBpZiAoc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykgfHwgc3JjLnN0YXJ0c1dpdGgoJ2Jsb2I6JykpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9CYXNpY3Nfb2ZfSFRUUC9EYXRhX1VSSXNcbiAgICAgICAgdW5vcHRpbWl6ZWQgPSB0cnVlO1xuICAgICAgICBpc0xhenkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIGxvYWRlZEltYWdlVVJMcy5oYXMoc3JjKSkge1xuICAgICAgICBpc0xhenkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKCFzcmMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2UgaXMgbWlzc2luZyByZXF1aXJlZCBcInNyY1wiIHByb3BlcnR5LiBNYWtlIHN1cmUgeW91IHBhc3MgXCJzcmNcIiBpbiBwcm9wcyB0byB0aGUgXFxgbmV4dC9pbWFnZVxcYCBjb21wb25lbnQuIFJlY2VpdmVkOiAke0pTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgcXVhbGl0eVxuICAgICAgICAgICAgfSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFWQUxJRF9MQVlPVVRfVkFMVUVTLmluY2x1ZGVzKGxheW91dCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcImxheW91dFwiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bGF5b3V0fVwiIHNob3VsZCBiZSBvbmUgb2YgJHtWQUxJRF9MQVlPVVRfVkFMVUVTLm1hcChTdHJpbmcpLmpvaW4oJywnKX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB3aWR0aEludCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYU4od2lkdGhJbnQpIHx8IHR5cGVvZiBoZWlnaHRJbnQgIT09ICd1bmRlZmluZWQnICYmIGlzTmFOKGhlaWdodEludCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcIndpZHRoXCIgb3IgXCJoZWlnaHRcIiBwcm9wZXJ0eS4gVGhlc2Ugc2hvdWxkIGJlIG51bWVyaWMgdmFsdWVzLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXlvdXQgPT09ICdmaWxsJyAmJiAod2lkdGggfHwgaGVpZ2h0KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGFuZCBcImxheW91dD0nZmlsbCdcIiBoYXMgdW51c2VkIHByb3BlcnRpZXMgYXNzaWduZWQuIFBsZWFzZSByZW1vdmUgXCJ3aWR0aFwiIGFuZCBcImhlaWdodFwiLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVkFMSURfTE9BRElOR19WQUxVRVMuaW5jbHVkZXMobG9hZGluZykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcImxvYWRpbmdcIiBwcm9wZXJ0eS4gUHJvdmlkZWQgXCIke2xvYWRpbmd9XCIgc2hvdWxkIGJlIG9uZSBvZiAke1ZBTElEX0xPQURJTkdfVkFMVUVTLm1hcChTdHJpbmcpLmpvaW4oJywnKX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yaXR5ICYmIGxvYWRpbmcgPT09ICdsYXp5Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBib3RoIFwicHJpb3JpdHlcIiBhbmQgXCJsb2FkaW5nPSdsYXp5J1wiIHByb3BlcnRpZXMuIE9ubHkgb25lIHNob3VsZCBiZSB1c2VkLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PT0gJ2JsdXInKSB7XG4gICAgICAgICAgICBpZiAobGF5b3V0ICE9PSAnZmlsbCcgJiYgKHdpZHRoSW50IHx8IDApICogKGhlaWdodEludCB8fCAwKSA8IDE2MDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaXMgc21hbGxlciB0aGFuIDQweDQwLiBDb25zaWRlciByZW1vdmluZyB0aGUgXCJwbGFjZWhvbGRlcj0nYmx1cidcIiBwcm9wZXJ0eSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFibHVyRGF0YVVSTCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFZBTElEX0JMVVJfRVhUID0gW1xuICAgICAgICAgICAgICAgICAgICAnanBlZycsXG4gICAgICAgICAgICAgICAgICAgICdwbmcnLFxuICAgICAgICAgICAgICAgICAgICAnd2VicCdcbiAgICAgICAgICAgICAgICBdIC8vIHNob3VsZCBtYXRjaCBuZXh0LWltYWdlLWxvYWRlclxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIFwicGxhY2Vob2xkZXI9J2JsdXInXCIgcHJvcGVydHkgYnV0IGlzIG1pc3NpbmcgdGhlIFwiYmx1ckRhdGFVUkxcIiBwcm9wZXJ0eS5cbiAgICAgICAgICBQb3NzaWJsZSBzb2x1dGlvbnM6XG4gICAgICAgICAgICAtIEFkZCBhIFwiYmx1ckRhdGFVUkxcIiBwcm9wZXJ0eSwgdGhlIGNvbnRlbnRzIHNob3VsZCBiZSBhIHNtYWxsIERhdGEgVVJMIHRvIHJlcHJlc2VudCB0aGUgaW1hZ2VcbiAgICAgICAgICAgIC0gQ2hhbmdlIHRoZSBcInNyY1wiIHByb3BlcnR5IHRvIGEgc3RhdGljIGltcG9ydCB3aXRoIG9uZSBvZiB0aGUgc3VwcG9ydGVkIGZpbGUgdHlwZXM6ICR7VkFMSURfQkxVUl9FWFQuam9pbignLCcpfVxuICAgICAgICAgICAgLSBSZW1vdmUgdGhlIFwicGxhY2Vob2xkZXJcIiBwcm9wZXJ0eSwgZWZmZWN0aXZlbHkgbm8gYmx1ciBlZmZlY3RcbiAgICAgICAgICBSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL3BsYWNlaG9sZGVyLWJsdXItZGF0YS11cmxgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3JlZicgaW4gcmVzdCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGlzIHVzaW5nIHVuc3VwcG9ydGVkIFwicmVmXCIgcHJvcGVydHkuIENvbnNpZGVyIHVzaW5nIHRoZSBcIm9uTG9hZGluZ0NvbXBsZXRlXCIgcHJvcGVydHkgaW5zdGVhZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3N0eWxlJyBpbiByZXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaXMgdXNpbmcgdW5zdXBwb3J0ZWQgXCJzdHlsZVwiIHByb3BlcnR5LiBQbGVhc2UgdXNlIHRoZSBcImNsYXNzTmFtZVwiIHByb3BlcnR5IGluc3RlYWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApICsgMTAwO1xuICAgICAgICBpZiAoIXVub3B0aW1pemVkICYmICFsb2FkZXIoe1xuICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgd2lkdGg6IHJhbmQsXG4gICAgICAgICAgICBxdWFsaXR5OiA3NVxuICAgICAgICB9KS5pbmNsdWRlcyhyYW5kLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGEgXCJsb2FkZXJcIiBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IGltcGxlbWVudCB3aWR0aC4gUGxlYXNlIGltcGxlbWVudCBpdCBvciB1c2UgdGhlIFwidW5vcHRpbWl6ZWRcIiBwcm9wZXJ0eSBpbnN0ZWFkLmAgKyBgXFxuUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWltYWdlLW1pc3NpbmctbG9hZGVyLXdpZHRoYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgW3NldFJlZiwgaXNJbnRlcnNlY3RlZF0gPSAoMCwgX3VzZUludGVyc2VjdGlvbikudXNlSW50ZXJzZWN0aW9uKHtcbiAgICAgICAgcm9vdE1hcmdpbjogbGF6eUJvdW5kYXJ5LFxuICAgICAgICBkaXNhYmxlZDogIWlzTGF6eVxuICAgIH0pO1xuICAgIGNvbnN0IGlzVmlzaWJsZSA9ICFpc0xhenkgfHwgaXNJbnRlcnNlY3RlZDtcbiAgICBsZXQgd3JhcHBlclN0eWxlO1xuICAgIGxldCBzaXplclN0eWxlO1xuICAgIGxldCBzaXplclN2ZztcbiAgICBsZXQgaW1nU3R5bGUgPSB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgbWFyZ2luOiAnYXV0bycsXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIG1pbldpZHRoOiAnMTAwJScsXG4gICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgIG1pbkhlaWdodDogJzEwMCUnLFxuICAgICAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgb2JqZWN0Rml0LFxuICAgICAgICBvYmplY3RQb3NpdGlvblxuICAgIH07XG4gICAgY29uc3QgYmx1clN0eWxlID0gcGxhY2Vob2xkZXIgPT09ICdibHVyJyA/IHtcbiAgICAgICAgZmlsdGVyOiAnYmx1cigyMHB4KScsXG4gICAgICAgIGJhY2tncm91bmRTaXplOiBvYmplY3RGaXQgfHwgJ2NvdmVyJyxcbiAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKFwiJHtibHVyRGF0YVVSTH1cIilgLFxuICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IG9iamVjdFBvc2l0aW9uIHx8ICcwJSAwJSdcbiAgICB9IDoge1xuICAgIH07XG4gICAgaWYgKGxheW91dCA9PT0gJ2ZpbGwnKSB7XG4gICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIGxheW91dD1cImZpbGxcIiAvPlxuICAgICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgIG1hcmdpbjogMFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpZHRoSW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaGVpZ2h0SW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIC8+XG4gICAgICAgIGNvbnN0IHF1b3RpZW50ID0gaGVpZ2h0SW50IC8gd2lkdGhJbnQ7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdUb3AgPSBpc05hTihxdW90aWVudCkgPyAnMTAwJScgOiBgJHtxdW90aWVudCAqIDEwMH0lYDtcbiAgICAgICAgaWYgKGxheW91dCA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIGxheW91dD1cInJlc3BvbnNpdmVcIiAvPlxuICAgICAgICAgICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNpemVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nVG9wXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ludHJpbnNpYycpIHtcbiAgICAgICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiaW50cmluc2ljXCIgLz5cbiAgICAgICAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzaXplclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNpemVyU3ZnID0gYDxzdmcgd2lkdGg9XCIke3dpZHRoSW50fVwiIGhlaWdodD1cIiR7aGVpZ2h0SW50fVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMS4xXCIvPmA7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnZml4ZWQnKSB7XG4gICAgICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIGxheW91dD1cImZpeGVkXCIgLz5cbiAgICAgICAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoSW50LFxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0SW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgLz5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBtdXN0IHVzZSBcIndpZHRoXCIgYW5kIFwiaGVpZ2h0XCIgcHJvcGVydGllcyBvciBcImxheW91dD0nZmlsbCdcIiBwcm9wZXJ0eS5gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgaW1nQXR0cmlidXRlcyA9IHtcbiAgICAgICAgc3JjOiAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3JyxcbiAgICAgICAgc3JjU2V0OiB1bmRlZmluZWQsXG4gICAgICAgIHNpemVzOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgaW1nQXR0cmlidXRlcyA9IGdlbmVyYXRlSW1nQXR0cnMoe1xuICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgdW5vcHRpbWl6ZWQsXG4gICAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGhJbnQsXG4gICAgICAgICAgICBxdWFsaXR5OiBxdWFsaXR5SW50LFxuICAgICAgICAgICAgc2l6ZXMsXG4gICAgICAgICAgICBsb2FkZXJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBzcmNTdHJpbmcgPSBzcmM7XG4gICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIHN0eWxlOiB3cmFwcGVyU3R5bGVcbiAgICB9LCBzaXplclN0eWxlID8gLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgc3R5bGU6IHNpemVyU3R5bGVcbiAgICB9LCBzaXplclN2ZyA/IC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgcGFkZGluZzogMFxuICAgICAgICB9LFxuICAgICAgICBhbHQ6IFwiXCIsXG4gICAgICAgIFwiYXJpYS1oaWRkZW5cIjogdHJ1ZSxcbiAgICAgICAgc3JjOiBgZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwkeygwLCBfdG9CYXNlNjQpLnRvQmFzZTY0KHNpemVyU3ZnKX1gXG4gICAgfSkgOiBudWxsKSA6IG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB9LCByZXN0LCBpbWdBdHRyaWJ1dGVzLCB7XG4gICAgICAgIGRlY29kaW5nOiBcImFzeW5jXCIsXG4gICAgICAgIFwiZGF0YS1uaW1nXCI6IGxheW91dCxcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgIHJlZjogKGltZyk9PntcbiAgICAgICAgICAgIHNldFJlZihpbWcpO1xuICAgICAgICAgICAgaGFuZGxlTG9hZGluZyhpbWcsIHNyY1N0cmluZywgbGF5b3V0LCBwbGFjZWhvbGRlciwgb25Mb2FkaW5nQ29tcGxldGUpO1xuICAgICAgICB9LFxuICAgICAgICBzdHlsZTogX29iamVjdFNwcmVhZCh7XG4gICAgICAgIH0sIGltZ1N0eWxlLCBibHVyU3R5bGUpXG4gICAgfSkpLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgfSwgcmVzdCwgZ2VuZXJhdGVJbWdBdHRycyh7XG4gICAgICAgIHNyYyxcbiAgICAgICAgdW5vcHRpbWl6ZWQsXG4gICAgICAgIGxheW91dCxcbiAgICAgICAgd2lkdGg6IHdpZHRoSW50LFxuICAgICAgICBxdWFsaXR5OiBxdWFsaXR5SW50LFxuICAgICAgICBzaXplcyxcbiAgICAgICAgbG9hZGVyXG4gICAgfSksIHtcbiAgICAgICAgZGVjb2Rpbmc6IFwiYXN5bmNcIixcbiAgICAgICAgXCJkYXRhLW5pbWdcIjogbGF5b3V0LFxuICAgICAgICBzdHlsZTogaW1nU3R5bGUsXG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICBsb2FkaW5nOiBsb2FkaW5nIHx8ICdsYXp5J1xuICAgIH0pKSksIHByaW9yaXR5ID8gLy8gTm90ZSBob3cgd2Ugb21pdCB0aGUgYGhyZWZgIGF0dHJpYnV0ZSwgYXMgaXQgd291bGQgb25seSBiZSByZWxldmFudFxuICAgIC8vIGZvciBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IGBpbWFnZXNyY3NldGAsIGFuZCBpbiB0aG9zZSBjYXNlc1xuICAgIC8vIGl0IHdvdWxkIGxpa2VseSBjYXVzZSB0aGUgaW5jb3JyZWN0IGltYWdlIHRvIGJlIHByZWxvYWRlZC5cbiAgICAvL1xuICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NlbWFudGljcy5odG1sI2F0dHItbGluay1pbWFnZXNyY3NldFxuICAgIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfaGVhZC5kZWZhdWx0LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAga2V5OiAnX19uaW1nLScgKyBpbWdBdHRyaWJ1dGVzLnNyYyArIGltZ0F0dHJpYnV0ZXMuc3JjU2V0ICsgaW1nQXR0cmlidXRlcy5zaXplcyxcbiAgICAgICAgcmVsOiBcInByZWxvYWRcIixcbiAgICAgICAgYXM6IFwiaW1hZ2VcIixcbiAgICAgICAgaHJlZjogaW1nQXR0cmlidXRlcy5zcmNTZXQgPyB1bmRlZmluZWQgOiBpbWdBdHRyaWJ1dGVzLnNyYyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZTogaW1hZ2VzcmNzZXQgaXMgbm90IHlldCBpbiB0aGUgbGluayBlbGVtZW50IHR5cGUuXG4gICAgICAgIGltYWdlc3Jjc2V0OiBpbWdBdHRyaWJ1dGVzLnNyY1NldCxcbiAgICAgICAgLy8gQHRzLWlnbm9yZTogaW1hZ2VzaXplcyBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZS5cbiAgICAgICAgaW1hZ2VzaXplczogaW1nQXR0cmlidXRlcy5zaXplc1xuICAgIH0pKSA6IG51bGwpKTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNyYyhzcmMpIHtcbiAgICByZXR1cm4gc3JjWzBdID09PSAnLycgPyBzcmMuc2xpY2UoMSkgOiBzcmM7XG59XG5mdW5jdGlvbiBpbWdpeExvYWRlcih7IHJvb3QgLCBzcmMgLCB3aWR0aCAsIHF1YWxpdHkgIH0pIHtcbiAgICAvLyBEZW1vOiBodHRwczovL3N0YXRpYy5pbWdpeC5uZXQvZGFpc3kucG5nP2F1dG89Zm9ybWF0JmZpdD1tYXgmdz0zMDBcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke3Jvb3R9JHtub3JtYWxpemVTcmMoc3JjKX1gKTtcbiAgICBjb25zdCBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xuICAgIHBhcmFtcy5zZXQoJ2F1dG8nLCBwYXJhbXMuZ2V0KCdhdXRvJykgfHwgJ2Zvcm1hdCcpO1xuICAgIHBhcmFtcy5zZXQoJ2ZpdCcsIHBhcmFtcy5nZXQoJ2ZpdCcpIHx8ICdtYXgnKTtcbiAgICBwYXJhbXMuc2V0KCd3JywgcGFyYW1zLmdldCgndycpIHx8IHdpZHRoLnRvU3RyaW5nKCkpO1xuICAgIGlmIChxdWFsaXR5KSB7XG4gICAgICAgIHBhcmFtcy5zZXQoJ3EnLCBxdWFsaXR5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsLmhyZWY7XG59XG5mdW5jdGlvbiBha2FtYWlMb2FkZXIoeyByb290ICwgc3JjICwgd2lkdGggIH0pIHtcbiAgICByZXR1cm4gYCR7cm9vdH0ke25vcm1hbGl6ZVNyYyhzcmMpfT9pbXdpZHRoPSR7d2lkdGh9YDtcbn1cbmZ1bmN0aW9uIGNsb3VkaW5hcnlMb2FkZXIoeyByb290ICwgc3JjICwgd2lkdGggLCBxdWFsaXR5ICB9KSB7XG4gICAgLy8gRGVtbzogaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGVtby9pbWFnZS91cGxvYWQvd18zMDAsY19saW1pdCxxX2F1dG8vdHVydGxlcy5qcGdcbiAgICBjb25zdCBwYXJhbXMgPSBbXG4gICAgICAgICdmX2F1dG8nLFxuICAgICAgICAnY19saW1pdCcsXG4gICAgICAgICd3XycgKyB3aWR0aCxcbiAgICAgICAgJ3FfJyArIChxdWFsaXR5IHx8ICdhdXRvJylcbiAgICBdO1xuICAgIGxldCBwYXJhbXNTdHJpbmcgPSBwYXJhbXMuam9pbignLCcpICsgJy8nO1xuICAgIHJldHVybiBgJHtyb290fSR7cGFyYW1zU3RyaW5nfSR7bm9ybWFsaXplU3JjKHNyYyl9YDtcbn1cbmZ1bmN0aW9uIGN1c3RvbUxvYWRlcih7IHNyYyAgfSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBpcyBtaXNzaW5nIFwibG9hZGVyXCIgcHJvcC5gICsgYFxcblJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbmV4dC1pbWFnZS1taXNzaW5nLWxvYWRlcmApO1xufVxuZnVuY3Rpb24gZGVmYXVsdExvYWRlcih7IHJvb3QgLCBzcmMgLCB3aWR0aCAsIHF1YWxpdHkgIH0pIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCBtaXNzaW5nVmFsdWVzID0gW107XG4gICAgICAgIC8vIHRoZXNlIHNob3VsZCBhbHdheXMgYmUgcHJvdmlkZWQgYnV0IG1ha2Ugc3VyZSB0aGV5IGFyZVxuICAgICAgICBpZiAoIXNyYykgbWlzc2luZ1ZhbHVlcy5wdXNoKCdzcmMnKTtcbiAgICAgICAgaWYgKCF3aWR0aCkgbWlzc2luZ1ZhbHVlcy5wdXNoKCd3aWR0aCcpO1xuICAgICAgICBpZiAobWlzc2luZ1ZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5leHQgSW1hZ2UgT3B0aW1pemF0aW9uIHJlcXVpcmVzICR7bWlzc2luZ1ZhbHVlcy5qb2luKCcsICcpfSB0byBiZSBwcm92aWRlZC4gTWFrZSBzdXJlIHlvdSBwYXNzIHRoZW0gYXMgcHJvcHMgdG8gdGhlIFxcYG5leHQvaW1hZ2VcXGAgY29tcG9uZW50LiBSZWNlaXZlZDogJHtKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgIHF1YWxpdHlcbiAgICAgICAgICAgIH0pfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmMuc3RhcnRzV2l0aCgnLy8nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gcGFyc2Ugc3JjIFwiJHtzcmN9XCIgb24gXFxgbmV4dC9pbWFnZVxcYCwgcHJvdG9jb2wtcmVsYXRpdmUgVVJMICgvLykgbXVzdCBiZSBjaGFuZ2VkIHRvIGFuIGFic29sdXRlIFVSTCAoaHR0cDovLyBvciBodHRwczovLylgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNyYy5zdGFydHNXaXRoKCcvJykgJiYgY29uZmlnRG9tYWlucykge1xuICAgICAgICAgICAgbGV0IHBhcnNlZFNyYztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkU3JjID0gbmV3IFVSTChzcmMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIHNyYyBcIiR7c3JjfVwiIG9uIFxcYG5leHQvaW1hZ2VcXGAsIGlmIHVzaW5nIHJlbGF0aXZlIGltYWdlIGl0IG11c3Qgc3RhcnQgd2l0aCBhIGxlYWRpbmcgc2xhc2ggXCIvXCIgb3IgYmUgYW4gYWJzb2x1dGUgVVJMIChodHRwOi8vIG9yIGh0dHBzOi8vKWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiYgIWNvbmZpZ0RvbWFpbnMuaW5jbHVkZXMocGFyc2VkU3JjLmhvc3RuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzcmMgcHJvcCAoJHtzcmN9KSBvbiBcXGBuZXh0L2ltYWdlXFxgLCBob3N0bmFtZSBcIiR7cGFyc2VkU3JjLmhvc3RuYW1lfVwiIGlzIG5vdCBjb25maWd1cmVkIHVuZGVyIGltYWdlcyBpbiB5b3VyIFxcYG5leHQuY29uZmlnLmpzXFxgXFxuYCArIGBTZWUgbW9yZSBpbmZvOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWltYWdlLXVuY29uZmlndXJlZC1ob3N0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGAke3Jvb3R9P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudChzcmMpfSZ3PSR7d2lkdGh9JnE9JHtxdWFsaXR5IHx8IDc1fWA7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWltYWdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfcm91dGVyID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvcm91dGVyL3JvdXRlclwiKTtcbnZhciBfcm91dGVyMSA9IHJlcXVpcmUoXCIuL3JvdXRlclwiKTtcbnZhciBfdXNlSW50ZXJzZWN0aW9uID0gcmVxdWlyZShcIi4vdXNlLWludGVyc2VjdGlvblwiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmNvbnN0IHByZWZldGNoZWQgPSB7XG59O1xuZnVuY3Rpb24gcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhcm91dGVyKSByZXR1cm47XG4gICAgaWYgKCEoMCwgX3JvdXRlcikuaXNMb2NhbFVSTChocmVmKSkgcmV0dXJuO1xuICAgIC8vIFByZWZldGNoIHRoZSBKU09OIHBhZ2UgaWYgYXNrZWQgKG9ubHkgaW4gdGhlIGNsaWVudClcbiAgICAvLyBXZSBuZWVkIHRvIGhhbmRsZSBhIHByZWZldGNoIGVycm9yIGhlcmUgc2luY2Ugd2UgbWF5IGJlXG4gICAgLy8gbG9hZGluZyB3aXRoIHByaW9yaXR5IHdoaWNoIGNhbiByZWplY3QgYnV0IHdlIGRvbid0XG4gICAgLy8gd2FudCB0byBmb3JjZSBuYXZpZ2F0aW9uIHNpbmNlIHRoaXMgaXMgb25seSBhIHByZWZldGNoXG4gICAgcm91dGVyLnByZWZldGNoKGhyZWYsIGFzLCBvcHRpb25zKS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgLy8gcmV0aHJvdyB0byBzaG93IGludmFsaWQgVVJMIGVycm9yc1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY3VyTG9jYWxlID0gb3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgIT09ICd1bmRlZmluZWQnID8gb3B0aW9ucy5sb2NhbGUgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZTtcbiAgICAvLyBKb2luIG9uIGFuIGludmFsaWQgVVJJIGNoYXJhY3RlclxuICAgIHByZWZldGNoZWRbaHJlZiArICclJyArIGFzICsgKGN1ckxvY2FsZSA/ICclJyArIGN1ckxvY2FsZSA6ICcnKV0gPSB0cnVlO1xufVxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB7XG4gICAgY29uc3QgeyB0YXJnZXQgIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIHJldHVybiB0YXJnZXQgJiYgdGFyZ2V0ICE9PSAnX3NlbGYnIHx8IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQubmF0aXZlRXZlbnQgJiYgZXZlbnQubmF0aXZlRXZlbnQud2hpY2ggPT09IDI7XG59XG5mdW5jdGlvbiBsaW5rQ2xpY2tlZChlLCByb3V0ZXIsIGhyZWYsIGFzLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSkge1xuICAgIGNvbnN0IHsgbm9kZU5hbWUgIH0gPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgaWYgKG5vZGVOYW1lID09PSAnQScgJiYgKGlzTW9kaWZpZWRFdmVudChlKSB8fCAhKDAsIF9yb3V0ZXIpLmlzTG9jYWxVUkwoaHJlZikpKSB7XG4gICAgICAgIC8vIGlnbm9yZSBjbGljayBmb3IgYnJvd3NlcuKAmXMgZGVmYXVsdCBiZWhhdmlvclxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgYXZvaWQgc2Nyb2xsIGZvciB1cmxzIHdpdGggYW5jaG9yIHJlZnNcbiAgICBpZiAoc2Nyb2xsID09IG51bGwgJiYgYXMuaW5kZXhPZignIycpID49IDApIHtcbiAgICAgICAgc2Nyb2xsID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIHJlcGxhY2Ugc3RhdGUgaW5zdGVhZCBvZiBwdXNoIGlmIHByb3AgaXMgcHJlc2VudFxuICAgIHJvdXRlcltyZXBsYWNlID8gJ3JlcGxhY2UnIDogJ3B1c2gnXShocmVmLCBhcywge1xuICAgICAgICBzaGFsbG93LFxuICAgICAgICBsb2NhbGUsXG4gICAgICAgIHNjcm9sbFxuICAgIH0pO1xufVxuZnVuY3Rpb24gTGluayhwcm9wcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3BFcnJvcihhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKGBGYWlsZWQgcHJvcCB0eXBlOiBUaGUgcHJvcCBcXGAke2FyZ3Mua2V5fVxcYCBleHBlY3RzIGEgJHthcmdzLmV4cGVjdGVkfSBpbiBcXGA8TGluaz5cXGAsIGJ1dCBnb3QgXFxgJHthcmdzLmFjdHVhbH1cXGAgaW5zdGVhZC5gICsgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gXCJcXG5PcGVuIHlvdXIgYnJvd3NlcidzIGNvbnNvbGUgdG8gdmlldyB0aGUgQ29tcG9uZW50IHN0YWNrIHRyYWNlLlwiIDogJycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICBjb25zdCByZXF1aXJlZFByb3BzR3VhcmQgPSB7XG4gICAgICAgICAgICBocmVmOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkUHJvcHMgPSBPYmplY3Qua2V5cyhyZXF1aXJlZFByb3BzR3VhcmQpO1xuICAgICAgICByZXF1aXJlZFByb3BzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdocmVmJykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09IG51bGwgfHwgdHlwZW9mIHByb3BzW2tleV0gIT09ICdzdHJpbmcnICYmIHR5cGVvZiBwcm9wc1trZXldICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IHByb3BzW2tleV0gPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcHJvcHNba2V5XVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgIGNvbnN0IF8gPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICBjb25zdCBvcHRpb25hbFByb3BzR3VhcmQgPSB7XG4gICAgICAgICAgICBhczogdHJ1ZSxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBzaGFsbG93OiB0cnVlLFxuICAgICAgICAgICAgcGFzc0hyZWY6IHRydWUsXG4gICAgICAgICAgICBwcmVmZXRjaDogdHJ1ZSxcbiAgICAgICAgICAgIGxvY2FsZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvcHRpb25hbFByb3BzID0gT2JqZWN0LmtleXMob3B0aW9uYWxQcm9wc0d1YXJkKTtcbiAgICAgICAgb3B0aW9uYWxQcm9wcy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICBjb25zdCB2YWxUeXBlID0gdHlwZW9mIHByb3BzW2tleV07XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnYXMnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gJiYgdmFsVHlwZSAhPT0gJ3N0cmluZycgJiYgdmFsVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2Agb3IgYG9iamVjdGAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbG9jYWxlJykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1trZXldICYmIHZhbFR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3JlcGxhY2UnIHx8IGtleSA9PT0gJ3Njcm9sbCcgfHwga2V5ID09PSAnc2hhbGxvdycgfHwga2V5ID09PSAncGFzc0hyZWYnIHx8IGtleSA9PT0gJ3ByZWZldGNoJykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1trZXldICE9IG51bGwgJiYgdmFsVHlwZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogJ2Bib29sZWFuYCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgICAgICAgICBjb25zdCBfID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gVGhpcyBob29rIGlzIGluIGEgY29uZGl0aW9uYWwgYnV0IHRoYXQgaXMgb2sgYmVjYXVzZSBgcHJvY2Vzcy5lbnYuTk9ERV9FTlZgIG5ldmVyIGNoYW5nZXNcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgICAgIGNvbnN0IGhhc1dhcm5lZCA9IF9yZWFjdC5kZWZhdWx0LnVzZVJlZihmYWxzZSk7XG4gICAgICAgIGlmIChwcm9wcy5wcmVmZXRjaCAmJiAhaGFzV2FybmVkLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGhhc1dhcm5lZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTmV4dC5qcyBhdXRvLXByZWZldGNoZXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiB2aWV3cG9ydC4gVGhlIHByZWZldGNoIGF0dHJpYnV0ZSBpcyBubyBsb25nZXIgbmVlZGVkLiBNb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9wcmVmZXRjaC10cnVlLWRlcHJlY2F0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwID0gcHJvcHMucHJlZmV0Y2ggIT09IGZhbHNlO1xuICAgIGNvbnN0IHJvdXRlciA9ICgwLCBfcm91dGVyMSkudXNlUm91dGVyKCk7XG4gICAgY29uc3QgeyBocmVmICwgYXMgIH0gPSBfcmVhY3QuZGVmYXVsdC51c2VNZW1vKCgpPT57XG4gICAgICAgIGNvbnN0IFtyZXNvbHZlZEhyZWYsIHJlc29sdmVkQXNdID0gKDAsIF9yb3V0ZXIpLnJlc29sdmVIcmVmKHJvdXRlciwgcHJvcHMuaHJlZiwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBocmVmOiByZXNvbHZlZEhyZWYsXG4gICAgICAgICAgICBhczogcHJvcHMuYXMgPyAoMCwgX3JvdXRlcikucmVzb2x2ZUhyZWYocm91dGVyLCBwcm9wcy5hcykgOiByZXNvbHZlZEFzIHx8IHJlc29sdmVkSHJlZlxuICAgICAgICB9O1xuICAgIH0sIFtcbiAgICAgICAgcm91dGVyLFxuICAgICAgICBwcm9wcy5ocmVmLFxuICAgICAgICBwcm9wcy5hc1xuICAgIF0pO1xuICAgIGxldCB7IGNoaWxkcmVuICwgcmVwbGFjZSAsIHNoYWxsb3cgLCBzY3JvbGwgLCBsb2NhbGUgIH0gPSBwcm9wcztcbiAgICAvLyBEZXByZWNhdGVkLiBXYXJuaW5nIHNob3duIGJ5IHByb3BUeXBlIGNoZWNrLiBJZiB0aGUgY2hpbGRyZW4gcHJvdmlkZWQgaXMgYSBzdHJpbmcgKDxMaW5rPmV4YW1wbGU8L0xpbms+KSB3ZSB3cmFwIGl0IGluIGFuIDxhPiB0YWdcbiAgICBpZiAodHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJykge1xuICAgICAgICBjaGlsZHJlbiA9IC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIiwgbnVsbCwgY2hpbGRyZW4pO1xuICAgIH1cbiAgICAvLyBUaGlzIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBjaGlsZCwgaWYgbXVsdGlwbGUgYXJlIHByb3ZpZGVkIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3JcbiAgICBsZXQgY2hpbGQ7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGlsZCA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTXVsdGlwbGUgY2hpbGRyZW4gd2VyZSBwYXNzZWQgdG8gPExpbms+IHdpdGggXFxgaHJlZlxcYCBvZiBcXGAke3Byb3BzLmhyZWZ9XFxgIGJ1dCBvbmx5IG9uZSBjaGlsZCBpcyBzdXBwb3J0ZWQgaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbGluay1tdWx0aXBsZS1jaGlsZHJlbmAgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBcIiBcXG5PcGVuIHlvdXIgYnJvd3NlcidzIGNvbnNvbGUgdG8gdmlldyB0aGUgQ29tcG9uZW50IHN0YWNrIHRyYWNlLlwiIDogJycpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkUmVmID0gY2hpbGQgJiYgdHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JyAmJiBjaGlsZC5yZWY7XG4gICAgY29uc3QgW3NldEludGVyc2VjdGlvblJlZiwgaXNWaXNpYmxlXSA9ICgwLCBfdXNlSW50ZXJzZWN0aW9uKS51c2VJbnRlcnNlY3Rpb24oe1xuICAgICAgICByb290TWFyZ2luOiAnMjAwcHgnXG4gICAgfSk7XG4gICAgY29uc3Qgc2V0UmVmID0gX3JlYWN0LmRlZmF1bHQudXNlQ2FsbGJhY2soKGVsKT0+e1xuICAgICAgICBzZXRJbnRlcnNlY3Rpb25SZWYoZWwpO1xuICAgICAgICBpZiAoY2hpbGRSZWYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGRSZWYgPT09ICdmdW5jdGlvbicpIGNoaWxkUmVmKGVsKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjaGlsZFJlZiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjaGlsZFJlZi5jdXJyZW50ID0gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGNoaWxkUmVmLFxuICAgICAgICBzZXRJbnRlcnNlY3Rpb25SZWZcbiAgICBdKTtcbiAgICBfcmVhY3QuZGVmYXVsdC51c2VFZmZlY3QoKCk9PntcbiAgICAgICAgY29uc3Qgc2hvdWxkUHJlZmV0Y2ggPSBpc1Zpc2libGUgJiYgcCAmJiAoMCwgX3JvdXRlcikuaXNMb2NhbFVSTChocmVmKTtcbiAgICAgICAgY29uc3QgY3VyTG9jYWxlID0gdHlwZW9mIGxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbGUgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZTtcbiAgICAgICAgY29uc3QgaXNQcmVmZXRjaGVkID0gcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXTtcbiAgICAgICAgaWYgKHNob3VsZFByZWZldGNoICYmICFpc1ByZWZldGNoZWQpIHtcbiAgICAgICAgICAgIHByZWZldGNoKHJvdXRlciwgaHJlZiwgYXMsIHtcbiAgICAgICAgICAgICAgICBsb2NhbGU6IGN1ckxvY2FsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGFzLFxuICAgICAgICBocmVmLFxuICAgICAgICBpc1Zpc2libGUsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgcCxcbiAgICAgICAgcm91dGVyXG4gICAgXSk7XG4gICAgY29uc3QgY2hpbGRQcm9wcyA9IHtcbiAgICAgICAgcmVmOiBzZXRSZWYsXG4gICAgICAgIG9uQ2xpY2s6IChlKT0+e1xuICAgICAgICAgICAgaWYgKGNoaWxkLnByb3BzICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgbGlua0NsaWNrZWQoZSwgcm91dGVyLCBocmVmLCBhcywgcmVwbGFjZSwgc2hhbGxvdywgc2Nyb2xsLCBsb2NhbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjaGlsZFByb3BzLm9uTW91c2VFbnRlciA9IChlKT0+e1xuICAgICAgICBpZiAoISgwLCBfcm91dGVyKS5pc0xvY2FsVVJMKGhyZWYpKSByZXR1cm47XG4gICAgICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25Nb3VzZUVudGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywge1xuICAgICAgICAgICAgcHJpb3JpdHk6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBJZiBjaGlsZCBpcyBhbiA8YT4gdGFnIGFuZCBkb2Vzbid0IGhhdmUgYSBocmVmIGF0dHJpYnV0ZSwgb3IgaWYgdGhlICdwYXNzSHJlZicgcHJvcGVydHkgaXNcbiAgICAvLyBkZWZpbmVkLCB3ZSBzcGVjaWZ5IHRoZSBjdXJyZW50ICdocmVmJywgc28gdGhhdCByZXBldGl0aW9uIGlzIG5vdCBuZWVkZWQgYnkgdGhlIHVzZXJcbiAgICBpZiAocHJvcHMucGFzc0hyZWYgfHwgY2hpbGQudHlwZSA9PT0gJ2EnICYmICEoJ2hyZWYnIGluIGNoaWxkLnByb3BzKSkge1xuICAgICAgICBjb25zdCBjdXJMb2NhbGUgPSB0eXBlb2YgbG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlO1xuICAgICAgICAvLyB3ZSBvbmx5IHJlbmRlciBkb21haW4gbG9jYWxlcyBpZiB3ZSBhcmUgY3VycmVudGx5IG9uIGEgZG9tYWluIGxvY2FsZVxuICAgICAgICAvLyBzbyB0aGF0IGxvY2FsZSBsaW5rcyBhcmUgc3RpbGwgdmlzaXRhYmxlIGluIGRldmVsb3BtZW50L3ByZXZpZXcgZW52c1xuICAgICAgICBjb25zdCBsb2NhbGVEb21haW4gPSByb3V0ZXIgJiYgcm91dGVyLmlzTG9jYWxlRG9tYWluICYmICgwLCBfcm91dGVyKS5nZXREb21haW5Mb2NhbGUoYXMsIGN1ckxvY2FsZSwgcm91dGVyICYmIHJvdXRlci5sb2NhbGVzLCByb3V0ZXIgJiYgcm91dGVyLmRvbWFpbkxvY2FsZXMpO1xuICAgICAgICBjaGlsZFByb3BzLmhyZWYgPSBsb2NhbGVEb21haW4gfHwgKDAsIF9yb3V0ZXIpLmFkZEJhc2VQYXRoKCgwLCBfcm91dGVyKS5hZGRMb2NhbGUoYXMsIGN1ckxvY2FsZSwgcm91dGVyICYmIHJvdXRlci5kZWZhdWx0TG9jYWxlKSk7XG4gICAgfVxuICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNsb25lRWxlbWVudChjaGlsZCwgY2hpbGRQcm9wcykpO1xufVxudmFyIF9kZWZhdWx0ID0gTGluaztcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW5rLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoO1xuZXhwb3J0cy5ub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCA9IHZvaWQgMDtcbmZ1bmN0aW9uIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5lbmRzV2l0aCgnLycpICYmIHBhdGggIT09ICcvJyA/IHBhdGguc2xpY2UoMCwgLTEpIDogcGF0aDtcbn1cbmNvbnN0IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoID0gcHJvY2Vzcy5lbnYuX19ORVhUX1RSQUlMSU5HX1NMQVNIID8gKHBhdGgpPT57XG4gICAgaWYgKC9cXC5bXi9dK1xcLz8kLy50ZXN0KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRoKTtcbiAgICB9IGVsc2UgaWYgKHBhdGguZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGF0aCArICcvJztcbiAgICB9XG59IDogcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2g7XG5leHBvcnRzLm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoID0gbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2g7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbGl6ZS10cmFpbGluZy1zbGFzaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjayA9IGV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gdm9pZCAwO1xuY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihjYikge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNiKHtcbiAgICAgICAgICAgIGRpZFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCAxKTtcbn07XG5leHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrO1xuY29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihpZCkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpO1xufTtcbmV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gY2FuY2VsSWRsZUNhbGxiYWNrO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLm1hcmtBc3NldEVycm9yID0gbWFya0Fzc2V0RXJyb3I7XG5leHBvcnRzLmlzQXNzZXRFcnJvciA9IGlzQXNzZXRFcnJvcjtcbmV4cG9ydHMuZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCA9IGdldENsaWVudEJ1aWxkTWFuaWZlc3Q7XG5leHBvcnRzLmNyZWF0ZVJvdXRlTG9hZGVyID0gY3JlYXRlUm91dGVMb2FkZXI7XG52YXIgX2dldEFzc2V0UGF0aEZyb21Sb3V0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGVcIikpO1xudmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrID0gcmVxdWlyZShcIi4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuLy8gMy44cyB3YXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGl0J3Mgd2hhdCBodHRwczovL3dlYi5kZXYvaW50ZXJhY3RpdmVcbi8vIGNvbnNpZGVycyBhcyBcIkdvb2RcIiB0aW1lLXRvLWludGVyYWN0aXZlLiBXZSBtdXN0IGFzc3VtZSBzb21ldGhpbmcgd2VudFxuLy8gd3JvbmcgYmV5b25kIHRoaXMgcG9pbnQsIGFuZCB0aGVuIGZhbGwtYmFjayB0byBhIGZ1bGwgcGFnZSB0cmFuc2l0aW9uIHRvXG4vLyBzaG93IHRoZSB1c2VyIHNvbWV0aGluZyBvZiB2YWx1ZS5cbmNvbnN0IE1TX01BWF9JRExFX0RFTEFZID0gMzgwMDtcbmZ1bmN0aW9uIHdpdGhGdXR1cmUoa2V5LCBtYXAsIGdlbmVyYXRvcikge1xuICAgIGxldCBlbnRyeSA9IG1hcC5nZXQoa2V5KTtcbiAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgaWYgKCdmdXR1cmUnIGluIGVudHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50cnkuZnV0dXJlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW50cnkpO1xuICAgIH1cbiAgICBsZXQgcmVzb2x2ZXI7XG4gICAgY29uc3QgcHJvbSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xuICAgICAgICByZXNvbHZlciA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgbWFwLnNldChrZXksIGVudHJ5ID0ge1xuICAgICAgICByZXNvbHZlOiByZXNvbHZlcixcbiAgICAgICAgZnV0dXJlOiBwcm9tXG4gICAgfSk7XG4gICAgcmV0dXJuIGdlbmVyYXRvciA/IGdlbmVyYXRvcigpLnRoZW4oKHZhbHVlKT0+KHJlc29sdmVyKHZhbHVlKSwgdmFsdWUpXG4gICAgKSA6IHByb207XG59XG5mdW5jdGlvbiBoYXNQcmVmZXRjaChsaW5rKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgcmV0dXJuKC8vIGRldGVjdCBJRTExIHNpbmNlIGl0IHN1cHBvcnRzIHByZWZldGNoIGJ1dCBpc24ndCBkZXRlY3RlZFxuICAgICAgICAvLyB3aXRoIHJlbExpc3Quc3VwcG9ydFxuICAgICAgICAoISF3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHx8IGxpbmsucmVsTGlzdC5zdXBwb3J0cygncHJlZmV0Y2gnKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuY29uc3QgY2FuUHJlZmV0Y2ggPSBoYXNQcmVmZXRjaCgpO1xuZnVuY3Rpb24gcHJlZmV0Y2hWaWFEb20oaHJlZiwgYXMsIGxpbmspIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJwcmVmZXRjaFwiXVtocmVmXj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcygpO1xuICAgICAgICB9XG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWw6XG4gICAgICAgIGlmIChhcykgbGluay5hcyA9IGFzO1xuICAgICAgICBsaW5rLnJlbCA9IGBwcmVmZXRjaGA7XG4gICAgICAgIGxpbmsuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOO1xuICAgICAgICBsaW5rLm9ubG9hZCA9IHJlcztcbiAgICAgICAgbGluay5vbmVycm9yID0gcmVqO1xuICAgICAgICAvLyBgaHJlZmAgc2hvdWxkIGFsd2F5cyBiZSBsYXN0OlxuICAgICAgICBsaW5rLmhyZWYgPSBocmVmO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0pO1xufVxuY29uc3QgQVNTRVRfTE9BRF9FUlJPUiA9IFN5bWJvbCgnQVNTRVRfTE9BRF9FUlJPUicpO1xuZnVuY3Rpb24gbWFya0Fzc2V0RXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsIEFTU0VUX0xPQURfRVJST1IsIHtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGlzQXNzZXRFcnJvcihlcnIpIHtcbiAgICByZXR1cm4gZXJyICYmIEFTU0VUX0xPQURfRVJST1IgaW4gZXJyO1xufVxuZnVuY3Rpb24gYXBwZW5kU2NyaXB0KHNyYywgc2NyaXB0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAvLyBUaGUgb3JkZXIgb2YgcHJvcGVydHkgYXNzaWdubWVudCBoZXJlIGlzIGludGVudGlvbmFsLlxuICAgICAgICAvLyAxLiBTZXR1cCBzdWNjZXNzL2ZhaWx1cmUgaG9va3MgaW4gY2FzZSB0aGUgYnJvd3NlciBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vICAgIGV4ZWN1dGVzIHdoZW4gYHNyY2AgaXMgc2V0LlxuICAgICAgICBzY3JpcHQub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKT0+cmVqZWN0KG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc2NyaXB0OiAke3NyY31gKSkpXG4gICAgICAgIDtcbiAgICAgICAgLy8gMi4gQ29uZmlndXJlIHRoZSBjcm9zcy1vcmlnaW4gYXR0cmlidXRlIGJlZm9yZSBzZXR0aW5nIGBzcmNgIGluIGNhc2UgdGhlXG4gICAgICAgIC8vICAgIGJyb3dzZXIgYmVnaW5zIHRvIGZldGNoLlxuICAgICAgICBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOO1xuICAgICAgICAvLyAzLiBGaW5hbGx5LCBzZXQgdGhlIHNvdXJjZSBhbmQgaW5qZWN0IGludG8gdGhlIERPTSBpbiBjYXNlIHRoZSBjaGlsZFxuICAgICAgICAvLyAgICBtdXN0IGJlIGFwcGVuZGVkIGZvciBmZXRjaGluZyB0byBzdGFydC5cbiAgICAgICAgc2NyaXB0LnNyYyA9IHNyYztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuLy8gV2Ugd2FpdCBmb3IgcGFnZXMgdG8gYmUgYnVpbHQgaW4gZGV2IGJlZm9yZSB3ZSBzdGFydCB0aGUgcm91dGUgdHJhbnNpdGlvblxuLy8gdGltZW91dCB0byBwcmV2ZW50IGFuIHVuLW5lY2Vzc2FyeSBoYXJkIG5hdmlnYXRpb24gaW4gZGV2ZWxvcG1lbnQuXG5sZXQgZGV2QnVpbGRQcm9taXNlO1xuLy8gUmVzb2x2ZSBhIHByb21pc2UgdGhhdCB0aW1lcyBvdXQgYWZ0ZXIgZ2l2ZW4gYW1vdW50IG9mIG1pbGxpc2Vjb25kcy5cbmZ1bmN0aW9uIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQocCwgbXMsIGVycikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgIHAudGhlbigocik9PntcbiAgICAgICAgICAgIC8vIFJlc29sdmVkLCBjYW5jZWwgdGhlIHRpbWVvdXRcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgICAvLyBXZSB3cmFwIHRoZXNlIGNoZWNrcyBzZXBhcmF0ZWx5IGZvciBiZXR0ZXIgZGVhZC1jb2RlIGVsaW1pbmF0aW9uIGluXG4gICAgICAgIC8vIHByb2R1Y3Rpb24gYnVuZGxlcy5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICAoZGV2QnVpbGRQcm9taXNlIHx8IFByb21pc2UucmVzb2x2ZSgpKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT5zZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBtcylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PnNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgbXMpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkge1xuICAgIGlmIChzZWxmLl9fQlVJTERfTUFOSUZFU1QpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QpO1xuICAgIH1cbiAgICBjb25zdCBvbkJ1aWxkTWFuaWZlc3QgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSk9PntcbiAgICAgICAgLy8gTWFuZGF0b3J5IGJlY2F1c2UgdGhpcyBpcyBub3QgY29uY3VycmVudCBzYWZlOlxuICAgICAgICBjb25zdCBjYiA9IHNlbGYuX19CVUlMRF9NQU5JRkVTVF9DQjtcbiAgICAgICAgc2VsZi5fX0JVSUxEX01BTklGRVNUX0NCID0gKCk9PntcbiAgICAgICAgICAgIHJlc29sdmUoc2VsZi5fX0JVSUxEX01BTklGRVNUKTtcbiAgICAgICAgICAgIGNiICYmIGNiKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQob25CdWlsZE1hbmlmZXN0LCBNU19NQVhfSURMRV9ERUxBWSwgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBjbGllbnQgYnVpbGQgbWFuaWZlc3QnKSkpO1xufVxuZnVuY3Rpb24gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgICBzY3JpcHRzOiBbXG4gICAgICAgICAgICAgICAgYXNzZXRQcmVmaXggKyAnL19uZXh0L3N0YXRpYy9jaHVua3MvcGFnZXMnICsgZW5jb2RlVVJJKCgwLCBfZ2V0QXNzZXRQYXRoRnJvbVJvdXRlKS5kZWZhdWx0KHJvdXRlLCAnLmpzJykpLCBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBTdHlsZXMgYXJlIGhhbmRsZWQgYnkgYHN0eWxlLWxvYWRlcmAgaW4gZGV2ZWxvcG1lbnQ6XG4gICAgICAgICAgICBjc3M6IFtdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpLnRoZW4oKG1hbmlmZXN0KT0+e1xuICAgICAgICBpZiAoIShyb3V0ZSBpbiBtYW5pZmVzdCkpIHtcbiAgICAgICAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvb2t1cCByb3V0ZTogJHtyb3V0ZX1gKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsRmlsZXMgPSBtYW5pZmVzdFtyb3V0ZV0ubWFwKChlbnRyeSk9PmFzc2V0UHJlZml4ICsgJy9fbmV4dC8nICsgZW5jb2RlVVJJKGVudHJ5KVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NyaXB0czogYWxsRmlsZXMuZmlsdGVyKCh2KT0+di5lbmRzV2l0aCgnLmpzJylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjc3M6IGFsbEZpbGVzLmZpbHRlcigodik9PnYuZW5kc1dpdGgoJy5jc3MnKVxuICAgICAgICAgICAgKVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUm91dGVMb2FkZXIoYXNzZXRQcmVmaXgpIHtcbiAgICBjb25zdCBlbnRyeXBvaW50cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBsb2FkZWRTY3JpcHRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHN0eWxlU2hlZXRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHJvdXRlcyA9IG5ldyBNYXAoKTtcbiAgICBmdW5jdGlvbiBtYXliZUV4ZWN1dGVTY3JpcHQoc3JjKSB7XG4gICAgICAgIGxldCBwcm9tID0gbG9hZGVkU2NyaXB0cy5nZXQoc3JjKTtcbiAgICAgICAgaWYgKHByb20pIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgZXhlY3V0aW5nIHNjcmlwdCBpZiBpdCdzIGFscmVhZHkgaW4gdGhlIERPTTpcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmNePVwiJHtzcmN9XCJdYCkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBsb2FkZWRTY3JpcHRzLnNldChzcmMsIHByb20gPSBhcHBlbmRTY3JpcHQoc3JjKSk7XG4gICAgICAgIHJldHVybiBwcm9tO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmZXRjaFN0eWxlU2hlZXQoaHJlZikge1xuICAgICAgICBsZXQgcHJvbSA9IHN0eWxlU2hlZXRzLmdldChocmVmKTtcbiAgICAgICAgaWYgKHByb20pIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlU2hlZXRzLnNldChocmVmLCBwcm9tID0gZmV0Y2goaHJlZikudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0eWxlc2hlZXQ6ICR7aHJlZn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMudGV4dCgpLnRoZW4oKHRleHQpPT4oe1xuICAgICAgICAgICAgICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0ZXh0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpPT57XG4gICAgICAgICAgICB0aHJvdyBtYXJrQXNzZXRFcnJvcihlcnIpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBwcm9tO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB3aGVuRW50cnlwb2ludCAocm91dGUpIHtcbiAgICAgICAgICAgIHJldHVybiB3aXRoRnV0dXJlKHJvdXRlLCBlbnRyeXBvaW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRW50cnlwb2ludCAocm91dGUsIGV4ZWN1dGUpIHtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShleGVjdXRlKS50aGVuKChmbik9PmZuKClcbiAgICAgICAgICAgICkudGhlbigoZXhwb3J0cyk9Pih7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogZXhwb3J0cyAmJiBleHBvcnRzLmRlZmF1bHQgfHwgZXhwb3J0cyxcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0czogZXhwb3J0c1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAsIChlcnIpPT4oe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkudGhlbigoaW5wdXQpPT57XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkID0gZW50cnlwb2ludHMuZ2V0KHJvdXRlKTtcbiAgICAgICAgICAgICAgICBlbnRyeXBvaW50cy5zZXQocm91dGUsIGlucHV0KTtcbiAgICAgICAgICAgICAgICBpZiAob2xkICYmICdyZXNvbHZlJyBpbiBvbGQpIG9sZC5yZXNvbHZlKGlucHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGUgKHJvdXRlLCBwcmVmZXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpdGhGdXR1cmUocm91dGUsIHJvdXRlcywgKCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZUZpbGVzUHJvbWlzZSA9IGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKS50aGVuKCh7IHNjcmlwdHMgLCBjc3MgIH0pPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeXBvaW50cy5oYXMocm91dGUpID8gW10gOiBQcm9taXNlLmFsbChzY3JpcHRzLm1hcChtYXliZUV4ZWN1dGVTY3JpcHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGNzcy5tYXAoZmV0Y2hTdHlsZVNoZWV0KSksIFxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndoZW5FbnRyeXBvaW50KHJvdXRlKS50aGVuKChlbnRyeXBvaW50KT0+KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeXBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogcmVzWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICBkZXZCdWlsZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3V0ZUZpbGVzUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3V0ZUZpbGVzUHJvbWlzZS5maW5hbGx5KCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0KHJvdXRlRmlsZXNQcm9taXNlLCBNU19NQVhfSURMRV9ERUxBWSwgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBSb3V0ZSBkaWQgbm90IGNvbXBsZXRlIGxvYWRpbmc6ICR7cm91dGV9YCkpKS50aGVuKCh7IGVudHJ5cG9pbnQgLCBzdHlsZXMgIH0pPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBzdHlsZXNcbiAgICAgICAgICAgICAgICAgICAgfSwgZW50cnlwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InIGluIGVudHJ5cG9pbnQgPyBlbnRyeXBvaW50IDogcmVzO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVmZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBjYWNoZSBlcnJvcnMgZHVyaW5nIHByZWZldGNoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwcmVmZXRjaCAocm91dGUpIHtcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3F1aWNrbGluay9ibG9iLzQ1M2E2NjFmYTFmYTk0MGUyZDJlMDQ0NDUyMzk4ZTM4YzY3YTk4ZmIvc3JjL2luZGV4Lm1qcyNMMTE1LUwxMThcbiAgICAgICAgICAgIC8vIExpY2Vuc2U6IEFwYWNoZSAyLjBcbiAgICAgICAgICAgIGxldCBjbjtcbiAgICAgICAgICAgIGlmIChjbiA9IG5hdmlnYXRvci5jb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgcHJlZmV0Y2ggaWYgdXNpbmcgMkcgb3IgaWYgU2F2ZS1EYXRhIGlzIGVuYWJsZWQuXG4gICAgICAgICAgICAgICAgaWYgKGNuLnNhdmVEYXRhIHx8IC8yZy8udGVzdChjbi5lZmZlY3RpdmVUeXBlKSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKS50aGVuKChvdXRwdXQpPT5Qcm9taXNlLmFsbChjYW5QcmVmZXRjaCA/IG91dHB1dC5zY3JpcHRzLm1hcCgoc2NyaXB0KT0+cHJlZmV0Y2hWaWFEb20oc2NyaXB0LCAnc2NyaXB0JylcbiAgICAgICAgICAgICAgICApIDogW10pXG4gICAgICAgICAgICApLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PnRoaXMubG9hZFJvdXRlKHJvdXRlLCB0cnVlKS5jYXRjaCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KS5jYXRjaCgvLyBzd2FsbG93IHByZWZldGNoIGVycm9yc1xuICAgICAgICAgICAgKCk9PntcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGUtbG9hZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUm91dGVyXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfcm91dGVyLmRlZmF1bHQ7XG4gICAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoUm91dGVyXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfd2l0aFJvdXRlci5kZWZhdWx0O1xuICAgIH1cbn0pO1xuZXhwb3J0cy51c2VSb3V0ZXIgPSB1c2VSb3V0ZXI7XG5leHBvcnRzLmNyZWF0ZVJvdXRlciA9IGNyZWF0ZVJvdXRlcjtcbmV4cG9ydHMubWFrZVB1YmxpY1JvdXRlckluc3RhbmNlID0gbWFrZVB1YmxpY1JvdXRlckluc3RhbmNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfcm91dGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9yb3V0ZXIvcm91dGVyXCIpKTtcbnZhciBfcm91dGVyQ29udGV4dCA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3JvdXRlci1jb250ZXh0XCIpO1xudmFyIF93aXRoUm91dGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi93aXRoLXJvdXRlclwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5jb25zdCBzaW5nbGV0b25Sb3V0ZXIgPSB7XG4gICAgcm91dGVyOiBudWxsLFxuICAgIHJlYWR5Q2FsbGJhY2tzOiBbXSxcbiAgICByZWFkeSAoY2IpIHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyKSByZXR1cm4gY2IoKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5Q2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8vIENyZWF0ZSBwdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgcm91dGVyIGluIHRoZSBzaW5nbGV0b25Sb3V0ZXJcbmNvbnN0IHVybFByb3BlcnR5RmllbGRzID0gW1xuICAgICdwYXRobmFtZScsXG4gICAgJ3JvdXRlJyxcbiAgICAncXVlcnknLFxuICAgICdhc1BhdGgnLFxuICAgICdjb21wb25lbnRzJyxcbiAgICAnaXNGYWxsYmFjaycsXG4gICAgJ2Jhc2VQYXRoJyxcbiAgICAnbG9jYWxlJyxcbiAgICAnbG9jYWxlcycsXG4gICAgJ2RlZmF1bHRMb2NhbGUnLFxuICAgICdpc1JlYWR5JyxcbiAgICAnaXNQcmV2aWV3JyxcbiAgICAnaXNMb2NhbGVEb21haW4nLFxuICAgICdkb21haW5Mb2NhbGVzJywgXG5dO1xuY29uc3Qgcm91dGVyRXZlbnRzID0gW1xuICAgICdyb3V0ZUNoYW5nZVN0YXJ0JyxcbiAgICAnYmVmb3JlSGlzdG9yeUNoYW5nZScsXG4gICAgJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLFxuICAgICdyb3V0ZUNoYW5nZUVycm9yJyxcbiAgICAnaGFzaENoYW5nZVN0YXJ0JyxcbiAgICAnaGFzaENoYW5nZUNvbXBsZXRlJywgXG5dO1xuY29uc3QgY29yZU1ldGhvZEZpZWxkcyA9IFtcbiAgICAncHVzaCcsXG4gICAgJ3JlcGxhY2UnLFxuICAgICdyZWxvYWQnLFxuICAgICdiYWNrJyxcbiAgICAncHJlZmV0Y2gnLFxuICAgICdiZWZvcmVQb3BTdGF0ZScsIFxuXTtcbi8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsICdldmVudHMnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIF9yb3V0ZXIuZGVmYXVsdC5ldmVudHM7XG4gICAgfVxufSk7XG51cmxQcm9wZXJ0eUZpZWxkcy5mb3JFYWNoKChmaWVsZCk9PntcbiAgICAvLyBIZXJlIHdlIG5lZWQgdG8gdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBiZWNhdXNlIHdlIG5lZWQgdG8gcmV0dXJuXG4gICAgLy8gdGhlIHByb3BlcnR5IGFzc2lnbmVkIHRvIHRoZSBhY3R1YWwgcm91dGVyXG4gICAgLy8gVGhlIHZhbHVlIG1pZ2h0IGdldCBjaGFuZ2VkIGFzIHdlIGNoYW5nZSByb3V0ZXMgYW5kIHRoaXMgaXMgdGhlXG4gICAgLy8gcHJvcGVyIHdheSB0byBhY2Nlc3MgaXRcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCBmaWVsZCwge1xuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgY29uc3Qgcm91dGVyID0gZ2V0Um91dGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gcm91dGVyW2ZpZWxkXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5jb3JlTWV0aG9kRmllbGRzLmZvckVhY2goKGZpZWxkKT0+e1xuICAgIHNpbmdsZXRvblJvdXRlcltmaWVsZF0gPSAoLi4uYXJncyk9PntcbiAgICAgICAgY29uc3Qgcm91dGVyID0gZ2V0Um91dGVyKCk7XG4gICAgICAgIHJldHVybiByb3V0ZXJbZmllbGRdKC4uLmFyZ3MpO1xuICAgIH07XG59KTtcbnJvdXRlckV2ZW50cy5mb3JFYWNoKChldmVudCk9PntcbiAgICBzaW5nbGV0b25Sb3V0ZXIucmVhZHkoKCk9PntcbiAgICAgICAgX3JvdXRlci5kZWZhdWx0LmV2ZW50cy5vbihldmVudCwgKC4uLmFyZ3MpPT57XG4gICAgICAgICAgICBjb25zdCBldmVudEZpZWxkID0gYG9uJHtldmVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2V2ZW50LnN1YnN0cmluZygxKX1gO1xuICAgICAgICAgICAgY29uc3QgX3NpbmdsZXRvblJvdXRlciA9IHNpbmdsZXRvblJvdXRlcjtcbiAgICAgICAgICAgIGlmIChfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igd2hlbiBydW5uaW5nIHRoZSBSb3V0ZXIgZXZlbnQ6ICR7ZXZlbnRGaWVsZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtlcnIubWVzc2FnZX1cXG4ke2Vyci5zdGFja31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5mdW5jdGlvbiBnZXRSb3V0ZXIoKSB7XG4gICAgaWYgKCFzaW5nbGV0b25Sb3V0ZXIucm91dGVyKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnTm8gcm91dGVyIGluc3RhbmNlIGZvdW5kLlxcbicgKyAnWW91IHNob3VsZCBvbmx5IHVzZSBcIm5leHQvcm91dGVyXCIgb24gdGhlIGNsaWVudCBzaWRlIG9mIHlvdXIgYXBwLlxcbic7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpbmdsZXRvblJvdXRlci5yb3V0ZXI7XG59XG52YXIgX2RlZmF1bHQgPSBzaW5nbGV0b25Sb3V0ZXI7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbmZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgICByZXR1cm4gX3JlYWN0LmRlZmF1bHQudXNlQ29udGV4dChfcm91dGVyQ29udGV4dC5Sb3V0ZXJDb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlciguLi5hcmdzKSB7XG4gICAgc2luZ2xldG9uUm91dGVyLnJvdXRlciA9IG5ldyBfcm91dGVyLmRlZmF1bHQoLi4uYXJncyk7XG4gICAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzLmZvckVhY2goKGNiKT0+Y2IoKVxuICAgICk7XG4gICAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzID0gW107XG4gICAgcmV0dXJuIHNpbmdsZXRvblJvdXRlci5yb3V0ZXI7XG59XG5mdW5jdGlvbiBtYWtlUHVibGljUm91dGVySW5zdGFuY2Uocm91dGVyKSB7XG4gICAgY29uc3QgX3JvdXRlcjEgPSByb3V0ZXI7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHVybFByb3BlcnR5RmllbGRzKXtcbiAgICAgICAgaWYgKHR5cGVvZiBfcm91dGVyMVtwcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBPYmplY3QuYXNzaWduKEFycmF5LmlzQXJyYXkoX3JvdXRlcjFbcHJvcGVydHldKSA/IFtdIDoge1xuICAgICAgICAgICAgfSwgX3JvdXRlcjFbcHJvcGVydHldKSAvLyBtYWtlcyBzdXJlIHF1ZXJ5IGlzIG5vdCBzdGF0ZWZ1bFxuICAgICAgICAgICAgO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2VbcHJvcGVydHldID0gX3JvdXRlcjFbcHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBFdmVudHMgaXMgYSBzdGF0aWMgcHJvcGVydHkgb24gdGhlIHJvdXRlciwgdGhlIHJvdXRlciBkb2Vzbid0IGhhdmUgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gdXNlIGl0XG4gICAgaW5zdGFuY2UuZXZlbnRzID0gX3JvdXRlci5kZWZhdWx0LmV2ZW50cztcbiAgICBjb3JlTWV0aG9kRmllbGRzLmZvckVhY2goKGZpZWxkKT0+e1xuICAgICAgICBpbnN0YW5jZVtmaWVsZF0gPSAoLi4uYXJncyk9PntcbiAgICAgICAgICAgIHJldHVybiBfcm91dGVyMVtmaWVsZF0oLi4uYXJncyk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnVzZUludGVyc2VjdGlvbiA9IHVzZUludGVyc2VjdGlvbjtcbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgX3JlcXVlc3RJZGxlQ2FsbGJhY2sgPSByZXF1aXJlKFwiLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2tcIik7XG5jb25zdCBoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciA9IHR5cGVvZiBJbnRlcnNlY3Rpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XG5mdW5jdGlvbiB1c2VJbnRlcnNlY3Rpb24oeyByb290TWFyZ2luICwgZGlzYWJsZWQgIH0pIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gZGlzYWJsZWQgfHwgIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyO1xuICAgIGNvbnN0IHVub2JzZXJ2ZSA9ICgwLCBfcmVhY3QpLnVzZVJlZigpO1xuICAgIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9ICgwLCBfcmVhY3QpLnVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBzZXRSZWYgPSAoMCwgX3JlYWN0KS51c2VDYWxsYmFjaygoZWwpPT57XG4gICAgICAgIGlmICh1bm9ic2VydmUuY3VycmVudCkge1xuICAgICAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQoKTtcbiAgICAgICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Rpc2FibGVkIHx8IHZpc2libGUpIHJldHVybjtcbiAgICAgICAgaWYgKGVsICYmIGVsLnRhZ05hbWUpIHtcbiAgICAgICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gb2JzZXJ2ZShlbCwgKGlzVmlzaWJsZSk9PmlzVmlzaWJsZSAmJiBzZXRWaXNpYmxlKGlzVmlzaWJsZSlcbiAgICAgICAgICAgICwge1xuICAgICAgICAgICAgICAgIHJvb3RNYXJnaW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBpc0Rpc2FibGVkLFxuICAgICAgICByb290TWFyZ2luLFxuICAgICAgICB2aXNpYmxlXG4gICAgXSk7XG4gICAgKDAsIF9yZWFjdCkudXNlRWZmZWN0KCgpPT57XG4gICAgICAgIGlmICghaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkbGVDYWxsYmFjayA9ICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+c2V0VmlzaWJsZSh0cnVlKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgpPT4oMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLmNhbmNlbElkbGVDYWxsYmFjayhpZGxlQ2FsbGJhY2spXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICB2aXNpYmxlXG4gICAgXSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc2V0UmVmLFxuICAgICAgICB2aXNpYmxlXG4gICAgXTtcbn1cbmZ1bmN0aW9uIG9ic2VydmUoZWxlbWVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGlkICwgb2JzZXJ2ZXIgLCBlbGVtZW50cyAgfSA9IGNyZWF0ZU9ic2VydmVyKG9wdGlvbnMpO1xuICAgIGVsZW1lbnRzLnNldChlbGVtZW50LCBjYWxsYmFjayk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5vYnNlcnZlKCkge1xuICAgICAgICBlbGVtZW50cy5kZWxldGUoZWxlbWVudCk7XG4gICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KTtcbiAgICAgICAgLy8gRGVzdHJveSBvYnNlcnZlciB3aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIHdhdGNoOlxuICAgICAgICBpZiAoZWxlbWVudHMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgb2JzZXJ2ZXJzLmRlbGV0ZShpZCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuY29uc3Qgb2JzZXJ2ZXJzID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucykge1xuICAgIGNvbnN0IGlkID0gb3B0aW9ucy5yb290TWFyZ2luIHx8ICcnO1xuICAgIGxldCBpbnN0YW5jZSA9IG9ic2VydmVycy5nZXQoaWQpO1xuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKT0+e1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KT0+e1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBlbGVtZW50cy5nZXQoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nIHx8IGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gMDtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBpc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpc1Zpc2libGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBvcHRpb25zKTtcbiAgICBvYnNlcnZlcnMuc2V0KGlkLCBpbnN0YW5jZSA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIG9ic2VydmVyLFxuICAgICAgICBlbGVtZW50c1xuICAgIH0pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlLWludGVyc2VjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHdpdGhSb3V0ZXI7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF9yb3V0ZXIgPSByZXF1aXJlKFwiLi9yb3V0ZXJcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5mdW5jdGlvbiB3aXRoUm91dGVyKENvbXBvc2VkQ29tcG9uZW50KSB7XG4gICAgZnVuY3Rpb24gV2l0aFJvdXRlcldyYXBwZXIocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChDb21wb3NlZENvbXBvbmVudCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICByb3V0ZXI6ICgwLCBfcm91dGVyKS51c2VSb3V0ZXIoKVxuICAgICAgICB9LCBwcm9wcykpKTtcbiAgICB9XG4gICAgV2l0aFJvdXRlcldyYXBwZXIuZ2V0SW5pdGlhbFByb3BzID0gQ29tcG9zZWRDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzO1xuICAgIFdpdGhSb3V0ZXJXcmFwcGVyLm9yaWdHZXRJbml0aWFsUHJvcHMgPSBDb21wb3NlZENvbXBvbmVudC5vcmlnR2V0SW5pdGlhbFByb3BzO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBDb21wb3NlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb3NlZENvbXBvbmVudC5uYW1lIHx8ICdVbmtub3duJztcbiAgICAgICAgV2l0aFJvdXRlcldyYXBwZXIuZGlzcGxheU5hbWUgPSBgd2l0aFJvdXRlcigke25hbWV9KWA7XG4gICAgfVxuICAgIHJldHVybiBXaXRoUm91dGVyV3JhcHBlcjtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2l0aC1yb3V0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdldERvbWFpbkxvY2FsZSA9IGdldERvbWFpbkxvY2FsZTtcbmV4cG9ydHMuYWRkTG9jYWxlID0gYWRkTG9jYWxlO1xuZXhwb3J0cy5kZWxMb2NhbGUgPSBkZWxMb2NhbGU7XG5leHBvcnRzLmhhc0Jhc2VQYXRoID0gaGFzQmFzZVBhdGg7XG5leHBvcnRzLmFkZEJhc2VQYXRoID0gYWRkQmFzZVBhdGg7XG5leHBvcnRzLmRlbEJhc2VQYXRoID0gZGVsQmFzZVBhdGg7XG5leHBvcnRzLmlzTG9jYWxVUkwgPSBpc0xvY2FsVVJMO1xuZXhwb3J0cy5pbnRlcnBvbGF0ZUFzID0gaW50ZXJwb2xhdGVBcztcbmV4cG9ydHMucmVzb2x2ZUhyZWYgPSByZXNvbHZlSHJlZjtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jbGllbnQvbm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoXCIpO1xudmFyIF9yb3V0ZUxvYWRlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jbGllbnQvcm91dGUtbG9hZGVyXCIpO1xudmFyIF9kZW5vcm1hbGl6ZVBhZ2VQYXRoID0gcmVxdWlyZShcIi4uLy4uLy4uL3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGhcIik7XG52YXIgX25vcm1hbGl6ZUxvY2FsZVBhdGggPSByZXF1aXJlKFwiLi4vaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGhcIik7XG52YXIgX21pdHQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9taXR0XCIpKTtcbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgX2lzRHluYW1pYyA9IHJlcXVpcmUoXCIuL3V0aWxzL2lzLWR5bmFtaWNcIik7XG52YXIgX3BhcnNlUmVsYXRpdmVVcmwgPSByZXF1aXJlKFwiLi91dGlscy9wYXJzZS1yZWxhdGl2ZS11cmxcIik7XG52YXIgX3F1ZXJ5c3RyaW5nID0gcmVxdWlyZShcIi4vdXRpbHMvcXVlcnlzdHJpbmdcIik7XG52YXIgX3Jlc29sdmVSZXdyaXRlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvcmVzb2x2ZS1yZXdyaXRlc1wiKSk7XG52YXIgX3JvdXRlTWF0Y2hlciA9IHJlcXVpcmUoXCIuL3V0aWxzL3JvdXRlLW1hdGNoZXJcIik7XG52YXIgX3JvdXRlUmVnZXggPSByZXF1aXJlKFwiLi91dGlscy9yb3V0ZS1yZWdleFwiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmxldCBkZXRlY3REb21haW5Mb2NhbGU7XG5pZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgIGRldGVjdERvbWFpbkxvY2FsZSA9IHJlcXVpcmUoJy4uL2kxOG4vZGV0ZWN0LWRvbWFpbi1sb2NhbGUnKS5kZXRlY3REb21haW5Mb2NhbGU7XG59XG5jb25zdCBiYXNlUGF0aCA9IHByb2Nlc3MuZW52Ll9fTkVYVF9ST1VURVJfQkFTRVBBVEggfHwgJyc7XG5mdW5jdGlvbiBidWlsZENhbmNlbGxhdGlvbkVycm9yKCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcignUm91dGUgQ2FuY2VsbGVkJyksIHtcbiAgICAgICAgY2FuY2VsbGVkOiB0cnVlXG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRQYXRoUHJlZml4KHBhdGgsIHByZWZpeCkge1xuICAgIHJldHVybiBwcmVmaXggJiYgcGF0aC5zdGFydHNXaXRoKCcvJykgPyBwYXRoID09PSAnLycgPyAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoKHByZWZpeCkgOiBgJHtwcmVmaXh9JHtwYXRoTm9RdWVyeUhhc2gocGF0aCkgPT09ICcvJyA/IHBhdGguc3Vic3RyaW5nKDEpIDogcGF0aH1gIDogcGF0aDtcbn1cbmZ1bmN0aW9uIGdldERvbWFpbkxvY2FsZShwYXRoLCBsb2NhbGUsIGxvY2FsZXMsIGRvbWFpbkxvY2FsZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICBsb2NhbGUgPSBsb2NhbGUgfHwgKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKHBhdGgsIGxvY2FsZXMpLmRldGVjdGVkTG9jYWxlO1xuICAgICAgICBjb25zdCBkZXRlY3RlZERvbWFpbiA9IGRldGVjdERvbWFpbkxvY2FsZShkb21haW5Mb2NhbGVzLCB1bmRlZmluZWQsIGxvY2FsZSk7XG4gICAgICAgIGlmIChkZXRlY3RlZERvbWFpbikge1xuICAgICAgICAgICAgcmV0dXJuIGBodHRwJHtkZXRlY3RlZERvbWFpbi5odHRwID8gJycgOiAncyd9Oi8vJHtkZXRlY3RlZERvbWFpbi5kb21haW59JHtiYXNlUGF0aCB8fCAnJ30ke2xvY2FsZSA9PT0gZGV0ZWN0ZWREb21haW4uZGVmYXVsdExvY2FsZSA/ICcnIDogYC8ke2xvY2FsZX1gfSR7cGF0aH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkTG9jYWxlKHBhdGgsIGxvY2FsZSwgZGVmYXVsdExvY2FsZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIGNvbnN0IHBhdGhuYW1lID0gcGF0aE5vUXVlcnlIYXNoKHBhdGgpO1xuICAgICAgICBjb25zdCBwYXRoTG93ZXIgPSBwYXRobmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb2NhbGVMb3dlciA9IGxvY2FsZSAmJiBsb2NhbGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxvY2FsZSAmJiBsb2NhbGUgIT09IGRlZmF1bHRMb2NhbGUgJiYgIXBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSAmJiBwYXRoTG93ZXIgIT09ICcvJyArIGxvY2FsZUxvd2VyID8gYWRkUGF0aFByZWZpeChwYXRoLCAnLycgKyBsb2NhbGUpIDogcGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG5mdW5jdGlvbiBkZWxMb2NhbGUocGF0aCwgbG9jYWxlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSBwYXRoTm9RdWVyeUhhc2gocGF0aCk7XG4gICAgICAgIGNvbnN0IHBhdGhMb3dlciA9IHBhdGhuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxvY2FsZUxvd2VyID0gbG9jYWxlICYmIGxvY2FsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG9jYWxlICYmIChwYXRoTG93ZXIuc3RhcnRzV2l0aCgnLycgKyBsb2NhbGVMb3dlciArICcvJykgfHwgcGF0aExvd2VyID09PSAnLycgKyBsb2NhbGVMb3dlcikgPyAocGF0aG5hbWUubGVuZ3RoID09PSBsb2NhbGUubGVuZ3RoICsgMSA/ICcvJyA6ICcnKSArIHBhdGguc3Vic3RyKGxvY2FsZS5sZW5ndGggKyAxKSA6IHBhdGg7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuZnVuY3Rpb24gcGF0aE5vUXVlcnlIYXNoKHBhdGgpIHtcbiAgICBjb25zdCBxdWVyeUluZGV4ID0gcGF0aC5pbmRleE9mKCc/Jyk7XG4gICAgY29uc3QgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKHF1ZXJ5SW5kZXggPiAtMSB8fCBoYXNoSW5kZXggPiAtMSkge1xuICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcXVlcnlJbmRleCA+IC0xID8gcXVlcnlJbmRleCA6IGhhc2hJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuZnVuY3Rpb24gaGFzQmFzZVBhdGgocGF0aCkge1xuICAgIHBhdGggPSBwYXRoTm9RdWVyeUhhc2gocGF0aCk7XG4gICAgcmV0dXJuIHBhdGggPT09IGJhc2VQYXRoIHx8IHBhdGguc3RhcnRzV2l0aChiYXNlUGF0aCArICcvJyk7XG59XG5mdW5jdGlvbiBhZGRCYXNlUGF0aChwYXRoKSB7XG4gICAgLy8gd2Ugb25seSBhZGQgdGhlIGJhc2VwYXRoIG9uIHJlbGF0aXZlIHVybHNcbiAgICByZXR1cm4gYWRkUGF0aFByZWZpeChwYXRoLCBiYXNlUGF0aCk7XG59XG5mdW5jdGlvbiBkZWxCYXNlUGF0aChwYXRoKSB7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoYmFzZVBhdGgubGVuZ3RoKTtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aCgnLycpKSBwYXRoID0gYC8ke3BhdGh9YDtcbiAgICByZXR1cm4gcGF0aDtcbn1cbmZ1bmN0aW9uIGlzTG9jYWxVUkwodXJsKSB7XG4gICAgLy8gcHJldmVudCBhIGh5ZHJhdGlvbiBtaXNtYXRjaCBvbiBocmVmIGZvciB1cmwgd2l0aCBhbmNob3IgcmVmc1xuICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpIHx8IHVybC5zdGFydHNXaXRoKCcjJykgfHwgdXJsLnN0YXJ0c1dpdGgoJz8nKSkgcmV0dXJuIHRydWU7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gYWJzb2x1dGUgdXJscyBjYW4gYmUgbG9jYWwgaWYgdGhleSBhcmUgb24gdGhlIHNhbWUgb3JpZ2luXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uT3JpZ2luID0gKDAsIF91dGlscykuZ2V0TG9jYXRpb25PcmlnaW4oKTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBuZXcgVVJMKHVybCwgbG9jYXRpb25PcmlnaW4pO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQub3JpZ2luID09PSBsb2NhdGlvbk9yaWdpbiAmJiBoYXNCYXNlUGF0aChyZXNvbHZlZC5wYXRobmFtZSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gaW50ZXJwb2xhdGVBcyhyb3V0ZSwgYXNQYXRobmFtZSwgcXVlcnkpIHtcbiAgICBsZXQgaW50ZXJwb2xhdGVkUm91dGUgPSAnJztcbiAgICBjb25zdCBkeW5hbWljUmVnZXggPSAoMCwgX3JvdXRlUmVnZXgpLmdldFJvdXRlUmVnZXgocm91dGUpO1xuICAgIGNvbnN0IGR5bmFtaWNHcm91cHMgPSBkeW5hbWljUmVnZXguZ3JvdXBzO1xuICAgIGNvbnN0IGR5bmFtaWNNYXRjaGVzID0gLy8gVHJ5IHRvIG1hdGNoIHRoZSBkeW5hbWljIHJvdXRlIGFnYWluc3QgdGhlIGFzUGF0aFxuICAgIChhc1BhdGhuYW1lICE9PSByb3V0ZSA/ICgwLCBfcm91dGVNYXRjaGVyKS5nZXRSb3V0ZU1hdGNoZXIoZHluYW1pY1JlZ2V4KShhc1BhdGhuYW1lKSA6ICcnKSB8fCAvLyBGYWxsIGJhY2sgdG8gcmVhZGluZyB0aGUgdmFsdWVzIGZyb20gdGhlIGhyZWZcbiAgICAvLyBUT0RPOiBzaG91bGQgdGhpcyB0YWtlIHByaW9yaXR5OyBhbHNvIG5lZWQgdG8gY2hhbmdlIGluIHRoZSByb3V0ZXIuXG4gICAgcXVlcnk7XG4gICAgaW50ZXJwb2xhdGVkUm91dGUgPSByb3V0ZTtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3Qua2V5cyhkeW5hbWljR3JvdXBzKTtcbiAgICBpZiAoIXBhcmFtcy5ldmVyeSgocGFyYW0pPT57XG4gICAgICAgIGxldCB2YWx1ZSA9IGR5bmFtaWNNYXRjaGVzW3BhcmFtXSB8fCAnJztcbiAgICAgICAgY29uc3QgeyByZXBlYXQgLCBvcHRpb25hbCAgfSA9IGR5bmFtaWNHcm91cHNbcGFyYW1dO1xuICAgICAgICAvLyBzdXBwb3J0IHNpbmdsZS1sZXZlbCBjYXRjaC1hbGxcbiAgICAgICAgLy8gVE9ETzogbW9yZSByb2J1c3QgaGFuZGxpbmcgZm9yIHVzZXItZXJyb3IgKHBhc3NpbmcgYC9gKVxuICAgICAgICBsZXQgcmVwbGFjZWQgPSBgWyR7cmVwZWF0ID8gJy4uLicgOiAnJ30ke3BhcmFtfV1gO1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJlcGxhY2VkID0gYCR7IXZhbHVlID8gJy8nIDogJyd9WyR7cmVwbGFjZWR9XWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcGVhdCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gW1xuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIChvcHRpb25hbCB8fCBwYXJhbSBpbiBkeW5hbWljTWF0Y2hlcykgJiYgLy8gSW50ZXJwb2xhdGUgZ3JvdXAgaW50byBkYXRhIFVSTCBpZiBwcmVzZW50XG4gICAgICAgIChpbnRlcnBvbGF0ZWRSb3V0ZSA9IGludGVycG9sYXRlZFJvdXRlLnJlcGxhY2UocmVwbGFjZWQsIHJlcGVhdCA/IHZhbHVlLm1hcCgvLyB0aGVzZSB2YWx1ZXMgc2hvdWxkIGJlIGZ1bGx5IGVuY29kZWQgaW5zdGVhZCBvZiBqdXN0XG4gICAgICAgIC8vIHBhdGggZGVsaW1pdGVyIGVzY2FwZWQgc2luY2UgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWRcbiAgICAgICAgLy8gaW50byB0aGUgVVJMIGFuZCB3ZSBleHBlY3QgVVJMIGVuY29kZWQgc2VnbWVudHNcbiAgICAgICAgLy8gd2hlbiBwYXJzaW5nIGR5bmFtaWMgcm91dGUgcGFyYW1zXG4gICAgICAgIChzZWdtZW50KT0+ZW5jb2RlVVJJQ29tcG9uZW50KHNlZ21lbnQpXG4gICAgICAgICkuam9pbignLycpIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSkgfHwgJy8nKTtcbiAgICB9KSkge1xuICAgICAgICBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnIC8vIGRpZCBub3Qgc2F0aXNmeSBhbGwgcmVxdWlyZW1lbnRzXG4gICAgICAgIDtcbiAgICAvLyBuLmIuIFdlIGlnbm9yZSB0aGlzIGVycm9yIGJlY2F1c2Ugd2UgaGFuZGxlIHdhcm5pbmcgZm9yIHRoaXMgY2FzZSBpblxuICAgIC8vIGRldmVsb3BtZW50IGluIHRoZSBgPExpbms+YCBjb21wb25lbnQgZGlyZWN0bHkuXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcmVzdWx0OiBpbnRlcnBvbGF0ZWRSb3V0ZVxuICAgIH07XG59XG5mdW5jdGlvbiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnksIHBhcmFtcykge1xuICAgIGNvbnN0IGZpbHRlcmVkUXVlcnkgPSB7XG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICBpZiAoIXBhcmFtcy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZFF1ZXJ5W2tleV0gPSBxdWVyeVtrZXldO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkUXVlcnk7XG59XG5mdW5jdGlvbiByZXNvbHZlSHJlZihyb3V0ZXIsIGhyZWYsIHJlc29sdmVBcykge1xuICAgIC8vIHdlIHVzZSBhIGR1bW15IGJhc2UgdXJsIGZvciByZWxhdGl2ZSB1cmxzXG4gICAgbGV0IGJhc2U7XG4gICAgbGV0IHVybEFzU3RyaW5nID0gdHlwZW9mIGhyZWYgPT09ICdzdHJpbmcnID8gaHJlZiA6ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKGhyZWYpO1xuICAgIC8vIHJlcGVhdGVkIHNsYXNoZXMgYW5kIGJhY2tzbGFzaGVzIGluIHRoZSBVUkwgYXJlIGNvbnNpZGVyZWRcbiAgICAvLyBpbnZhbGlkIGFuZCB3aWxsIG5ldmVyIG1hdGNoIGEgTmV4dC5qcyBwYWdlL2ZpbGVcbiAgICBjb25zdCB1cmxQcm90b01hdGNoID0gdXJsQXNTdHJpbmcubWF0Y2goL15bYS16QS1aXXsxLH06XFwvXFwvLyk7XG4gICAgY29uc3QgdXJsQXNTdHJpbmdOb1Byb3RvID0gdXJsUHJvdG9NYXRjaCA/IHVybEFzU3RyaW5nLnN1YnN0cih1cmxQcm90b01hdGNoWzBdLmxlbmd0aCkgOiB1cmxBc1N0cmluZztcbiAgICBjb25zdCB1cmxQYXJ0cyA9IHVybEFzU3RyaW5nTm9Qcm90by5zcGxpdCgnPycpO1xuICAgIGlmICgodXJsUGFydHNbMF0gfHwgJycpLm1hdGNoKC8oXFwvXFwvfFxcXFwpLykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBocmVmIHBhc3NlZCB0byBuZXh0L3JvdXRlcjogJHt1cmxBc1N0cmluZ30sIHJlcGVhdGVkIGZvcndhcmQtc2xhc2hlcyAoLy8pIG9yIGJhY2tzbGFzaGVzIFxcXFwgYXJlIG5vdCB2YWxpZCBpbiB0aGUgaHJlZmApO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkVXJsID0gKDAsIF91dGlscykubm9ybWFsaXplUmVwZWF0ZWRTbGFzaGVzKHVybEFzU3RyaW5nTm9Qcm90byk7XG4gICAgICAgIHVybEFzU3RyaW5nID0gKHVybFByb3RvTWF0Y2ggPyB1cmxQcm90b01hdGNoWzBdIDogJycpICsgbm9ybWFsaXplZFVybDtcbiAgICB9XG4gICAgLy8gUmV0dXJuIGJlY2F1c2UgaXQgY2Fubm90IGJlIHJvdXRlZCBieSB0aGUgTmV4dC5qcyByb3V0ZXJcbiAgICBpZiAoIWlzTG9jYWxVUkwodXJsQXNTdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlQXMgPyBbXG4gICAgICAgICAgICB1cmxBc1N0cmluZ1xuICAgICAgICBdIDogdXJsQXNTdHJpbmc7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGJhc2UgPSBuZXcgVVJMKHVybEFzU3RyaW5nLnN0YXJ0c1dpdGgoJyMnKSA/IHJvdXRlci5hc1BhdGggOiByb3V0ZXIucGF0aG5hbWUsICdodHRwOi8vbicpO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gLyBmb3IgaW52YWxpZCBhc1BhdGggdmFsdWVzIGUuZy4gLy9cbiAgICAgICAgYmFzZSA9IG5ldyBVUkwoJy8nLCAnaHR0cDovL24nKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmluYWxVcmwgPSBuZXcgVVJMKHVybEFzU3RyaW5nLCBiYXNlKTtcbiAgICAgICAgZmluYWxVcmwucGF0aG5hbWUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoKGZpbmFsVXJsLnBhdGhuYW1lKTtcbiAgICAgICAgbGV0IGludGVycG9sYXRlZEFzID0gJyc7XG4gICAgICAgIGlmICgoMCwgX2lzRHluYW1pYykuaXNEeW5hbWljUm91dGUoZmluYWxVcmwucGF0aG5hbWUpICYmIGZpbmFsVXJsLnNlYXJjaFBhcmFtcyAmJiByZXNvbHZlQXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gKDAsIF9xdWVyeXN0cmluZykuc2VhcmNoUGFyYW1zVG9VcmxRdWVyeShmaW5hbFVybC5zZWFyY2hQYXJhbXMpO1xuICAgICAgICAgICAgY29uc3QgeyByZXN1bHQgLCBwYXJhbXMgIH0gPSBpbnRlcnBvbGF0ZUFzKGZpbmFsVXJsLnBhdGhuYW1lLCBmaW5hbFVybC5wYXRobmFtZSwgcXVlcnkpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGludGVycG9sYXRlZEFzID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBoYXNoOiBmaW5hbFVybC5oYXNoLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlIG9yaWdpbiBkaWRuJ3QgY2hhbmdlLCBpdCBtZWFucyB3ZSByZWNlaXZlZCBhIHJlbGF0aXZlIGhyZWZcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRIcmVmID0gZmluYWxVcmwub3JpZ2luID09PSBiYXNlLm9yaWdpbiA/IGZpbmFsVXJsLmhyZWYuc2xpY2UoZmluYWxVcmwub3JpZ2luLmxlbmd0aCkgOiBmaW5hbFVybC5ocmVmO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUFzID8gW1xuICAgICAgICAgICAgcmVzb2x2ZWRIcmVmLFxuICAgICAgICAgICAgaW50ZXJwb2xhdGVkQXMgfHwgcmVzb2x2ZWRIcmVmXG4gICAgICAgIF0gOiByZXNvbHZlZEhyZWY7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUFzID8gW1xuICAgICAgICAgICAgdXJsQXNTdHJpbmdcbiAgICAgICAgXSA6IHVybEFzU3RyaW5nO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN0cmlwT3JpZ2luKHVybCkge1xuICAgIGNvbnN0IG9yaWdpbiA9ICgwLCBfdXRpbHMpLmdldExvY2F0aW9uT3JpZ2luKCk7XG4gICAgcmV0dXJuIHVybC5zdGFydHNXaXRoKG9yaWdpbikgPyB1cmwuc3Vic3RyaW5nKG9yaWdpbi5sZW5ndGgpIDogdXJsO1xufVxuZnVuY3Rpb24gcHJlcGFyZVVybEFzKHJvdXRlciwgdXJsLCBhcykge1xuICAgIC8vIElmIHVybCBhbmQgYXMgcHJvdmlkZWQgYXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uLFxuICAgIC8vIHdlJ2xsIGZvcm1hdCB0aGVtIGludG8gdGhlIHN0cmluZyB2ZXJzaW9uIGhlcmUuXG4gICAgbGV0IFtyZXNvbHZlZEhyZWYsIHJlc29sdmVkQXNdID0gcmVzb2x2ZUhyZWYocm91dGVyLCB1cmwsIHRydWUpO1xuICAgIGNvbnN0IG9yaWdpbiA9ICgwLCBfdXRpbHMpLmdldExvY2F0aW9uT3JpZ2luKCk7XG4gICAgY29uc3QgaHJlZkhhZE9yaWdpbiA9IHJlc29sdmVkSHJlZi5zdGFydHNXaXRoKG9yaWdpbik7XG4gICAgY29uc3QgYXNIYWRPcmlnaW4gPSByZXNvbHZlZEFzICYmIHJlc29sdmVkQXMuc3RhcnRzV2l0aChvcmlnaW4pO1xuICAgIHJlc29sdmVkSHJlZiA9IHN0cmlwT3JpZ2luKHJlc29sdmVkSHJlZik7XG4gICAgcmVzb2x2ZWRBcyA9IHJlc29sdmVkQXMgPyBzdHJpcE9yaWdpbihyZXNvbHZlZEFzKSA6IHJlc29sdmVkQXM7XG4gICAgY29uc3QgcHJlcGFyZWRVcmwgPSBocmVmSGFkT3JpZ2luID8gcmVzb2x2ZWRIcmVmIDogYWRkQmFzZVBhdGgocmVzb2x2ZWRIcmVmKTtcbiAgICBjb25zdCBwcmVwYXJlZEFzID0gYXMgPyBzdHJpcE9yaWdpbihyZXNvbHZlSHJlZihyb3V0ZXIsIGFzKSkgOiByZXNvbHZlZEFzIHx8IHJlc29sdmVkSHJlZjtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHByZXBhcmVkVXJsLFxuICAgICAgICBhczogYXNIYWRPcmlnaW4gPyBwcmVwYXJlZEFzIDogYWRkQmFzZVBhdGgocHJlcGFyZWRBcylcbiAgICB9O1xufVxuZnVuY3Rpb24gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXRobmFtZSwgcGFnZXMpIHtcbiAgICBjb25zdCBjbGVhblBhdGhuYW1lID0gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCgoMCwgX2Rlbm9ybWFsaXplUGFnZVBhdGgpLmRlbm9ybWFsaXplUGFnZVBhdGgocGF0aG5hbWUpKTtcbiAgICBpZiAoY2xlYW5QYXRobmFtZSA9PT0gJy80MDQnIHx8IGNsZWFuUGF0aG5hbWUgPT09ICcvX2Vycm9yJykge1xuICAgICAgICByZXR1cm4gcGF0aG5hbWU7XG4gICAgfVxuICAgIC8vIGhhbmRsZSByZXNvbHZpbmcgaHJlZiBmb3IgZHluYW1pYyByb3V0ZXNcbiAgICBpZiAoIXBhZ2VzLmluY2x1ZGVzKGNsZWFuUGF0aG5hbWUpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICAgICAgcGFnZXMuc29tZSgocGFnZSk9PntcbiAgICAgICAgICAgIGlmICgoMCwgX2lzRHluYW1pYykuaXNEeW5hbWljUm91dGUocGFnZSkgJiYgKDAsIF9yb3V0ZVJlZ2V4KS5nZXRSb3V0ZVJlZ2V4KHBhZ2UpLnJlLnRlc3QoY2xlYW5QYXRobmFtZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRobmFtZSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSk7XG59XG5jb25zdCBtYW51YWxTY3JvbGxSZXN0b3JhdGlvbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04gJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiB3aW5kb3cuaGlzdG9yeSAmJiAhIWZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCB2ID0gJ19fbmV4dCc7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZXF1ZW5jZXNcbiAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odiwgdiksIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odiksIHRydWU7XG4gICAgfSBjYXRjaCAobikge1xuICAgIH1cbn0oKTtcbmNvbnN0IFNTR19EQVRBX05PVF9GT1VORCA9IFN5bWJvbCgnU1NHX0RBVEFfTk9UX0ZPVU5EJyk7XG5mdW5jdGlvbiBmZXRjaFJldHJ5KHVybCwgYXR0ZW1wdHMpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgICAgIC8vIENvb2tpZXMgYXJlIHJlcXVpcmVkIHRvIGJlIHByZXNlbnQgZm9yIE5leHQuanMnIFNTRyBcIlByZXZpZXcgTW9kZVwiLlxuICAgICAgICAvLyBDb29raWVzIG1heSBhbHNvIGJlIHJlcXVpcmVkIGZvciBgZ2V0U2VydmVyU2lkZVByb3BzYC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gPiBgZmV0Y2hgIHdvbuKAmXQgc2VuZCBjb29raWVzLCB1bmxlc3MgeW91IHNldCB0aGUgY3JlZGVudGlhbHMgaW5pdFxuICAgICAgICAvLyA+IG9wdGlvbi5cbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZldGNoX0FQSS9Vc2luZ19GZXRjaFxuICAgICAgICAvL1xuICAgICAgICAvLyA+IEZvciBtYXhpbXVtIGJyb3dzZXIgY29tcGF0aWJpbGl0eSB3aGVuIGl0IGNvbWVzIHRvIHNlbmRpbmcgJlxuICAgICAgICAvLyA+IHJlY2VpdmluZyBjb29raWVzLCBhbHdheXMgc3VwcGx5IHRoZSBgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidgXG4gICAgICAgIC8vID4gb3B0aW9uIGluc3RlYWQgb2YgcmVseWluZyBvbiB0aGUgZGVmYXVsdC5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaCNjYXZlYXRzXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nXG4gICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMSAmJiByZXMuc3RhdHVzID49IDUwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaFJldHJ5KHVybCwgYXR0ZW1wdHMgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ub3RGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RGb3VuZDogU1NHX0RBVEFfTk9UX0ZPVU5EXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0YXRpYyBwcm9wc2ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgaXNTZXJ2ZXJSZW5kZXIpIHtcbiAgICByZXR1cm4gZmV0Y2hSZXRyeShkYXRhSHJlZiwgaXNTZXJ2ZXJSZW5kZXIgPyAzIDogMSkuY2F0Y2goKGVycik9PntcbiAgICAgICAgLy8gV2Ugc2hvdWxkIG9ubHkgdHJpZ2dlciBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb24gaWYgdGhpcyB3YXMgY2F1c2VkXG4gICAgICAgIC8vIG9uIGEgY2xpZW50LXNpZGUgdHJhbnNpdGlvbi4gT3RoZXJ3aXNlLCB3ZSdkIGdldCBpbnRvIGFuIGluZmluaXRlXG4gICAgICAgIC8vIGxvb3AuXG4gICAgICAgIGlmICghaXNTZXJ2ZXJSZW5kZXIpIHtcbiAgICAgICAgICAgICgwLCBfcm91dGVMb2FkZXIpLm1hcmtBc3NldEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xufVxuY2xhc3MgUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZTEsIHF1ZXJ5MSwgYXMxLCB7IGluaXRpYWxQcm9wcyAsIHBhZ2VMb2FkZXIgLCBBcHAgLCB3cmFwQXBwICwgQ29tcG9uZW50OiBDb21wb25lbnQxICwgZXJyOiBlcnIxICwgc3Vic2NyaXB0aW9uICwgaXNGYWxsYmFjayAsIGxvY2FsZSAsIGxvY2FsZXMgLCBkZWZhdWx0TG9jYWxlICwgZG9tYWluTG9jYWxlcyAsIGlzUHJldmlldyAgfSl7XG4gICAgICAgIC8vIFN0YXRpYyBEYXRhIENhY2hlXG4gICAgICAgIHRoaXMuc2RjID0ge1xuICAgICAgICB9O1xuICAgICAgICAvLyBJbi1mbGlnaHQgU2VydmVyIERhdGEgUmVxdWVzdHMsIGZvciBkZWR1cGluZ1xuICAgICAgICB0aGlzLnNkciA9IHtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faWR4ID0gMDtcbiAgICAgICAgdGhpcy5vblBvcFN0YXRlID0gKGUpPT57XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGUuc3RhdGU7XG4gICAgICAgICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgZ2V0IHN0YXRlIGFzIHVuZGVmaW5lZCBmb3IgdHdvIHJlYXNvbnMuXG4gICAgICAgICAgICAgICAgLy8gIDEuIFdpdGggb2xkZXIgc2FmYXJpICg8IDgpIGFuZCBvbGRlciBjaHJvbWUgKDwgMzQpXG4gICAgICAgICAgICAgICAgLy8gIDIuIFdoZW4gdGhlIFVSTCBjaGFuZ2VkIHdpdGggI1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gSW4gdGhlIGJvdGggY2FzZXMsIHdlIGRvbid0IG5lZWQgdG8gcHJvY2VlZCBhbmQgY2hhbmdlIHRoZSByb3V0ZS5cbiAgICAgICAgICAgICAgICAvLyAoYXMgaXQncyBhbHJlYWR5IGNoYW5nZWQpXG4gICAgICAgICAgICAgICAgLy8gQnV0IHdlIGNhbiBzaW1wbHkgcmVwbGFjZSB0aGUgc3RhdGUgd2l0aCB0aGUgbmV3IGNoYW5nZXMuXG4gICAgICAgICAgICAgICAgLy8gQWN0dWFsbHksIGZvciAoMSkgd2UgZG9uJ3QgbmVlZCB0byBub3RoaW5nLiBCdXQgaXQncyBoYXJkIHRvIGRldGVjdCB0aGF0IGV2ZW50LlxuICAgICAgICAgICAgICAgIC8vIFNvLCBkb2luZyB0aGUgZm9sbG93aW5nIGZvciAoMSkgZG9lcyBubyBoYXJtLlxuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGF0aG5hbWU6IHBhdGhuYW1lMSAsIHF1ZXJ5OiBxdWVyeTEgIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoJ3JlcGxhY2VTdGF0ZScsICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IGFkZEJhc2VQYXRoKHBhdGhuYW1lMSksXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeTFcbiAgICAgICAgICAgICAgICB9KSwgKDAsIF91dGlscykuZ2V0VVJMKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RhdGUuX19OKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZvcmNlZFNjcm9sbDtcbiAgICAgICAgICAgIGNvbnN0IHsgdXJsICwgYXM6IGFzMSAsIG9wdGlvbnMgLCBpZHggIH0gPSBzdGF0ZTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pZHggIT09IGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU25hcHNob3QgY3VycmVudCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ19fbmV4dF9zY3JvbGxfJyArIHRoaXMuX2lkeCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBzZWxmLnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBzZWxmLnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBvbGQgc2Nyb2xsIHBvc2l0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnX19uZXh0X3Njcm9sbF8nICsgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JjZWRTY3JvbGwgPSBKU09OLnBhcnNlKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlZFNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgICAgICAgICBjb25zdCB7IHBhdGhuYW1lOiBwYXRobmFtZTEgIH0gPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwodXJsKTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCByZS1yZW5kZXIgb24gaW5pdGlhbCBsb2FkLFxuICAgICAgICAgICAgLy8gY2FuIGJlIGNhdXNlZCBieSBuYXZpZ2F0aW5nIGJhY2sgZnJvbSBhbiBleHRlcm5hbCBzaXRlXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NzciAmJiBhczEgPT09IHRoaXMuYXNQYXRoICYmIHBhdGhuYW1lMSA9PT0gdGhpcy5wYXRobmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBkb3duc3RyZWFtIGFwcGxpY2F0aW9uIHJldHVybnMgZmFsc3ksIHJldHVybi5cbiAgICAgICAgICAgIC8vIFRoZXkgd2lsbCB0aGVuIGJlIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyB0aGUgZXZlbnQuXG4gICAgICAgICAgICBpZiAodGhpcy5fYnBzICYmICF0aGlzLl9icHMoc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2UoJ3JlcGxhY2VTdGF0ZScsIHVybCwgYXMxLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgICBzaGFsbG93OiBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5fc2hhbGxvdyxcbiAgICAgICAgICAgICAgICBsb2NhbGU6IG9wdGlvbnMubG9jYWxlIHx8IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICAgICAgfSksIGZvcmNlZFNjcm9sbCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgY29tcG9uZW50IGtleVxuICAgICAgICB0aGlzLnJvdXRlID0gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZTEpO1xuICAgICAgICAvLyBzZXQgdXAgdGhlIGNvbXBvbmVudCBjYWNoZSAoYnkgcm91dGUga2V5cylcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0ge1xuICAgICAgICB9O1xuICAgICAgICAvLyBXZSBzaG91bGQgbm90IGtlZXAgdGhlIGNhY2hlLCBpZiB0aGVyZSdzIGFuIGVycm9yXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdGhpcyBjYXVzZSBpc3N1ZXMgd2hlbiB3aGVuIGdvaW5nIGJhY2sgYW5kXG4gICAgICAgIC8vIGNvbWUgYWdhaW4gdG8gdGhlIGVycm9yZWQgcGFnZS5cbiAgICAgICAgaWYgKHBhdGhuYW1lMSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0gPSB7XG4gICAgICAgICAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQxLFxuICAgICAgICAgICAgICAgIGluaXRpYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJvcHM6IGluaXRpYWxQcm9wcyxcbiAgICAgICAgICAgICAgICBlcnI6IGVycjEsXG4gICAgICAgICAgICAgICAgX19OX1NTRzogaW5pdGlhbFByb3BzICYmIGluaXRpYWxQcm9wcy5fX05fU1NHLFxuICAgICAgICAgICAgICAgIF9fTl9TU1A6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTUFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10gPSB7XG4gICAgICAgICAgICBDb21wb25lbnQ6IEFwcCxcbiAgICAgICAgICAgIHN0eWxlU2hlZXRzOiBbXVxuICAgICAgICB9O1xuICAgICAgICAvLyBCYWNrd2FyZHMgY29tcGF0IGZvciBSb3V0ZXIucm91dGVyLmV2ZW50c1xuICAgICAgICAvLyBUT0RPOiBTaG91bGQgYmUgcmVtb3ZlIHRoZSBmb2xsb3dpbmcgbWFqb3IgdmVyc2lvbiBhcyBpdCB3YXMgbmV2ZXIgZG9jdW1lbnRlZFxuICAgICAgICB0aGlzLmV2ZW50cyA9IFJvdXRlci5ldmVudHM7XG4gICAgICAgIHRoaXMucGFnZUxvYWRlciA9IHBhZ2VMb2FkZXI7XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTE7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTE7XG4gICAgICAgIC8vIGlmIGF1dG8gcHJlcmVuZGVyZWQgYW5kIGR5bmFtaWMgcm91dGUgd2FpdCB0byB1cGRhdGUgYXNQYXRoXG4gICAgICAgIC8vIHVudGlsIGFmdGVyIG1vdW50IHRvIHByZXZlbnQgaHlkcmF0aW9uIG1pc21hdGNoXG4gICAgICAgIGNvbnN0IGF1dG9FeHBvcnREeW5hbWljID0gKDAsIF9pc0R5bmFtaWMpLmlzRHluYW1pY1JvdXRlKHBhdGhuYW1lMSkgJiYgc2VsZi5fX05FWFRfREFUQV9fLmF1dG9FeHBvcnQ7XG4gICAgICAgIHRoaXMuYXNQYXRoID0gYXV0b0V4cG9ydER5bmFtaWMgPyBwYXRobmFtZTEgOiBhczE7XG4gICAgICAgIHRoaXMuYmFzZVBhdGggPSBiYXNlUGF0aDtcbiAgICAgICAgdGhpcy5zdWIgPSBzdWJzY3JpcHRpb247XG4gICAgICAgIHRoaXMuY2xjID0gbnVsbDtcbiAgICAgICAgdGhpcy5fd3JhcEFwcCA9IHdyYXBBcHA7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0byBpZ25vcmUgZXh0cmEgcG9wU3RhdGUgaW4gc2FmYXJpIG9uIG5hdmlnYXRpbmdcbiAgICAgICAgLy8gYmFjayBmcm9tIGV4dGVybmFsIHNpdGVcbiAgICAgICAgdGhpcy5pc1NzciA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNGYWxsYmFjayA9IGlzRmFsbGJhY2s7XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9ICEhKHNlbGYuX19ORVhUX0RBVEFfXy5nc3NwIHx8IHNlbGYuX19ORVhUX0RBVEFfXy5naXAgfHwgc2VsZi5fX05FWFRfREFUQV9fLmFwcEdpcCAmJiAhc2VsZi5fX05FWFRfREFUQV9fLmdzcCB8fCAhYXV0b0V4cG9ydER5bmFtaWMgJiYgIXNlbGYubG9jYXRpb24uc2VhcmNoICYmICFwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTKTtcbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSAhIWlzUHJldmlldztcbiAgICAgICAgdGhpcy5pc0xvY2FsZURvbWFpbiA9IGZhbHNlO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZXMgPSBsb2NhbGVzO1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TG9jYWxlID0gZGVmYXVsdExvY2FsZTtcbiAgICAgICAgICAgIHRoaXMuZG9tYWluTG9jYWxlcyA9IGRvbWFpbkxvY2FsZXM7XG4gICAgICAgICAgICB0aGlzLmlzTG9jYWxlRG9tYWluID0gISFkZXRlY3REb21haW5Mb2NhbGUoZG9tYWluTG9jYWxlcywgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgXCJhc1wiIGRvZXNuJ3Qgc3RhcnQgd2l0aCBkb3VibGUgc2xhc2hlcyBvciBlbHNlIGl0IGNhblxuICAgICAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgYXMgaXQncyBjb25zaWRlcmVkIGludmFsaWRcbiAgICAgICAgICAgIGlmIChhczEuc3Vic3RyKDAsIDIpICE9PSAnLy8nKSB7XG4gICAgICAgICAgICAgICAgLy8gaW4gb3JkZXIgZm9yIGBlLnN0YXRlYCB0byB3b3JrIG9uIHRoZSBgb25wb3BzdGF0ZWAgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHJlZ2lzdGVyIHRoZSBpbml0aWFsIHJvdXRlIHVwb24gaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuX3Nob3VsZFJlc29sdmVIcmVmID0gYXMxICE9PSBwYXRobmFtZTE7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZSgncmVwbGFjZVN0YXRlJywgKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUxKSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5MVxuICAgICAgICAgICAgICAgIH0pLCAoMCwgX3V0aWxzKS5nZXRVUkwoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAgICAgLy8gZW5hYmxlIGN1c3RvbSBzY3JvbGwgcmVzdG9yYXRpb24gaGFuZGxpbmcgd2hlbiBhdmFpbGFibGVcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBmYWxsYmFjayB0byBicm93c2VyJ3MgZGVmYXVsdCBoYW5kbGluZ1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgICAgICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsb2FkKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgKiBHbyBiYWNrIGluIGhpc3RvcnlcbiAgICovIGJhY2soKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gICAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYHB1c2hTdGF0ZWAgd2l0aCBhcmd1bWVudHNcbiAgICogQHBhcmFtIHVybCBvZiB0aGUgcm91dGVcbiAgICogQHBhcmFtIGFzIG1hc2tzIGB1cmxgIGZvciB0aGUgYnJvd3NlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3QgeW91IGNhbiBkZWZpbmUgYHNoYWxsb3dgIGFuZCBvdGhlciBvcHRpb25zXG4gICAqLyBwdXNoKHVybCwgYXMsIG9wdGlvbnMgPSB7XG4gICAgfSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGluIHRoZSBmdXR1cmUgd2hlbiB3ZSB1cGRhdGUgaGlzdG9yeSBiZWZvcmUgcm91dGUgY2hhbmdlXG4gICAgICAgICAgICAvLyBpcyBjb21wbGV0ZSwgYXMgdGhlIHBvcHN0YXRlIGV2ZW50IHNob3VsZCBoYW5kbGUgdGhpcyBjYXB0dXJlLlxuICAgICAgICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU25hcHNob3Qgc2Nyb2xsIHBvc2l0aW9uIHJpZ2h0IGJlZm9yZSBuYXZpZ2F0aW5nIHRvIGEgbmV3IHBhZ2U6XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ19fbmV4dF9zY3JvbGxfJyArIHRoaXMuX2lkeCwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogc2VsZi5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHNlbGYucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKHsgdXJsICwgYXMgIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3B1c2hTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICogUGVyZm9ybXMgYSBgcmVwbGFjZVN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovIHJlcGxhY2UodXJsLCBhcywgb3B0aW9ucyA9IHtcbiAgICB9KSB7XG4gICAgICAgICh7IHVybCAsIGFzICB9ID0gcHJlcGFyZVVybEFzKHRoaXMsIHVybCwgYXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdyZXBsYWNlU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgYXN5bmMgY2hhbmdlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucywgZm9yY2VkU2Nyb2xsKSB7XG4gICAgICAgIGlmICghaXNMb2NhbFVSTCh1cmwpKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaG91bGRSZXNvbHZlSHJlZiA9IHVybCA9PT0gYXMgfHwgb3B0aW9ucy5faCB8fCBvcHRpb25zLl9zaG91bGRSZXNvbHZlSHJlZjtcbiAgICAgICAgLy8gZm9yIHN0YXRpYyBwYWdlcyB3aXRoIHF1ZXJ5IHBhcmFtcyBpbiB0aGUgVVJMIHdlIGRlbGF5XG4gICAgICAgIC8vIG1hcmtpbmcgdGhlIHJvdXRlciByZWFkeSB1bnRpbCBhZnRlciB0aGUgcXVlcnkgaXMgdXBkYXRlZFxuICAgICAgICBpZiAob3B0aW9ucy5faCkge1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2TG9jYWxlID0gdGhpcy5sb2NhbGU7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZSA9IG9wdGlvbnMubG9jYWxlID09PSBmYWxzZSA/IHRoaXMuZGVmYXVsdExvY2FsZSA6IG9wdGlvbnMubG9jYWxlIHx8IHRoaXMubG9jYWxlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IHRoaXMubG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGFyc2VkQXMgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMpO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxlUGF0aFJlc3VsdCA9ICgwLCBfbm9ybWFsaXplTG9jYWxlUGF0aCkubm9ybWFsaXplTG9jYWxlUGF0aChwYXJzZWRBcy5wYXRobmFtZSwgdGhpcy5sb2NhbGVzKTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUgPSBsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlO1xuICAgICAgICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gYWRkQmFzZVBhdGgocGFyc2VkQXMucGF0aG5hbWUpO1xuICAgICAgICAgICAgICAgIGFzID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpO1xuICAgICAgICAgICAgICAgIHVybCA9IGFkZEJhc2VQYXRoKCgwLCBfbm9ybWFsaXplTG9jYWxlUGF0aCkubm9ybWFsaXplTG9jYWxlUGF0aChoYXNCYXNlUGF0aCh1cmwpID8gZGVsQmFzZVBhdGgodXJsKSA6IHVybCwgdGhpcy5sb2NhbGVzKS5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGlkTmF2aWdhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGluIHRoZSBlbnYgY2hlY2sgYWdhaW4gc2luY2UgcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgICAgICAgLy8gbW92ZXMgdGhpcyBvbiBpdHMgb3duIGR1ZSB0byB0aGUgcmV0dXJuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGxvY2FsZSBpc24ndCBjb25maWd1cmVkIGhhcmQgbmF2aWdhdGUgdG8gc2hvdyA0MDQgcGFnZVxuICAgICAgICAgICAgICAgIGlmICghKChyZWYgPSB0aGlzLmxvY2FsZXMpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmLmluY2x1ZGVzKHRoaXMubG9jYWxlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRMb2NhbGUocGFyc2VkQXMucGF0aG5hbWUsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG9mIGJldHRlciBkZWFkIGNvZGUgZWxpbWluYXRpb24gd2l0aCByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgICAgICAgICAgIGRpZE5hdmlnYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkZXRlY3RlZERvbWFpbiA9IGRldGVjdERvbWFpbkxvY2FsZSh0aGlzLmRvbWFpbkxvY2FsZXMsIHVuZGVmaW5lZCwgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB3cmFwIHRoaXMgaW4gdGhlIGVudiBjaGVjayBhZ2FpbiBzaW5jZSByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgICAvLyBtb3ZlcyB0aGlzIG9uIGl0cyBvd24gZHVlIHRvIHRoZSByZXR1cm5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgYXJlIG5hdmlnYXRpbmcgdG8gYSBkb21haW4gbG9jYWxlIGVuc3VyZSB3ZSByZWRpcmVjdCB0byB0aGVcbiAgICAgICAgICAgICAgICAvLyBjb3JyZWN0IGRvbWFpblxuICAgICAgICAgICAgICAgIGlmICghZGlkTmF2aWdhdGUgJiYgZGV0ZWN0ZWREb21haW4gJiYgdGhpcy5pc0xvY2FsZURvbWFpbiAmJiBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICE9PSBkZXRlY3RlZERvbWFpbi5kb21haW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNOb0Jhc2VQYXRoID0gZGVsQmFzZVBhdGgoYXMpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBodHRwJHtkZXRlY3RlZERvbWFpbi5odHRwID8gJycgOiAncyd9Oi8vJHtkZXRlY3RlZERvbWFpbi5kb21haW59JHthZGRCYXNlUGF0aChgJHt0aGlzLmxvY2FsZSA9PT0gZGV0ZWN0ZWREb21haW4uZGVmYXVsdExvY2FsZSA/ICcnIDogYC8ke3RoaXMubG9jYWxlfWB9JHthc05vQmFzZVBhdGggPT09ICcvJyA/ICcnIDogYXNOb0Jhc2VQYXRofWAgfHwgJy8nKX1gO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdhcyBwcmV2aW91c2x5IGEgcmV0dXJuIGJ1dCB3YXMgcmVtb3ZlZCBpbiBmYXZvclxuICAgICAgICAgICAgICAgICAgICAvLyBvZiBiZXR0ZXIgZGVhZCBjb2RlIGVsaW1pbmF0aW9uIHdpdGggcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgICAgICAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpZE5hdmlnYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpPT57XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLl9oKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3NyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWFya2luZyByb3V0ZSBjaGFuZ2VzIGFzIGEgbmF2aWdhdGlvbiBzdGFydCBlbnRyeVxuICAgICAgICBpZiAoX3V0aWxzLlNUKSB7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKCdyb3V0ZUNoYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgc2hhbGxvdyA9ZmFsc2UgIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCByb3V0ZVByb3BzID0ge1xuICAgICAgICAgICAgc2hhbGxvd1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5faW5GbGlnaHRSb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5hYm9ydENvbXBvbmVudExvYWQodGhpcy5faW5GbGlnaHRSb3V0ZSwgcm91dGVQcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgYXMgPSBhZGRCYXNlUGF0aChhZGRMb2NhbGUoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsIG9wdGlvbnMubG9jYWxlLCB0aGlzLmRlZmF1bHRMb2NhbGUpKTtcbiAgICAgICAgY29uc3QgY2xlYW5lZEFzID0gZGVsTG9jYWxlKGhhc0Jhc2VQYXRoKGFzKSA/IGRlbEJhc2VQYXRoKGFzKSA6IGFzLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIHRoaXMuX2luRmxpZ2h0Um91dGUgPSBhcztcbiAgICAgICAgbGV0IGxvY2FsZUNoYW5nZSA9IHByZXZMb2NhbGUgIT09IHRoaXMubG9jYWxlO1xuICAgICAgICAvLyBJZiB0aGUgdXJsIGNoYW5nZSBpcyBvbmx5IHJlbGF0ZWQgdG8gYSBoYXNoIGNoYW5nZVxuICAgICAgICAvLyBXZSBzaG91bGQgbm90IHByb2NlZWQuIFdlIHNob3VsZCBvbmx5IGNoYW5nZSB0aGUgc3RhdGUuXG4gICAgICAgIC8vIFdBUk5JTkc6IGBfaGAgaXMgYW4gaW50ZXJuYWwgb3B0aW9uIGZvciBoYW5kaW5nIE5leHQuanMgY2xpZW50LXNpZGVcbiAgICAgICAgLy8gaHlkcmF0aW9uLiBZb3VyIGFwcCBzaG91bGQgX25ldmVyXyB1c2UgdGhpcyBwcm9wZXJ0eS4gSXQgbWF5IGNoYW5nZSBhdFxuICAgICAgICAvLyBhbnkgdGltZSB3aXRob3V0IG5vdGljZS5cbiAgICAgICAgaWYgKCFvcHRpb25zLl9oICYmIHRoaXMub25seUFIYXNoQ2hhbmdlKGNsZWFuZWRBcykgJiYgIWxvY2FsZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5hc1BhdGggPSBjbGVhbmVkQXM7XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VTdGFydCcsIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvIHdlIG5lZWQgdGhlIHJlc29sdmVkIGhyZWYgd2hlbiBvbmx5IGEgaGFzaCBjaGFuZ2U/XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvSGFzaChjbGVhbmVkQXMpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkodGhpcy5jb21wb25lbnRzW3RoaXMucm91dGVdLCBudWxsKTtcbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZUNvbXBsZXRlJywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcnNlZCA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybCh1cmwpO1xuICAgICAgICBsZXQgeyBwYXRobmFtZTogcGF0aG5hbWUxICwgcXVlcnk6IHF1ZXJ5MSAgfSA9IHBhcnNlZDtcbiAgICAgICAgLy8gVGhlIGJ1aWxkIG1hbmlmZXN0IG5lZWRzIHRvIGJlIGxvYWRlZCBiZWZvcmUgYXV0by1zdGF0aWMgZHluYW1pYyBwYWdlc1xuICAgICAgICAvLyBnZXQgdGhlaXIgcXVlcnkgcGFyYW1ldGVycyB0byBhbGxvdyBlbnN1cmluZyB0aGV5IGNhbiBiZSBwYXJzZWQgcHJvcGVybHlcbiAgICAgICAgLy8gd2hlbiByZXdyaXR0ZW4gdG9cbiAgICAgICAgbGV0IHBhZ2VzLCByZXdyaXRlcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KCk7XG4gICAgICAgICAgICAoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyAgfSA9IGF3YWl0ICgwLCBfcm91dGVMb2FkZXIpLmdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycjEpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGZhaWwgdG8gcmVzb2x2ZSB0aGUgcGFnZSBsaXN0IG9yIGNsaWVudC1idWlsZCBtYW5pZmVzdCwgd2UgbXVzdFxuICAgICAgICAgICAgLy8gZG8gYSBzZXJ2ZXItc2lkZSB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhcztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhc2tlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgVVJMIHdlIHNob3VsZCByZWxvYWQgdGhlIGN1cnJlbnQgcGFnZVxuICAgICAgICAvLyAobm90IGxvY2F0aW9uLnJlbG9hZCgpIGJ1dCByZWxvYWQgZ2V0SW5pdGlhbFByb3BzIGFuZCBvdGhlciBOZXh0LmpzIHN0dWZmcylcbiAgICAgICAgLy8gV2UgYWxzbyBuZWVkIHRvIHNldCB0aGUgbWV0aG9kID0gcmVwbGFjZVN0YXRlIGFsd2F5c1xuICAgICAgICAvLyBhcyB0aGlzIHNob3VsZCBub3QgZ28gaW50byB0aGUgaGlzdG9yeSAoVGhhdCdzIGhvdyBicm93c2VycyB3b3JrKVxuICAgICAgICAvLyBXZSBzaG91bGQgY29tcGFyZSB0aGUgbmV3IGFzUGF0aCB0byB0aGUgY3VycmVudCBhc1BhdGgsIG5vdCB0aGUgdXJsXG4gICAgICAgIGlmICghdGhpcy51cmxJc05ldyhjbGVhbmVkQXMpICYmICFsb2NhbGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIG1ldGhvZCA9ICdyZXBsYWNlU3RhdGUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdlIG5lZWQgdG8gcmVzb2x2ZSB0aGUgYXMgdmFsdWUgdXNpbmcgcmV3cml0ZXMgZm9yIGR5bmFtaWMgU1NHXG4gICAgICAgIC8vIHBhZ2VzIHRvIGFsbG93IGJ1aWxkaW5nIHRoZSBkYXRhIFVSTCBjb3JyZWN0bHlcbiAgICAgICAgbGV0IHJlc29sdmVkQXMgPSBhcztcbiAgICAgICAgLy8gdXJsIGFuZCBhcyBzaG91bGQgYWx3YXlzIGJlIHByZWZpeGVkIHdpdGggYmFzZVBhdGggYnkgdGhpc1xuICAgICAgICAvLyBwb2ludCBieSBlaXRoZXIgbmV4dC9saW5rIG9yIHJvdXRlci5wdXNoL3JlcGxhY2Ugc28gc3RyaXAgdGhlXG4gICAgICAgIC8vIGJhc2VQYXRoIGZyb20gdGhlIHBhdGhuYW1lIHRvIG1hdGNoIHRoZSBwYWdlcyBkaXIgMS10by0xXG4gICAgICAgIHBhdGhuYW1lMSA9IHBhdGhuYW1lMSA/ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goZGVsQmFzZVBhdGgocGF0aG5hbWUxKSkgOiBwYXRobmFtZTE7XG4gICAgICAgIGlmIChzaG91bGRSZXNvbHZlSHJlZiAmJiBwYXRobmFtZTEgIT09ICcvX2Vycm9yJykge1xuICAgICAgICAgICAgb3B0aW9ucy5fc2hvdWxkUmVzb2x2ZUhyZWYgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMgJiYgYXMuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV3cml0ZXNSZXN1bHQgPSAoMCwgX3Jlc29sdmVSZXdyaXRlcykuZGVmYXVsdChhZGRCYXNlUGF0aChhZGRMb2NhbGUoY2xlYW5lZEFzLCB0aGlzLmxvY2FsZSkpLCBwYWdlcywgcmV3cml0ZXMsIHF1ZXJ5MSwgKHApPT5yZXNvbHZlRHluYW1pY1JvdXRlKHAsIHBhZ2VzKVxuICAgICAgICAgICAgICAgICwgdGhpcy5sb2NhbGVzKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlZEFzID0gcmV3cml0ZXNSZXN1bHQuYXNQYXRoO1xuICAgICAgICAgICAgICAgIGlmIChyZXdyaXRlc1Jlc3VsdC5tYXRjaGVkUGFnZSAmJiByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBkaXJlY3RseSBtYXRjaGVzIGEgcGFnZSB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgaHJlZiB0b1xuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyB0aGUgY29ycmVjdCBwYWdlIGNodW5rIHRvIGJlIGxvYWRlZFxuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTEgPSByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWY7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IGFkZEJhc2VQYXRoKHBhdGhuYW1lMSk7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKHBhdGhuYW1lMSwgcGFnZXMpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZWQucGF0aG5hbWUgIT09IHBhdGhuYW1lMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTEgPSBwYXJzZWQucGF0aG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IGFkZEJhc2VQYXRoKHBhdGhuYW1lMSk7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlID0gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZTEpO1xuICAgICAgICBpZiAoIWlzTG9jYWxVUkwoYXMpKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBocmVmOiBcIiR7dXJsfVwiIGFuZCBhczogXCIke2FzfVwiLCByZWNlaXZlZCByZWxhdGl2ZSBocmVmIGFuZCBleHRlcm5hbCBhc2AgKyBgXFxuU2VlIG1vcmUgaW5mbzogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvaW52YWxpZC1yZWxhdGl2ZS11cmwtZXh0ZXJuYWwtYXNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXM7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZWRBcyA9IGRlbExvY2FsZShkZWxCYXNlUGF0aChyZXNvbHZlZEFzKSwgdGhpcy5sb2NhbGUpO1xuICAgICAgICBpZiAoKDAsIF9pc0R5bmFtaWMpLmlzRHluYW1pY1JvdXRlKHJvdXRlKSkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkQXMgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwocmVzb2x2ZWRBcyk7XG4gICAgICAgICAgICBjb25zdCBhc1BhdGhuYW1lID0gcGFyc2VkQXMucGF0aG5hbWU7XG4gICAgICAgICAgICBjb25zdCByb3V0ZVJlZ2V4ID0gKDAsIF9yb3V0ZVJlZ2V4KS5nZXRSb3V0ZVJlZ2V4KHJvdXRlKTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlTWF0Y2ggPSAoMCwgX3JvdXRlTWF0Y2hlcikuZ2V0Um91dGVNYXRjaGVyKHJvdXRlUmVnZXgpKGFzUGF0aG5hbWUpO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkSW50ZXJwb2xhdGUgPSByb3V0ZSA9PT0gYXNQYXRobmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGludGVycG9sYXRlZEFzID0gc2hvdWxkSW50ZXJwb2xhdGUgPyBpbnRlcnBvbGF0ZUFzKHJvdXRlLCBhc1BhdGhuYW1lLCBxdWVyeTEpIDoge1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghcm91dGVNYXRjaCB8fCBzaG91bGRJbnRlcnBvbGF0ZSAmJiAhaW50ZXJwb2xhdGVkQXMucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWlzc2luZ1BhcmFtcyA9IE9iamVjdC5rZXlzKHJvdXRlUmVnZXguZ3JvdXBzKS5maWx0ZXIoKHBhcmFtKT0+IXF1ZXJ5MVtwYXJhbV1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nUGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtzaG91bGRJbnRlcnBvbGF0ZSA/IGBJbnRlcnBvbGF0aW5nIGhyZWZgIDogYE1pc21hdGNoaW5nIFxcYGFzXFxgIGFuZCBcXGBocmVmXFxgYH0gZmFpbGVkIHRvIG1hbnVhbGx5IHByb3ZpZGUgYCArIGB0aGUgcGFyYW1zOiAke21pc3NpbmdQYXJhbXMuam9pbignLCAnKX0gaW4gdGhlIFxcYGhyZWZcXGAncyBcXGBxdWVyeVxcYGApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigoc2hvdWxkSW50ZXJwb2xhdGUgPyBgVGhlIHByb3ZpZGVkIFxcYGhyZWZcXGAgKCR7dXJsfSkgdmFsdWUgaXMgbWlzc2luZyBxdWVyeSB2YWx1ZXMgKCR7bWlzc2luZ1BhcmFtcy5qb2luKCcsICcpfSkgdG8gYmUgaW50ZXJwb2xhdGVkIHByb3Blcmx5LiBgIDogYFRoZSBwcm92aWRlZCBcXGBhc1xcYCB2YWx1ZSAoJHthc1BhdGhuYW1lfSkgaXMgaW5jb21wYXRpYmxlIHdpdGggdGhlIFxcYGhyZWZcXGAgdmFsdWUgKCR7cm91dGV9KS4gYCkgKyBgUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy8ke3Nob3VsZEludGVycG9sYXRlID8gJ2hyZWYtaW50ZXJwb2xhdGlvbi1mYWlsZWQnIDogJ2luY29tcGF0aWJsZS1ocmVmLWFzJ31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNob3VsZEludGVycG9sYXRlKSB7XG4gICAgICAgICAgICAgICAgYXMgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgICAgICB9LCBwYXJzZWRBcywge1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogaW50ZXJwb2xhdGVkQXMucmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5MSwgaW50ZXJwb2xhdGVkQXMucGFyYW1zKVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTWVyZ2UgcGFyYW1zIGludG8gYHF1ZXJ5YCwgb3ZlcndyaXRpbmcgYW55IHNwZWNpZmllZCBpbiBzZWFyY2hcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHF1ZXJ5MSwgcm91dGVNYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgICAgICAgIGxldCByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhyb3V0ZSwgcGF0aG5hbWUxLCBxdWVyeTEsIGFzLCByZXNvbHZlZEFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIGxldCB7IGVycm9yICwgcHJvcHMgLCBfX05fU1NHICwgX19OX1NTUCAgfSA9IHJvdXRlSW5mbztcbiAgICAgICAgICAgIC8vIGhhbmRsZSByZWRpcmVjdCBvbiBjbGllbnQtdHJhbnNpdGlvblxuICAgICAgICAgICAgaWYgKChfX05fU1NHIHx8IF9fTl9TU1ApICYmIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzLnBhZ2VQcm9wcyAmJiBwcm9wcy5wYWdlUHJvcHMuX19OX1JFRElSRUNUKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvcHMucGFnZVByb3BzLl9fTl9SRURJUkVDVDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgZGVzdGluYXRpb24gaXMgaW50ZXJuYWwgKHJlc29sdmVzIHRvIGEgcGFnZSkgYW5kIGF0dGVtcHRcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xpZW50LW5hdmlnYXRpb24gaWYgaXQgaXMgZmFsbGluZyBiYWNrIHRvIGhhcmQgbmF2aWdhdGlvbiBpZlxuICAgICAgICAgICAgICAgICAgICAvLyBpdCdzIG5vdFxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb24uc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRIcmVmID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZEhyZWYucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKHBhcnNlZEhyZWYucGF0aG5hbWUsIHBhZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdXJsOiBuZXdVcmwgLCBhczogbmV3QXMgIH0gPSBwcmVwYXJlVXJsQXModGhpcywgZGVzdGluYXRpb24sIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZShtZXRob2QsIG5ld1VybCwgbmV3QXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZGVzdGluYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSAhIXByb3BzLl9fTl9QUkVWSUVXO1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBTU0cgZGF0YSA0MDRcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMubm90Rm91bmQgPT09IFNTR19EQVRBX05PVF9GT1VORCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm90Rm91bmRSb3V0ZTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQoJy80MDQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdEZvdW5kUm91dGUgPSAnLzQwNCc7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdEZvdW5kUm91dGUgPSAnL19lcnJvcic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvID0gYXdhaXQgdGhpcy5nZXRSb3V0ZUluZm8obm90Rm91bmRSb3V0ZSwgbm90Rm91bmRSb3V0ZSwgcXVlcnkxLCBhcywgcmVzb2x2ZWRBcywge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhbGxvdzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdiZWZvcmVIaXN0b3J5Q2hhbmdlJywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcHBDb21wID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICB3aW5kb3cubmV4dC5pc1ByZXJlbmRlcmVkID0gYXBwQ29tcC5nZXRJbml0aWFsUHJvcHMgPT09IGFwcENvbXAub3JpZ0dldEluaXRpYWxQcm9wcyAmJiAhcm91dGVJbmZvLkNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5faCAmJiBwYXRobmFtZTEgPT09ICcvX2Vycm9yJyAmJiAoKHJlZiA9IHNlbGYuX19ORVhUX0RBVEFfXy5wcm9wcykgPT09IG51bGwgfHwgcmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMSA9IHJlZi5wYWdlUHJvcHMpID09PSBudWxsIHx8IHJlZjEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZjEuc3RhdHVzQ29kZSkgPT09IDUwMCAmJiAocHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnBhZ2VQcm9wcykpIHtcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgc3RhdHVzQ29kZSBpcyBzdGlsbCBjb3JyZWN0IGZvciBzdGF0aWMgNTAwIHBhZ2VcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHVwZGF0aW5nIHF1ZXJ5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgcHJvcHMucGFnZVByb3BzLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzaGFsbG93IHJvdXRpbmcgaXMgb25seSBhbGxvd2VkIGZvciBzYW1lIHBhZ2UgVVJMIGNoYW5nZXMuXG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkU2hhbGxvd1JvdXRlID0gb3B0aW9ucy5zaGFsbG93ICYmIHRoaXMucm91dGUgPT09IHJvdXRlO1xuICAgICAgICAgICAgdmFyIF9zY3JvbGw7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRTY3JvbGwgPSAoX3Njcm9sbCA9IG9wdGlvbnMuc2Nyb2xsKSAhPT0gbnVsbCAmJiBfc2Nyb2xsICE9PSB2b2lkIDAgPyBfc2Nyb2xsIDogIWlzVmFsaWRTaGFsbG93Um91dGU7XG4gICAgICAgICAgICBjb25zdCByZXNldFNjcm9sbCA9IHNob3VsZFNjcm9sbCA/IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgIH0gOiBudWxsO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXQocm91dGUsIHBhdGhuYW1lMSwgcXVlcnkxLCBjbGVhbmVkQXMsIHJvdXRlSW5mbywgZm9yY2VkU2Nyb2xsICE9PSBudWxsICYmIGZvcmNlZFNjcm9sbCAhPT0gdm9pZCAwID8gZm9yY2VkU2Nyb2xsIDogcmVzZXRTY3JvbGwpLmNhdGNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGlmIChlLmNhbmNlbGxlZCkgZXJyb3IgPSBlcnJvciB8fCBlO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyb3IsIGNsZWFuZWRBcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA9IHRoaXMubG9jYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VDb21wbGV0ZScsIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnIxKSB7XG4gICAgICAgICAgICBpZiAoZXJyMS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnIxO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucyA9IHtcbiAgICB9KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5oaXN0b3J5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFdhcm5pbmc6IHdpbmRvdy5oaXN0b3J5IGlzIG5vdCBhdmFpbGFibGUuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeVttZXRob2RdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFdhcm5pbmc6IHdpbmRvdy5oaXN0b3J5LiR7bWV0aG9kfSBpcyBub3QgYXZhaWxhYmxlYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRob2QgIT09ICdwdXNoU3RhdGUnIHx8ICgwLCBfdXRpbHMpLmdldFVSTCgpICE9PSBhcykge1xuICAgICAgICAgICAgdGhpcy5fc2hhbGxvdyA9IG9wdGlvbnMuc2hhbGxvdztcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5W21ldGhvZF0oe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBhcyxcbiAgICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICAgIF9fTjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpZHg6IHRoaXMuX2lkeCA9IG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgPyB0aGlzLl9pZHggOiB0aGlzLl9pZHggKyAxXG4gICAgICAgICAgICB9LCAvLyBNb3N0IGJyb3dzZXJzIGN1cnJlbnRseSBpZ25vcmVzIHRoaXMgcGFyYW1ldGVyLCBhbHRob3VnaCB0aGV5IG1heSB1c2UgaXQgaW4gdGhlIGZ1dHVyZS5cbiAgICAgICAgICAgIC8vIFBhc3NpbmcgdGhlIGVtcHR5IHN0cmluZyBoZXJlIHNob3VsZCBiZSBzYWZlIGFnYWluc3QgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIG1ldGhvZC5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IaXN0b3J5L3JlcGxhY2VTdGF0ZVxuICAgICAgICAgICAgJycsIGFzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBoYW5kbGVSb3V0ZUluZm9FcnJvcihlcnIsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJvdXRlUHJvcHMsIGxvYWRFcnJvckZhaWwpIHtcbiAgICAgICAgaWYgKGVyci5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIC8vIGJ1YmJsZSB1cCBjYW5jZWxsYXRpb24gZXJyb3JzXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgwLCBfcm91dGVMb2FkZXIpLmlzQXNzZXRFcnJvcihlcnIpIHx8IGxvYWRFcnJvckZhaWwpIHtcbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VFcnJvcicsIGVyciwgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgLy8gSWYgd2UgY2FuJ3QgbG9hZCB0aGUgcGFnZSBpdCBjb3VsZCBiZSBvbmUgb2YgZm9sbG93aW5nIHJlYXNvbnNcbiAgICAgICAgICAgIC8vICAxLiBQYWdlIGRvZXNuJ3QgZXhpc3RzXG4gICAgICAgICAgICAvLyAgMi4gUGFnZSBkb2VzIGV4aXN0IGluIGEgZGlmZmVyZW50IHpvbmVcbiAgICAgICAgICAgIC8vICAzLiBJbnRlcm5hbCBlcnJvciB3aGlsZSBsb2FkaW5nIHRoZSBwYWdlXG4gICAgICAgICAgICAvLyBTbywgZG9pbmcgYSBoYXJkIHJlbG9hZCBpcyB0aGUgcHJvcGVyIHdheSB0byBkZWFsIHdpdGggdGhpcy5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXM7XG4gICAgICAgICAgICAvLyBDaGFuZ2luZyB0aGUgVVJMIGRvZXNuJ3QgYmxvY2sgZXhlY3V0aW5nIHRoZSBjdXJyZW50IGNvZGUgcGF0aC5cbiAgICAgICAgICAgIC8vIFNvIGxldCdzIHRocm93IGEgY2FuY2VsbGF0aW9uIGVycm9yIHN0b3AgdGhlIHJvdXRpbmcgbG9naWMuXG4gICAgICAgICAgICB0aHJvdyBidWlsZENhbmNlbGxhdGlvbkVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBDb21wb25lbnQxO1xuICAgICAgICAgICAgbGV0IHN0eWxlU2hlZXRzO1xuICAgICAgICAgICAgbGV0IHByb3BzO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBDb21wb25lbnQxID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygc3R5bGVTaGVldHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgKHsgcGFnZTogQ29tcG9uZW50MSAsIHN0eWxlU2hlZXRzICB9ID0gYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudCgnL19lcnJvcicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBwcm9wcyxcbiAgICAgICAgICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudDEsXG4gICAgICAgICAgICAgICAgc3R5bGVTaGVldHMsXG4gICAgICAgICAgICAgICAgZXJyLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIXJvdXRlSW5mby5wcm9wcykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlSW5mby5wcm9wcyA9IGF3YWl0IHRoaXMuZ2V0SW5pdGlhbFByb3BzKENvbXBvbmVudDEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZ2lwRXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGVycm9yIHBhZ2UgYGdldEluaXRpYWxQcm9wc2A6ICcsIGdpcEVycik7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlSW5mby5wcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm91dGVJbmZvO1xuICAgICAgICB9IGNhdGNoIChyb3V0ZUluZm9FcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJvdXRlSW5mb0Vycm9yKHJvdXRlSW5mb0VyciwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcm91dGVQcm9wcywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0Um91dGVJbmZvKHJvdXRlLCBwYXRobmFtZSwgcXVlcnksIGFzLCByZXNvbHZlZEFzLCByb3V0ZVByb3BzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1JvdXRlSW5mbyA9IHRoaXMuY29tcG9uZW50c1tyb3V0ZV07XG4gICAgICAgICAgICBpZiAocm91dGVQcm9wcy5zaGFsbG93ICYmIGV4aXN0aW5nUm91dGVJbmZvICYmIHRoaXMucm91dGUgPT09IHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nUm91dGVJbmZvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FjaGVkUm91dGVJbmZvID0gZXhpc3RpbmdSb3V0ZUluZm8gJiYgJ2luaXRpYWwnIGluIGV4aXN0aW5nUm91dGVJbmZvID8gdW5kZWZpbmVkIDogZXhpc3RpbmdSb3V0ZUluZm87XG4gICAgICAgICAgICBjb25zdCByb3V0ZUluZm8gPSBjYWNoZWRSb3V0ZUluZm8gPyBjYWNoZWRSb3V0ZUluZm8gOiBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KHJvdXRlKS50aGVuKChyZXMpPT4oe1xuICAgICAgICAgICAgICAgICAgICBDb21wb25lbnQ6IHJlcy5wYWdlLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZVNoZWV0czogcmVzLnN0eWxlU2hlZXRzLFxuICAgICAgICAgICAgICAgICAgICBfX05fU1NHOiByZXMubW9kLl9fTl9TU0csXG4gICAgICAgICAgICAgICAgICAgIF9fTl9TU1A6IHJlcy5tb2QuX19OX1NTUFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgeyBDb21wb25lbnQ6IENvbXBvbmVudDEgLCBfX05fU1NHICwgX19OX1NTUCAgfSA9IHJvdXRlSW5mbztcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBpc1ZhbGlkRWxlbWVudFR5cGUgIH0gPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZEVsZW1lbnRUeXBlKENvbXBvbmVudDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGRlZmF1bHQgZXhwb3J0IGlzIG5vdCBhIFJlYWN0IENvbXBvbmVudCBpbiBwYWdlOiBcIiR7cGF0aG5hbWV9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGF0YUhyZWY7XG4gICAgICAgICAgICBpZiAoX19OX1NTRyB8fCBfX05fU1NQKSB7XG4gICAgICAgICAgICAgICAgZGF0YUhyZWYgPSB0aGlzLnBhZ2VMb2FkZXIuZ2V0RGF0YUhyZWYoKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlcbiAgICAgICAgICAgICAgICB9KSwgcmVzb2x2ZWRBcywgX19OX1NTRywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBhd2FpdCB0aGlzLl9nZXREYXRhKCgpPT5fX05fU1NHID8gdGhpcy5fZ2V0U3RhdGljRGF0YShkYXRhSHJlZikgOiBfX05fU1NQID8gdGhpcy5fZ2V0U2VydmVyRGF0YShkYXRhSHJlZikgOiB0aGlzLmdldEluaXRpYWxQcm9wcyhDb21wb25lbnQxLCAvLyB3ZSBwcm92aWRlIEFwcFRyZWUgbGF0ZXIgc28gdGhpcyBuZWVkcyB0byBiZSBgYW55YFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBhc1BhdGg6IGFzLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzOiB0aGlzLmxvY2FsZXMsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRMb2NhbGU6IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gcHJvcHM7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHNbcm91dGVdID0gcm91dGVJbmZvO1xuICAgICAgICAgICAgcmV0dXJuIHJvdXRlSW5mbztcbiAgICAgICAgfSBjYXRjaCAoZXJyMikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUm91dGVJbmZvRXJyb3IoZXJyMiwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0KHJvdXRlLCBwYXRobmFtZSwgcXVlcnksIGFzLCBkYXRhLCByZXNldFNjcm9sbCkge1xuICAgICAgICB0aGlzLmlzRmFsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5hc1BhdGggPSBhcztcbiAgICAgICAgcmV0dXJuIHRoaXMubm90aWZ5KGRhdGEsIHJlc2V0U2Nyb2xsKTtcbiAgICB9XG4gICAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgYmVmb3JlIHJlcGxhY2luZyByb3V0ZXIgc3RhdGVcbiAgICogQHBhcmFtIGNiIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkXG4gICAqLyBiZWZvcmVQb3BTdGF0ZShjYikge1xuICAgICAgICB0aGlzLl9icHMgPSBjYjtcbiAgICB9XG4gICAgb25seUFIYXNoQ2hhbmdlKGFzKSB7XG4gICAgICAgIGlmICghdGhpcy5hc1BhdGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgW29sZFVybE5vSGFzaCwgb2xkSGFzaF0gPSB0aGlzLmFzUGF0aC5zcGxpdCgnIycpO1xuICAgICAgICBjb25zdCBbbmV3VXJsTm9IYXNoLCBuZXdIYXNoXSA9IGFzLnNwbGl0KCcjJyk7XG4gICAgICAgIC8vIE1ha2VzIHN1cmUgd2Ugc2Nyb2xsIHRvIHRoZSBwcm92aWRlZCBoYXNoIGlmIHRoZSB1cmwvaGFzaCBhcmUgdGhlIHNhbWVcbiAgICAgICAgaWYgKG5ld0hhc2ggJiYgb2xkVXJsTm9IYXNoID09PSBuZXdVcmxOb0hhc2ggJiYgb2xkSGFzaCA9PT0gbmV3SGFzaCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIHVybHMgYXJlIGNoYW5nZSwgdGhlcmUncyBtb3JlIHRoYW4gYSBoYXNoIGNoYW5nZVxuICAgICAgICBpZiAob2xkVXJsTm9IYXNoICE9PSBuZXdVcmxOb0hhc2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgaGFzaCBoYXMgY2hhbmdlZCwgdGhlbiBpdCdzIGEgaGFzaCBvbmx5IGNoYW5nZS5cbiAgICAgICAgLy8gVGhpcyBjaGVjayBpcyBuZWNlc3NhcnkgdG8gaGFuZGxlIGJvdGggdGhlIGVudGVyIGFuZFxuICAgICAgICAvLyBsZWF2ZSBoYXNoID09PSAnJyBjYXNlcy4gVGhlIGlkZW50aXR5IGNhc2UgZmFsbHMgdGhyb3VnaFxuICAgICAgICAvLyBhbmQgaXMgdHJlYXRlZCBhcyBhIG5leHQgcmVsb2FkLlxuICAgICAgICByZXR1cm4gb2xkSGFzaCAhPT0gbmV3SGFzaDtcbiAgICB9XG4gICAgc2Nyb2xsVG9IYXNoKGFzKSB7XG4gICAgICAgIGNvbnN0IFssIGhhc2hdID0gYXMuc3BsaXQoJyMnKTtcbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBpZiB0aGUgaGFzaCBpcyBqdXN0IGAjYCB3aXRoIG5vIHZhbHVlIG9yIGAjdG9wYFxuICAgICAgICAvLyBUbyBtaXJyb3IgYnJvd3NlcnNcbiAgICAgICAgaWYgKGhhc2ggPT09ICcnIHx8IGhhc2ggPT09ICd0b3AnKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmlyc3Qgd2UgY2hlY2sgaWYgdGhlIGVsZW1lbnQgYnkgaWQgaXMgZm91bmRcbiAgICAgICAgY29uc3QgaWRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpO1xuICAgICAgICBpZiAoaWRFbCkge1xuICAgICAgICAgICAgaWRFbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gZWxlbWVudCB3aXRoIHRoZSBpZCwgd2UgY2hlY2sgdGhlIGBuYW1lYCBwcm9wZXJ0eVxuICAgICAgICAvLyBUbyBtaXJyb3IgYnJvd3NlcnNcbiAgICAgICAgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoaGFzaClbMF07XG4gICAgICAgIGlmIChuYW1lRWwpIHtcbiAgICAgICAgICAgIG5hbWVFbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVybElzTmV3KGFzUGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hc1BhdGggIT09IGFzUGF0aDtcbiAgICB9XG4gICAgLyoqXG4gICAqIFByZWZldGNoIHBhZ2UgY29kZSwgeW91IG1heSB3YWl0IGZvciB0aGUgZGF0YSBkdXJpbmcgcGFnZSByZW5kZXJpbmcuXG4gICAqIFRoaXMgZmVhdHVyZSBvbmx5IHdvcmtzIGluIHByb2R1Y3Rpb24hXG4gICAqIEBwYXJhbSB1cmwgdGhlIGhyZWYgb2YgcHJlZmV0Y2hlZCBwYWdlXG4gICAqIEBwYXJhbSBhc1BhdGggdGhlIGFzIHBhdGggb2YgdGhlIHByZWZldGNoZWQgcGFnZVxuICAgKi8gYXN5bmMgcHJlZmV0Y2godXJsLCBhc1BhdGggPSB1cmwsIG9wdGlvbnMgPSB7XG4gICAgfSkge1xuICAgICAgICBsZXQgcGFyc2VkID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKHVybCk7XG4gICAgICAgIGxldCB7IHBhdGhuYW1lOiBwYXRobmFtZTIgIH0gPSBwYXJzZWQ7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2NhbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUyID0gKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKHBhdGhuYW1lMiwgdGhpcy5sb2NhbGVzKS5wYXRobmFtZTtcbiAgICAgICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZTI7XG4gICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyc2VkQXMgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwoYXNQYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZXMpO1xuICAgICAgICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gbG9jYWxlUGF0aFJlc3VsdC5wYXRobmFtZTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlO1xuICAgICAgICAgICAgICAgIGFzUGF0aCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWdlcyA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5nZXRQYWdlTGlzdCgpO1xuICAgICAgICBsZXQgcmVzb2x2ZWRBcyA9IGFzUGF0aDtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMgJiYgYXNQYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgbGV0IHJld3JpdGVzO1xuICAgICAgICAgICAgKHsgX19yZXdyaXRlczogcmV3cml0ZXMgIH0gPSBhd2FpdCAoMCwgX3JvdXRlTG9hZGVyKS5nZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkpO1xuICAgICAgICAgICAgY29uc3QgcmV3cml0ZXNSZXN1bHQgPSAoMCwgX3Jlc29sdmVSZXdyaXRlcykuZGVmYXVsdChhZGRCYXNlUGF0aChhZGRMb2NhbGUoYXNQYXRoLCB0aGlzLmxvY2FsZSkpLCBwYWdlcywgcmV3cml0ZXMsIHBhcnNlZC5xdWVyeSwgKHApPT5yZXNvbHZlRHluYW1pY1JvdXRlKHAsIHBhZ2VzKVxuICAgICAgICAgICAgLCB0aGlzLmxvY2FsZXMpO1xuICAgICAgICAgICAgcmVzb2x2ZWRBcyA9IGRlbExvY2FsZShkZWxCYXNlUGF0aChyZXdyaXRlc1Jlc3VsdC5hc1BhdGgpLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBpZiAocmV3cml0ZXNSZXN1bHQubWF0Y2hlZFBhZ2UgJiYgcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBkaXJlY3RseSBtYXRjaGVzIGEgcGFnZSB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgaHJlZiB0b1xuICAgICAgICAgICAgICAgIC8vIGFsbG93IHRoZSBjb3JyZWN0IHBhZ2UgY2h1bmsgdG8gYmUgbG9hZGVkXG4gICAgICAgICAgICAgICAgcGF0aG5hbWUyID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmO1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lMjtcbiAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXJzZWQucGF0aG5hbWUsIHBhZ2VzKTtcbiAgICAgICAgICAgIGlmIChwYXJzZWQucGF0aG5hbWUgIT09IHBhdGhuYW1lMikge1xuICAgICAgICAgICAgICAgIHBhdGhuYW1lMiA9IHBhcnNlZC5wYXRobmFtZTtcbiAgICAgICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZTI7XG4gICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3V0ZSA9ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUyKTtcbiAgICAgICAgLy8gUHJlZmV0Y2ggaXMgbm90IHN1cHBvcnRlZCBpbiBkZXZlbG9wbWVudCBtb2RlIGJlY2F1c2UgaXQgd291bGQgdHJpZ2dlciBvbi1kZW1hbmQtZW50cmllc1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMucGFnZUxvYWRlci5faXNTc2cocm91dGUpLnRoZW4oKGlzU3NnKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1NzZyA/IHRoaXMuX2dldFN0YXRpY0RhdGEodGhpcy5wYWdlTG9hZGVyLmdldERhdGFIcmVmKHVybCwgcmVzb2x2ZWRBcywgdHJ1ZSwgdHlwZW9mIG9wdGlvbnMubG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnMubG9jYWxlIDogdGhpcy5sb2NhbGUpKSA6IGZhbHNlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0aGlzLnBhZ2VMb2FkZXJbb3B0aW9ucy5wcmlvcml0eSA/ICdsb2FkUGFnZScgOiAncHJlZmV0Y2gnXShyb3V0ZSksIFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgYXN5bmMgZmV0Y2hDb21wb25lbnQocm91dGUpIHtcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjYW5jZWwgPSB0aGlzLmNsYyA9ICgpPT57XG4gICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZXN1bHQgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIubG9hZFBhZ2Uocm91dGUpO1xuICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgQWJvcnQgZmV0Y2hpbmcgY29tcG9uZW50IGZvciByb3V0ZTogXCIke3JvdXRlfVwiYCk7XG4gICAgICAgICAgICBlcnJvci5jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgICAgICAgIHRoaXMuY2xjID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50UmVzdWx0O1xuICAgIH1cbiAgICBfZ2V0RGF0YShmbikge1xuICAgICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNhbmNlbCA9ICgpPT57XG4gICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNsYyA9IGNhbmNlbDtcbiAgICAgICAgcmV0dXJuIGZuKCkudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgIGlmIChjYW5jZWwgPT09IHRoaXMuY2xjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycjIgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgaW5pdGlhbCBwcm9wcyBjYW5jZWxsZWQnKTtcbiAgICAgICAgICAgICAgICBlcnIyLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2dldFN0YXRpY0RhdGEoZGF0YUhyZWYpIHtcbiAgICAgICAgY29uc3QgeyBocmVmOiBjYWNoZUtleSAgfSA9IG5ldyBVUkwoZGF0YUhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgJiYgIXRoaXMuaXNQcmV2aWV3ICYmIHRoaXMuc2RjW2NhY2hlS2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnNkY1tjYWNoZUtleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCB0aGlzLmlzU3NyKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5zZGNbY2FjaGVLZXldID0gZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2dldFNlcnZlckRhdGEoZGF0YUhyZWYpIHtcbiAgICAgICAgY29uc3QgeyBocmVmOiByZXNvdXJjZUtleSAgfSA9IG5ldyBVUkwoZGF0YUhyZWYsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgaWYgKHRoaXMuc2RyW3Jlc291cmNlS2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2RyW3Jlc291cmNlS2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZHJbcmVzb3VyY2VLZXldID0gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgdGhpcy5pc1NzcikudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNkcltyZXNvdXJjZUtleV07XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSkuY2F0Y2goKGVycjIpPT57XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zZHJbcmVzb3VyY2VLZXldO1xuICAgICAgICAgICAgdGhyb3cgZXJyMjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEluaXRpYWxQcm9wcyhDb21wb25lbnQsIGN0eCkge1xuICAgICAgICBjb25zdCB7IENvbXBvbmVudDogQXBwMSAgfSA9IHRoaXMuY29tcG9uZW50c1snL19hcHAnXTtcbiAgICAgICAgY29uc3QgQXBwVHJlZSA9IHRoaXMuX3dyYXBBcHAoQXBwMSk7XG4gICAgICAgIGN0eC5BcHBUcmVlID0gQXBwVHJlZTtcbiAgICAgICAgcmV0dXJuICgwLCBfdXRpbHMpLmxvYWRHZXRJbml0aWFsUHJvcHMoQXBwMSwge1xuICAgICAgICAgICAgQXBwVHJlZSxcbiAgICAgICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgICAgIHJvdXRlcjogdGhpcyxcbiAgICAgICAgICAgIGN0eFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWJvcnRDb21wb25lbnRMb2FkKGFzLCByb3V0ZVByb3BzKSB7XG4gICAgICAgIGlmICh0aGlzLmNsYykge1xuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICB0aGlzLmNsYygpO1xuICAgICAgICAgICAgdGhpcy5jbGMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vdGlmeShkYXRhLCByZXNldFNjcm9sbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWIoZGF0YSwgdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudCwgcmVzZXRTY3JvbGwpO1xuICAgIH1cbn1cblJvdXRlci5ldmVudHMgPSAoMCwgX21pdHQpLmRlZmF1bHQoKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFJvdXRlcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcCIsImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbnR5cGUgQnJlYWRjcnVtYkl0ZW1Qcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGhyZWY/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQnJlYWRjcnVtYkl0ZW06IFJlYWN0LkZDPEJyZWFkY3J1bWJJdGVtUHJvcHM+ID0gKHtcclxuICBsYWJlbCxcclxuICBocmVmLFxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxsaSBjbGFzc05hbWU9e3N0eWxlc1snYnJlYWRjcnVtYi1pdGVtLWNvbnRhaW5lciddfT5cclxuICAgICAge2hyZWYgPyAoXHJcbiAgICAgICAgPExpbmsgaHJlZj17aHJlZn0+XHJcbiAgICAgICAgICA8YT57bGFiZWx9PC9hPlxyXG4gICAgICAgIDwvTGluaz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8cD57bGFiZWx9PC9wPlxyXG4gICAgICApfVxyXG4gICAgPC9saT5cclxuICApO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBCcmVhZGNydW1iSXRlbSB9IGZyb20gJy4vQnJlYWRjcnVtYkl0ZW0nO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbmV4cG9ydCB0eXBlIEJyZWFkY3J1bWJQcm9wcyA9IHtcclxuICBpdGVtczogQXJyYXk8eyBsYWJlbDogc3RyaW5nOyBocmVmPzogc3RyaW5nIH0+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEJyZWFkY3J1bWI6IFJlYWN0LkZDPEJyZWFkY3J1bWJQcm9wcz4gPSAoeyBpdGVtcyB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDx1bCBjbGFzc05hbWU9e3N0eWxlc1snYnJlYWRjcnVtYi1jb250YWluZXInXX0+XHJcbiAgICAgIHtpdGVtcy5tYXAoKHsgbGFiZWwsIGhyZWYgfSkgPT4gKFxyXG4gICAgICAgIDxCcmVhZGNydW1iSXRlbSBrZXk9e2xhYmVsfSBsYWJlbD17bGFiZWx9IGhyZWY9e2hyZWZ9IC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC91bD5cclxuICApO1xyXG59O1xyXG4iLCJpbXBvcnQge1xyXG4gIGZvcndhcmRSZWYsXHJcbiAgRm9yd2FyZFJlZlJlbmRlckZ1bmN0aW9uLFxyXG4gIHVzZUNhbGxiYWNrLFxyXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUsXHJcbiAgdXNlU3RhdGUsXHJcbn0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgRmlYIH0gZnJvbSAncmVhY3QtaWNvbnMvZmknO1xyXG5pbXBvcnQgeyBGb3JtLCBGb3JtaWssIEZvcm1pa0hlbHBlcnMsIEZvcm1pa1ZhbHVlcyB9IGZyb20gJ2Zvcm1payc7XHJcblxyXG5pbXBvcnQgeyBjb250YWN0Rm9ybVNjaGVtYSB9IGZyb20gJy4vdXRpbHMvY29udGFjdEZvcm1TY2hlbWEnO1xyXG5cclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5cclxuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gJy4vTG9hZGluZyc7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vRm9ybS9JbnB1dCc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL0Zvcm0vQnV0dG9uJztcclxuaW1wb3J0IHsgVGV4dGFyZWEgfSBmcm9tICcuLi9Gb3JtL1RleHRhcmVhJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMubW9kdWxlLnNjc3MnO1xyXG5cclxuZXhwb3J0IHR5cGUgQ29udGFjdEZvcm1IYW5kbGVzID0ge1xyXG4gIG9wZW5Db250YWN0Rm9ybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IENvbnRhY3RGb3JtOiBGb3J3YXJkUmVmUmVuZGVyRnVuY3Rpb248Q29udGFjdEZvcm1IYW5kbGVzPiA9IChfLCByZWYpID0+IHtcclxuICBjb25zdCBbaXNWaXNpYmxlLCBzZXRJc1Zpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3Qgb3BlbkNvbnRhY3RGb3JtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0SXNWaXNpYmxlKHRydWUpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xvc2VDb250YWN0Rm9ybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldElzVmlzaWJsZShmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VJbXBlcmF0aXZlSGFuZGxlKFxyXG4gICAgcmVmLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9wZW5Db250YWN0Rm9ybSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBbb3BlbkNvbnRhY3RGb3JtXSxcclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5jb250YWN0Rm9ybUNvbnRhaW5lcn0gJHtcclxuICAgICAgICBpc1Zpc2libGUgPyBzdHlsZXMuaXNWaXNpYmxlIDogJydcclxuICAgICAgfWB9XHJcbiAgICA+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBhcmlhLWxhYmVsPVwiQ2xpcXVlIHBhcmEgZmVjaGFyIG8gZm9ybXVsw6FyaW9cIlxyXG4gICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmNsb3NlQnV0dG9ufVxyXG4gICAgICAgIHRpdGxlPVwiRmVjaGFyIGZvcm11bMOhcmlvIGRlIGNvbnRhdG9cIlxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIG9uQ2xpY2s9e2Nsb3NlQ29udGFjdEZvcm19XHJcbiAgICAgID5cclxuICAgICAgICA8RmlYIHNpemU9ezI0fSAvPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIDxoMyBjbGFzc05hbWU9XCJoZWFkaW5nMyB3aGl0ZSBcIj5FbnRyZSBlbSBjb250YXRvPC9oMz5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2NvbnRhY3Qtc2VjdGlvbiddfT5cclxuICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2x1Y2FzdGhvbWF6ZWxsYS9cIj5cclxuICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaS5pbWd1ci5jb20vT3JySWFySy5wbmdcIiB3aWR0aD17ODB9IGhlaWdodD17ODB9IC8+XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgIDxMaW5rIGhyZWY9XCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vbHVjYXMudGhvbWF6ZWxsYS9cIj5cclxuICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaS5pbWd1ci5jb20vRUtEdjA3dy5wbmdcIiB3aWR0aD17ODB9IGhlaWdodD17ODB9IC8+XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9MaW5rPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2NvbnRhY3Qtc2VjdGlvbiddfT5cclxuICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly93YS5tZS81NTExOTY1OTg4NTg1XCI+XHJcbiAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2kuaW1ndXIuY29tL2F4VURuZXcucG5nXCIgd2lkdGg9ezgwfSBoZWlnaHQ9ezgwfSAvPlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvTGluaz5cclxuICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9sdWNhc3Rob216L1wiPlxyXG4gICAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9pLmltZ3VyLmNvbS9pcWNhYll0LnBuZ1wiIHdpZHRoPXs4MH0gaGVpZ2h0PXs4MH0gLz5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L0xpbms+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGFydGljbGU+XHJcbiAgICAgICAgPGltZyBzcmM9XCIvdmlld3MvaG9tZS9pbWdzL25hdmUtZXNwYWNpYWwucG5nXCIgLz5cclxuICAgICAgPC9hcnRpY2xlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcndhcmRSZWYoQ29udGFjdEZvcm0pO1xyXG4iLCJpbXBvcnQgeyBCdXR0b25IVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB0eXBlIHsgQmFja2dyb3VuZFZhcmlhdGlvbnMgfSBmcm9tICcuL3V0aWxzL0JhY2tncm91bmRWYXJpYXRpb25zJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMubW9kdWxlLnNjc3MnO1xyXG5cclxuaW50ZXJmYWNlIEJ1dHRvblByb3BzIGV4dGVuZHMgQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+IHtcclxuICBiYWNrZ3JvdW5kPzogQmFja2dyb3VuZFZhcmlhdGlvbnM7XHJcbiAgaXNPdXRsaW5lZD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBCdXR0b246IFJlYWN0LkZDPEJ1dHRvblByb3BzPiA9ICh7XHJcbiAgY2hpbGRyZW4sXHJcbiAgYmFja2dyb3VuZCxcclxuICBpc091dGxpbmVkLFxyXG4gIGNsYXNzTmFtZSxcclxuICAuLi5yZXN0XHJcbn0pID0+IChcclxuICA8YnV0dG9uXHJcbiAgICBjbGFzc05hbWU9e1tcclxuICAgICAgc3R5bGVzLmJ1dHRvbkNvbnRhaW5lcixcclxuICAgICAgYCR7YmFja2dyb3VuZCA/IHN0eWxlc1tgYnRuLSR7YmFja2dyb3VuZH1gXSA6IHN0eWxlc1tgYnRuLXByaW1hcnlgXX1gLFxyXG4gICAgICBgJHtpc091dGxpbmVkID8gc3R5bGVzW2BidG4tb3V0bGluZWQtJHtiYWNrZ3JvdW5kfWBdIDogJyd9YCxcclxuICAgICAgYCR7Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJyd9YCxcclxuICAgIF0uam9pbignICcpfVxyXG4gICAgey4uLnJlc3R9XHJcbiAgPlxyXG4gICAge2NoaWxkcmVufVxyXG4gIDwvYnV0dG9uPlxyXG4pO1xyXG4iLCJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcblxyXG5pbnRlcmZhY2UgU0VPUHJvcHMge1xyXG4gIHRhYk5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNFTzogUmVhY3QuRkM8U0VPUHJvcHM+ID0gKHsgdGFiTmFtZSB9KSA9PiB7XHJcbiAgY29uc3QgeyBhc1BhdGggfSA9IHVzZVJvdXRlcigpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEhlYWQ+XHJcbiAgICAgIDx0aXRsZT57dGFiTmFtZX0g4oCiIERldjwvdGl0bGU+XHJcbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dXJsXCIgY29udGVudD17YCR7YXNQYXRofWB9IC8+XHJcbiAgICA8L0hlYWQ+XHJcbiAgKTtcclxufTtcclxuIiwiaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcy5tb2R1bGUuc2Nzcyc7XHJcblxyXG50eXBlIExpc3RPcHRpb25zUHJvcHMgPSB7XHJcbiAgbGFiZWxzOiBzdHJpbmdbXTtcclxuICBhY3RpdmVJdGVtOiBzdHJpbmc7XHJcbiAgb25JdGVtQ2xpY2s6IChsYWJlbDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IExpc3RPcHRpb25zOiBSZWFjdC5GQzxMaXN0T3B0aW9uc1Byb3BzPiA9ICh7XHJcbiAgYWN0aXZlSXRlbSxcclxuICBsYWJlbHMsXHJcbiAgb25JdGVtQ2xpY2ssXHJcbn0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHVsIGNsYXNzTmFtZT17c3R5bGVzLmxpc3RPcHRpb25zQ29udGFpbmVyfT5cclxuICAgICAge2xhYmVscy5tYXAobGFiZWwgPT4gKFxyXG4gICAgICAgIDxsaVxyXG4gICAgICAgICAga2V5PXtsYWJlbH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmxpc3RPcHRpb259ICR7XHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPT09IGxhYmVsID8gc3R5bGVzLmlzQWN0aXZlIDogJydcclxuICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25JdGVtQ2xpY2sobGFiZWwpfVxyXG4gICAgICAgICAgdGl0bGU9e2BWaXN1YWxpemFyICR7bGFiZWx9YH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0XCI+e2xhYmVsfTwvcD5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICApKX1cclxuICAgIDwvdWw+XHJcbiAgKTtcclxufTtcclxuIiwiaW1wb3J0IHsgY2xvbmVFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgTGlzdE9wdGlvbnMgfSBmcm9tICcuL0xpc3RPcHRpb25zJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMubW9kdWxlLnNjc3MnO1xyXG5cclxudHlwZSBDbGlja2FibGVMaXN0UHJvcHMgPSB7XHJcbiAgbGFiZWxzOiBzdHJpbmdbXTtcclxuICBjaGlsZHJlbjogSlNYLkVsZW1lbnRbXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDbGlja2FibGVMaXN0OiBSZWFjdC5GQzxDbGlja2FibGVMaXN0UHJvcHM+ID0gKHtcclxuICBjaGlsZHJlbixcclxuICBsYWJlbHMsXHJcbn0pID0+IHtcclxuICBjb25zdCBbYWN0aXZlSXRlbSwgc2V0QWN0aXZlSXRlbV0gPSB1c2VTdGF0ZShsYWJlbHNbMF0pO1xyXG4gIGNvbnN0IFthcHBseUFuaW1hdGlvbiwgc2V0QXBwbHlBbmltYXRpb25dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0QXBwbHlBbmltYXRpb24odHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHNldEFwcGx5QW5pbWF0aW9uKGZhbHNlKTtcclxuICAgIH0sIDUwMCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gIH0sIFthY3RpdmVJdGVtXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNsaWNrYWJsZUxpc3RDb250YWluZXJ9PlxyXG4gICAgICA8TGlzdE9wdGlvbnNcclxuICAgICAgICBsYWJlbHM9e2xhYmVsc31cclxuICAgICAgICBhY3RpdmVJdGVtPXthY3RpdmVJdGVtfVxyXG4gICAgICAgIG9uSXRlbUNsaWNrPXtsYWJlbCA9PiBzZXRBY3RpdmVJdGVtKGxhYmVsKX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5saXN0Q29udGVudH0gJHtcclxuICAgICAgICAgICEhYXBwbHlBbmltYXRpb24gPyBzdHlsZXMuYW5pbWF0ZSA6ICcnXHJcbiAgICAgICAgfWB9XHJcbiAgICAgID5cclxuICAgICAgICB7Y2xvbmVFbGVtZW50KFxyXG4gICAgICAgICAgY2hpbGRyZW5bbGFiZWxzLmZpbmRJbmRleCh2YWx1ZSA9PiB2YWx1ZSA9PT0gYWN0aXZlSXRlbSldLFxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuIiwiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5cclxuaW1wb3J0IHsgc29jaWFsTWVkaWFJdGVtcyB9IGZyb20gJy4vdXRpbHMvc29jaWFsTWVkaWFJdGVtcyc7XHJcblxyXG5pbXBvcnQgeyBGb3JtTmV3c0xldHRlciB9IGZyb20gJy4vRm9ybU5ld3NMZXR0ZXInO1xyXG5pbXBvcnQgeyBGb290ZXJNZW51TmF2Q29sdW1uIH0gZnJvbSAnLi9Gb290ZXJNZW51TmF2Q29sdW1uJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMubW9kdWxlLnNjc3MnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZvb3RlcjogUmVhY3QuRkMgPSAoKSA9PiAoXHJcbiAgPD5cclxuICAgIDxzZWN0aW9uIGlkPVwiZm9vdGVyLXNlY3Rpb25cIiBjbGFzc05hbWU9e3N0eWxlc1snZm9vdGVyLXNlY3Rpb24nXX0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudHJhbGl6ZWQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1snZm9vdGVyLXNlY3Rpb24tY29udGVudCddfT5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2Zvb3Rlci1sYXlvdXQtY29udGFpbmVyJ119PlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9e3N0eWxlc1snY29udGFjdC1hZGRyZXNzJ119PlxyXG4gICAgICAgICAgICAgIDxoMiBkYXRhLWFvcz1cImZhZGUtcmlnaHRcIj5MdDwvaDI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICA8Lz5cclxuKTtcclxuIiwiaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHsgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ2NvbXBvbmVudHMvRm9ybS9CdXR0b24nO1xyXG5pbXBvcnQgeyBCcmVhZGNydW1iUHJvcHMsIEJyZWFkY3J1bWIgfSBmcm9tICdjb21wb25lbnRzL0JyZWFkY3J1bWInO1xyXG5pbXBvcnQgQ29udGFjdEZvcm0sIHsgQ29udGFjdEZvcm1IYW5kbGVzIH0gZnJvbSAnY29tcG9uZW50cy9Db250YWN0Rm9ybSc7XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbnR5cGUgQWN0aXZlTWVudSA9ICdibG9nJyB8ICdwcm9kdXRvcyc7XHJcblxyXG50eXBlIE1lbnVQcm9wcyA9IHtcclxuICBicmVhZGNydW1iPzogQnJlYWRjcnVtYlByb3BzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE1lbnU6IFJlYWN0LkZDPE1lbnVQcm9wcz4gPSAoeyBicmVhZGNydW1iIH0pID0+IHtcclxuICBjb25zdCBjb250YWN0Rm9ybVJlZiA9IHVzZVJlZjxDb250YWN0Rm9ybUhhbmRsZXM+KG51bGwpO1xyXG4gIGNvbnN0IFtpc01lbnVPcGVuLCBzZXRJc01lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYWN0aXZlTWVudSwgc2V0QWN0aXZlTWVudV0gPSB1c2VTdGF0ZTxBY3RpdmVNZW51IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1lbnVBY3RpdmUgPSAob3B0aW9uOiBBY3RpdmVNZW51KSA9PiB7XHJcbiAgICBzZXRBY3RpdmVNZW51KHN0YXRlID0+IChvcHRpb24gPT09IHN0YXRlID8gbnVsbCA6IG9wdGlvbikpO1xyXG4gIH07XHJcblxyXG4gIFJvdXRlci5ldmVudHMub24oJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCAoKSA9PlxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHNldEFjdGl2ZU1lbnUobnVsbCk7XHJcbiAgICB9LCAyMDApLFxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8Q29udGFjdEZvcm0gcmVmPXtjb250YWN0Rm9ybVJlZn0gLz5cclxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9e3N0eWxlc1snbWVudS1jb250YWluZXInXX0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50cmFsaXplZC1jb250YWluZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ21lbnUtY29udGVudCddfT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sb2dvfT5cclxuICAgICAgICAgICAgICA8aDI+THQ8L2gyPlxyXG4gICAgICAgICAgICAgIHticmVhZGNydW1iICYmIDxCcmVhZGNydW1iIGl0ZW1zPXticmVhZGNydW1iLml0ZW1zfSAvPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8bmF2XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXNbJ25hdmJhci1jb250YWluZXInXX0gJHtcclxuICAgICAgICAgICAgICAgIGlzTWVudU9wZW4gPyBzdHlsZXNbJ2lzLW1lbnUtb3BlbiddIDogJydcclxuICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e3N0eWxlc1snbmF2LWxpc3QtY29udGFpbmVyJ119PjwvdWw+XHJcblxyXG4gICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJFbnRyZSBlbSBjb250YXRvXCJcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNvbnRhY3RGb3JtUmVmLmN1cnJlbnQ/Lm9wZW5Db250YWN0Rm9ybSgpfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIENvbnRhdG9cclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9oZWFkZXI+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG4iLCJpbXBvcnQgdHlwZSB7IEJyZWFkY3J1bWJQcm9wcyB9IGZyb20gJ2NvbXBvbmVudHMvQnJlYWRjcnVtYic7XHJcblxyXG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnLi9jb21wb25lbnRzL01lbnUnO1xyXG5pbXBvcnQgeyBGb290ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvRm9vdGVyJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMubW9kdWxlLnNjc3MnO1xyXG5cclxudHlwZSBEZWZhdWx0TGF5b3V0UHJvcHMgPSB7XHJcbiAgYnJlYWRjcnVtYj86IEJyZWFkY3J1bWJQcm9wcztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBEZWZhdWx0TGF5b3V0OiBSZWFjdC5GQzxEZWZhdWx0TGF5b3V0UHJvcHM+ID0gKHtcclxuICBjaGlsZHJlbixcclxuICBicmVhZGNydW1iLFxyXG59KSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kZWZhdWx0TGF5b3V0Q29udGFpbmVyfT5cclxuICAgIDxNZW51IGJyZWFkY3J1bWI9e2JyZWFkY3J1bWJ9IC8+XHJcbiAgICB7Y2hpbGRyZW59XHJcbiAgICA8Rm9vdGVyIC8+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiIsImltcG9ydCB0eXBlIHsgR2V0U3RhdGljUHJvcHMsIE5leHRQYWdlIH0gZnJvbSAnbmV4dCc7XHJcbmltcG9ydCB7IFNFTyB9IGZyb20gJ2NvbXBvbmVudHMvU0VPJztcclxuaW1wb3J0IHsgSG9tZVZpZXcgfSBmcm9tICcuLi92aWV3cy9ob21lJztcclxuXHJcbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8U0VPIHRhYk5hbWU9XCJMdWNhcyBUaG9tYXplbGxhXCIgLz5cclxuICAgICAgPEhvbWVWaWV3IC8+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzOiBHZXRTdGF0aWNQcm9wcyA9IGFzeW5jICgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcHJvcHM6IHt9LFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb21lO1xyXG4iLCJpbXBvcnQgc3R5bGVzIGZyb20gJy4vUmVjb3Vyc2VDYXJkLm1vZHVsZS5zY3NzJztcclxuXHJcbnR5cGUgUmVjb3Vyc2VDYXJkUHJvcHMgPSB7XHJcbiAgaXRlbToge1xyXG4gICAgY2F0ZWdvcnk6IHN0cmluZztcclxuICAgIGNyZWF0ZWRBdDogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHJlc3VtZTogc3RyaW5nO1xyXG4gICAgaW1nOiBzdHJpbmc7XHJcbiAgICBsaW5rOiBzdHJpbmc7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBSZWNvdXJzZUNhcmQ6IFJlYWN0LkZDPFJlY291cnNlQ2FyZFByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YSBocmVmPXtgJHtpdGVtLmxpbmt9YH0gY2xhc3NOYW1lPXtzdHlsZXNbJ2xpbmsnXX0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ3JlY291cnNlLWNhcmQtY29udGFpbmVyJ119PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ3JlY291cnNlLWNhcmQtdGl0bGUnXX0+XHJcbiAgICAgICAgICA8cD57aXRlbS5jYXRlZ29yeX08L3A+XHJcbiAgICAgICAgICA8cD57aXRlbS5jcmVhdGVkQXR9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZmlndXJlIGNsYXNzTmFtZT17c3R5bGVzWydyZWNvdXJzZS1jYXJkLWltYWdlLWNvbnRhaW5lciddfT5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgc3JjPXtgJHtpdGVtLmltZ31gfVxyXG4gICAgICAgICAgICBhbHQ9e2Ake2l0ZW0uY2F0ZWdvcnl9IC0gSW1hZ2VtIGlsdXN0cmF0aXZhYH1cclxuICAgICAgICAgICAgdGl0bGU9e2Ake2l0ZW0uY2F0ZWdvcnl9IC0gSW1hZ2VtIGlsdXN0cmF0aXZhYH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9maWd1cmU+XHJcblxyXG4gICAgICAgIDxhcnRpY2xlIGNsYXNzTmFtZT17c3R5bGVzWydyZWNvdXJzZS1jYXJkLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgICA8aDM+e2l0ZW0udGl0bGV9PC9oMz5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImJvZHk2XCI+e2l0ZW0ucmVzdW1lfTwvcD5cclxuICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9hPlxyXG4gICk7XHJcbn07XHJcbiIsImltcG9ydCB7IFJlY291cnNlQ2FyZCB9IGZyb20gJy4vUmVjb3Vyc2VDYXJkJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9SZWNvdXJzZUNhcmRMaXN0Lm1vZHVsZS5zY3NzJztcclxuXHJcbnR5cGUgUmVjb3Vyc2VMaXN0UHJvcHMgPSB7XHJcbiAgaXRlbXM6IHtcclxuICAgIGNhdGVnb3J5OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVkQXQ6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICByZXN1bWU6IHN0cmluZztcclxuICAgIGltZzogc3RyaW5nO1xyXG4gICAgbGluazogc3RyaW5nO1xyXG4gIH1bXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBSZWNvdXJzZUxpc3Q6IFJlYWN0LkZDPFJlY291cnNlTGlzdFByb3BzPiA9ICh7IGl0ZW1zIH0pID0+IChcclxuICA8c2VjdGlvbiBpZD1cInJlY3Vyc29zLXNlY3Rpb25cIiBjbGFzc05hbWU9e3N0eWxlc1sncmVjdXJzb3Mtc2VjdGlvbiddfT5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudHJhbGl6ZWQtY29udGFpbmVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ3JlY3Vyc29zLWxpc3QtY29udGFpbmVyJ119PlxyXG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8UmVjb3Vyc2VDYXJkIGtleT17aW5kZXh9IGl0ZW09e2l0ZW19IC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9zZWN0aW9uPlxyXG4pO1xyXG4iLCJpbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XHJcblxyXG5pbXBvcnQgeyBGaUFycm93UmlnaHQgfSBmcm9tICdyZWFjdC1pY29ucy9maSc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb25MaW5rIH0gZnJvbSAnY29tcG9uZW50cy9VdGlsaXRpZXMvQWN0aW9uTGluayc7XHJcbmltcG9ydCB7IENsaWNrYWJsZUxpc3QgfSBmcm9tICdjb21wb25lbnRzL1V0aWxpdGllcy9DbGlja2FibGVMaXN0JztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMubW9kdWxlLnNjc3MnO1xyXG5pbXBvcnQgeyBSZWNvdXJzZUxpc3QgfSBmcm9tICcuL1JlY291cnNlQ2FyZExpc3QnO1xyXG5pbXBvcnQgeyByZWNvdXJzZUl0ZW1zIH0gZnJvbSAnLi9yZWNvdXJzZUl0ZW1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBCbG9nOiBSZWFjdC5GQyA9ICgpID0+IChcclxuICA8c2VjdGlvbiBjbGFzc05hbWU9e3N0eWxlc1snYmxvZy1zZWN0aW9uJ119PlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjZW50cmFsaXplZC1jb250YWluZXJcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1snYmxvZy1zZWN0aW9uLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgPGFydGljbGUgY2xhc3NOYW1lPXtzdHlsZXNbJ2Jsb2ctc2VjdGlvbi1kZXNjcmlwdGlvbiddfT5cclxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJoZWFkaW5nMlwiPkV4cGxvcmUgbWV1cyB0cmFiYWxob3M8L2gyPlxyXG4gICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICA8UmVjb3Vyc2VMaXN0IGl0ZW1zPXtyZWNvdXJzZUl0ZW1zfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuKTtcclxuIiwiZXhwb3J0IGNvbnN0IHJlY291cnNlSXRlbXMgPSBbXHJcbiAge1xyXG4gICAgY2F0ZWdvcnk6ICdCcmlub3YgQmxvZycsXHJcbiAgICBjcmVhdGVkQXQ6ICdqYW5laXJvIGRlIDIwMjInLFxyXG4gICAgdGl0bGU6ICdBcGxpY2FjYW8gTmV4dEpzIGNvbSB0eXBlc2NyaXB0LCBpbnRlcmFjYW8gY29tIGFwaXMgR3JhcGhRbCcsXHJcbiAgICByZXN1bWU6ICdGb2kgYXBsaWNhZG8gU2luZ2xlIFBhZ2UgQXBwbGljYXRpb24gZSBlc3RpbGl6YWNhbyBlbSBTYXNzJyxcclxuICAgIGltZzogJy92aWV3cy9ob21lL2ltZ3MvYmxvZy5wbmcnLFxyXG4gICAgbGluazogJ2h0dHBzOi8vYnJpbm92LmNvbS9ibG9nJyxcclxuICB9LFxyXG4gIHtcclxuICAgIGNhdGVnb3J5OiAnQnJpbm92IFdlYnBhZ2UnLFxyXG4gICAgY3JlYXRlZEF0OiAnb3V0dWJybyBkZSAyMDIxJyxcclxuICAgIHRpdGxlOiAnQXBsaWNhY2FvIE5leHRKcyBjb20gdHlwZXNjcmlwdCwgcMOhZ2luYSBpbmljaWFsIGRhIEJyaW5vdicsXHJcbiAgICByZXN1bWU6ICdGb2kgYXBsaWNhZG8gU2luZ2xlIFBhZ2UgQXBwbGljYXRpb24gZSBlc3RpbGl6YWNhbyBlbSBTYXNzJyxcclxuICAgIGltZzogJy92aWV3cy9ob21lL2ltZ3MvYnJpbm92LnBuZycsXHJcbiAgICBsaW5rOiAnaHR0cHM6Ly9icmlub3YuY29tLycsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjYXRlZ29yeTogJ1dhcnpvbmUnLFxyXG4gICAgY3JlYXRlZEF0OiAnamFuZWlybyBkZSAyMDIwJyxcclxuICAgIHRpdGxlOiAnQXBsaWNhY2FvIGNvbSBodG1sLGNzcyBlIGpxdWVyeScsXHJcbiAgICByZXN1bWU6ICdVbSBkb3MgbWV1cyBwcmltZWlyb3MgcHJvamV0b3MsIGluY29tcGxldG8nLFxyXG4gICAgaW1nOiAnL3ZpZXdzL2hvbWUvaW1ncy93YXJ6b25lLnBuZycsXHJcbiAgICBsaW5rOiAnaHR0cHM6Ly9sdWNkZWUuZ2l0aHViLmlvL1dhcnpvbmUvJyxcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBjYXRlZ29yeTogJ1NvYnJlIEVzcG9ydGUnLFxyXG4gICAgY3JlYXRlZEF0OiAnZmV2ZXJlaXJvIGRlIDIwMjAnLFxyXG4gICAgdGl0bGU6ICdBcGxpY2FjYW8gY29tIGh0bWwsY3NzIGUganF1ZXJ5JyxcclxuICAgIHJlc3VtZTogJ1VtIHNpdGUgZGUgbm90aWNpYXMgZGUgZXNwb3J0ZXMsIGluY29tcGxldG8nLFxyXG4gICAgaW1nOiAnL3ZpZXdzL2hvbWUvaW1ncy9zb2JyZWVzcG9ydGUucG5nJyxcclxuICAgIGxpbms6ICdodHRwczovL2x1Y2RlZS5naXRodWIuaW8vU29icmVlc3BvcnRlLycsXHJcbiAgfSxcclxuXTtcclxuIiwiaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbmV4cG9ydCBjb25zdCBFeHBlcnRpc2VCcmlub3Y6IFJlYWN0LkZDID0gKCkgPT4gKFxyXG4gIDxzZWN0aW9uXHJcbiAgICBpZD1cImV4cGVydGlzZS1icmlub3Ytc2VjdGlvblwiXHJcbiAgICBjbGFzc05hbWU9e3N0eWxlc1snZXhwZXJ0aXNlLXNlY3Rpb24nXX1cclxuICA+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRyYWxpemVkLWNvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydleHBlcnRpc2Utc2VjdGlvbi1jb250ZW50J119PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2NvbXBhbmllcy1sb2dvcyddfT5cclxuICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICBzcmM9XCIvdmlld3MvaG9tZS9pbWdzL2FzdHJvbmF1dGEzLnBuZ1wiXHJcbiAgICAgICAgICAgIHdpZHRoPXs1MDB9XHJcbiAgICAgICAgICAgIGhlaWdodD17NTAwfVxyXG4gICAgICAgICAgICBhbHQ9XCJkZWNhdGhsb25cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGFydGljbGVcclxuICAgICAgICAgIGRhdGEtYW9zPVwiZmFkZS11cFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlc1snZXhwZXJ0aXNlLXNlY3Rpb24tZGVzY3JpcHRpb24nXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2x1Y2RlZVwiPlxyXG4gICAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICAgIHNyYz1cIi92aWV3cy9ob21lL2ltZ3MvZ2l0aHViLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICB3aWR0aD17NTAwfVxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs1MDB9XHJcbiAgICAgICAgICAgICAgICBhbHQ9XCJkZWNhdGhsb25cIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9zZWN0aW9uPlxyXG4pO1xyXG4iLCJpbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbmV4cG9ydCBjb25zdCBIZXJvOiBSZWFjdC5GQyA9ICgpID0+IHtcclxuICBjb25zdCBzY3JvbGxUb0Zvb3RlciA9ICgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDIwNTAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBpZD1cImhlcm8tc2VjdGlvblwiIGNsYXNzTmFtZT17c3R5bGVzWydoZXJvLXNlY3Rpb24nXX0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudHJhbGl6ZWQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1snaGVyby1zZWN0aW9uLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgICA8YXJ0aWNsZVxyXG4gICAgICAgICAgICBkYXRhLWFvcz1cImZhZGUtcmlnaHRcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlc1snaGVyby1zZWN0aW9uLWRlc2NyaXB0aW9uJ119XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJoZWFkaW5nMVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuPkx1Y2FzIFRob21hemVsbGE8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImJvZHkxXCI+VW1hIHZpYWdlbSBwYXJhIG9zIG1ldXMgdHJhYmFsaG9zPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJib2R5MlwiPkFwbGljYcOnw6NvIGVtIE5leHRqcyBwYXJhIHBvcnRmw7NsaW88L3A+XHJcblxyXG4gICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgdGl0bGU9XCJDbGlxdWUgcGFyYSBsZXIgbm9zc28gbm92byBFYm9va1wiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17c2Nyb2xsVG9Gb290ZXJ9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBWaWFqYXJcclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgICAgICAgPGZpZ3VyZSBjbGFzc05hbWU9e3N0eWxlc1snaW1hZ2UtY29udGFpbmVyJ119PlxyXG4gICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICBzcmM9XCIvdmlld3MvaG9tZS9pbWdzL2FzdHJvbmF1dGEyLnBuZ1wiXHJcbiAgICAgICAgICAgICAgd2lkdGg9ezEwMDB9XHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXs4MDB9XHJcbiAgICAgICAgICAgICAgbGF5b3V0PVwiaW50cmluc2ljXCJcclxuICAgICAgICAgICAgICBhbHQ9XCJJbHVzdHJhw6fDo28gbXVsaGVyIGNvbSDDs2N1bG9zIGRlIHJlYWxpZGFkZSBhdW1lbnRhZGFcIlxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiSWx1c3RyYcOnw6NvIG11bGhlciBjb20gw7NjdWxvcyBkZSByZWFsaWRhZGUgYXVtZW50YWRhXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG4iLCJpbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XHJcblxyXG5pbXBvcnQgeyBDbGlja2FibGVMaXN0IH0gZnJvbSAnY29tcG9uZW50cy9VdGlsaXRpZXMvQ2xpY2thYmxlTGlzdCc7XHJcblxyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbmV4cG9ydCBjb25zdCBTdWNjZXNzQ2FzZXNEZXBvaW1lbnRzOiBSZWFjdC5GQyA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPENsaWNrYWJsZUxpc3QgbGFiZWxzPXtbJ09iamV0aXZvcycsICdGb2NvcycsICdDb25oZWNpbWVudG9zJ119PlxyXG4gICAgICA8ZGl2IGRhdGEtYW9zPVwiZmFkZS11cFwiIGNsYXNzTmFtZT17c3R5bGVzWydkZXBvaW1lbnQtY2FyZCddfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydkZXBvaW1lbnQtY2FyZC1jb250ZW50J119PlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiYm9keTZcIj5cclxuICAgICAgICAgICAgPGI+XHJcbiAgICAgICAgICAgICAgT3BvcnR1bmlkYWRlIGVtIGRlc2Vudm9sdmltZW50byBGcm9udCBlbmQsIG9uZGUgZXUgcG9zc2EgY29sb2NhclxyXG4gICAgICAgICAgICAgIG1pbmhhcyBoYWJpbGlkYWRlcyBlbSBwcsOhdGljYSBlIGNvbGFib3JhciBjb20gZXF1aXBlcyBkZSB0cmFiYWxobyxcclxuICAgICAgICAgICAgICBjcmVzY2ltZW50byBkYSBlbXByZXNhIGUgbWV1IHByw7NwcmlvIGNyZXNjaW1lbnRvIHBlc3NvYWwgZVxyXG4gICAgICAgICAgICAgIHByb2Zpc3Npb25hbC5cclxuICAgICAgICAgICAgPC9iPlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2RlcG9pbWVudC1jYXJkJ119PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2RlcG9pbWVudC1jYXJkLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjYXB0aW9uXCI+XHJcbiAgICAgICAgICAgIDxiPlxyXG4gICAgICAgICAgICAgIEVzdG91IGF0dWFsbWVudGUgZm9jYWRvIGVtIG1lIGRlc2Vudm9sdmVyIGVtIEZyb250IGVuZCwgdXRpbGl6YW5kb1xyXG4gICAgICAgICAgICAgIE5leHRKcyhSZWFjdGpzKSwgcG9yw6ltIHRhbWLDqW0gcXVlcm8gZ2FuaGFyIGNvbmhlY2ltZW50byBlbSBvdXRyb3NcclxuICAgICAgICAgICAgICBGcmFtZXdvcmtzIHF1ZSB1dGlsaXphbSBqYXZhY3JpcHQuXHJcbiAgICAgICAgICAgIDwvYj5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydkZXBvaW1lbnQtY2FyZCddfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydkZXBvaW1lbnQtY2FyZC1jb250ZW50J119PlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2FwdGlvblwiPlxyXG4gICAgICAgICAgICA8Yj5cclxuICAgICAgICAgICAgICBQb3NzdW8gY29uaGVjaW1lbnRvIGVtIEZyb250IGVuZCBjb20gUmVhY3RKcy9OZXh0SnMsIEFuZ3VsYXIsXHJcbiAgICAgICAgICAgICAgVnVlSnMsIGltcGxlbWVudGHDp2FvIGUgY3JpYcOnYW8gZGUgQXBpcyBSZXN0IGUgR3JhcGhRbCxcclxuICAgICAgICAgICAgICB2ZXJzaW9uYW1lbnRvIGRlIGPDs2RpZ28gY29tIEdpdCBlIEdpdEh1YiwgYWzDqW0gZGUgY29uaGVjaW1lbnRvcyBub1xyXG4gICAgICAgICAgICAgIEJhY2sgZW5kIGVtIG15c3FsIGUgamF2YSBjb20gc3ByaW5nIGJvb3QuXHJcbiAgICAgICAgICAgIDwvYj57JyAnfVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvQ2xpY2thYmxlTGlzdD5cclxuICApO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBTdWNjZXNzQ2FzZXNEZXBvaW1lbnRzIH0gZnJvbSAnLi9TdWNjZXNzQ2FzZXNEZXBvaW1lbnRzJztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLm1vZHVsZS5zY3NzJztcclxuXHJcbmV4cG9ydCBjb25zdCBTdWNjZXNzQ2FzZXM6IFJlYWN0LkZDID0gKCkgPT4gKFxyXG4gIDxzZWN0aW9uXHJcbiAgICBpZD1cImNhc2VzLWRlLXN1Y2Vzc28tc2VjdGlvblwiXHJcbiAgICBjbGFzc05hbWU9e3N0eWxlc1snc3VjY2Vzcy1jYXNlcy1zZWN0aW9uJ119XHJcbiAgPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjZW50cmFsaXplZC1jb250YWluZXJcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1snc3VjY2Vzcy1jYXNlcy1zZWN0aW9uLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXNbJ2dyYXktY2lyY2xlJ119IC8+XHJcblxyXG4gICAgICAgIDxhcnRpY2xlIGNsYXNzTmFtZT17c3R5bGVzWydzdWNjZXNzLWNhc2VzLXNlY3Rpb24tZGVzY3JpcHRpb24nXX0+XHJcbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiaGVhZGluZzJcIj5Tb2JyZSBtaW08L2gyPlxyXG4gICAgICAgIDwvYXJ0aWNsZT5cclxuXHJcbiAgICAgICAgPFN1Y2Nlc3NDYXNlc0RlcG9pbWVudHMgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L3NlY3Rpb24+XHJcbik7XHJcbiIsImltcG9ydCB7IERlZmF1bHRMYXlvdXQgfSBmcm9tICcuLi8uLi9sYXlvdXRzL0RlZmF1bHRMYXlvdXQnO1xyXG5pbXBvcnQgQW9zIGZyb20gJ2Fvcyc7XHJcbmltcG9ydCB7IEhlcm8gfSBmcm9tICcuL2NvbXBvbmVudHMvSGVybyc7XHJcbmltcG9ydCB7IEJsb2cgfSBmcm9tICcuL2NvbXBvbmVudHMvQmxvZyc7XHJcbmltcG9ydCB7IEV4cGVydGlzZUJyaW5vdiB9IGZyb20gJy4vY29tcG9uZW50cy9FeHBlcnRpc2VCcmlub3YnO1xyXG5pbXBvcnQgeyBTdWNjZXNzQ2FzZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvU3VjY2Vzc0Nhc2VzJztcclxuaW1wb3J0IHsgRm9vdGVyQmFubmVyIH0gZnJvbSAnLi9jb21wb25lbnRzL0Zvb3RlckJhbm5lcic7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICdhb3MvZGlzdC9hb3MuY3NzJztcclxuXHJcbmV4cG9ydCBjb25zdCBIb21lVmlldzogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIEFvcy5pbml0KHsgZHVyYXRpb246IDE1MDAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPERlZmF1bHRMYXlvdXQ+XHJcbiAgICAgIDxIZXJvIC8+XHJcbiAgICAgIDxTdWNjZXNzQ2FzZXMgLz5cclxuICAgICAgPEV4cGVydGlzZUJyaW5vdiAvPlxyXG4gICAgICA8QmxvZyAvPlxyXG4gICAgPC9EZWZhdWx0TGF5b3V0PlxyXG4gICk7XHJcbn07XHJcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImJyZWFkY3J1bWItY29udGFpbmVyXCI6IFwic3R5bGVzX2JyZWFkY3J1bWItY29udGFpbmVyX18xQWJ4RlwiLFxuXHRcImJyZWFkY3J1bWItaXRlbS1jb250YWluZXJcIjogXCJzdHlsZXNfYnJlYWRjcnVtYi1pdGVtLWNvbnRhaW5lcl9fOVZIb3JcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImNvbnRhY3RGb3JtQ29udGFpbmVyXCI6IFwic3R5bGVzX2NvbnRhY3RGb3JtQ29udGFpbmVyX18xVC12aFwiLFxuXHRcImlzVmlzaWJsZVwiOiBcInN0eWxlc19pc1Zpc2libGVfXzE1RXhnXCIsXG5cdFwiY2xvc2VCdXR0b25cIjogXCJzdHlsZXNfY2xvc2VCdXR0b25fXzJBQml2XCIsXG5cdFwiY29udGFjdC1zZWN0aW9uXCI6IFwic3R5bGVzX2NvbnRhY3Qtc2VjdGlvbl9fMzh1ZWdcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImJ0bi1wcmltYXJ5XCI6IFwic3R5bGVzX2J0bi1wcmltYXJ5X18zZU9YdFwiLFxuXHRcImJ0bi1zZWNvbmRhcnlcIjogXCJzdHlsZXNfYnRuLXNlY29uZGFyeV9fZ0Z0WUNcIixcblx0XCJidG4tc3VjY2Vzc1wiOiBcInN0eWxlc19idG4tc3VjY2Vzc19fMnFnUEdcIixcblx0XCJidG4taW5mb1wiOiBcInN0eWxlc19idG4taW5mb19fMlJHcWxcIixcblx0XCJidG4td2FybmluZ1wiOiBcInN0eWxlc19idG4td2FybmluZ19fT0k1bDZcIixcblx0XCJidG4tZGFuZ2VyXCI6IFwic3R5bGVzX2J0bi1kYW5nZXJfXzJXYlNBXCIsXG5cdFwiYnRuLW91dGxpbmVkLXByaW1hcnlcIjogXCJzdHlsZXNfYnRuLW91dGxpbmVkLXByaW1hcnlfX0dQVC01XCIsXG5cdFwiYnRuLW91dGxpbmVkLXNlY29uZGFyeVwiOiBcInN0eWxlc19idG4tb3V0bGluZWQtc2Vjb25kYXJ5X18yS1ZBNVwiLFxuXHRcImJ0bi1vdXRsaW5lZC1zdWNjZXNzXCI6IFwic3R5bGVzX2J0bi1vdXRsaW5lZC1zdWNjZXNzX19SYWRqdFwiLFxuXHRcImJ0bi1vdXRsaW5lZC1pbmZvXCI6IFwic3R5bGVzX2J0bi1vdXRsaW5lZC1pbmZvX19KNEltcFwiLFxuXHRcImJ0bi1vdXRsaW5lZC13YXJuaW5nXCI6IFwic3R5bGVzX2J0bi1vdXRsaW5lZC13YXJuaW5nX18zamVaTlwiLFxuXHRcImJ0bi1vdXRsaW5lZC1kYW5nZXJcIjogXCJzdHlsZXNfYnRuLW91dGxpbmVkLWRhbmdlcl9fU0NUd19cIixcblx0XCJidXR0b25Db250YWluZXJcIjogXCJzdHlsZXNfYnV0dG9uQ29udGFpbmVyX18zQTBtM1wiXG59O1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwibGlzdE9wdGlvbnNDb250YWluZXJcIjogXCJzdHlsZXNfbGlzdE9wdGlvbnNDb250YWluZXJfXzFsT3JUXCIsXG5cdFwibGlzdE9wdGlvblwiOiBcInN0eWxlc19saXN0T3B0aW9uX18xbEVHWFwiLFxuXHRcImlzQWN0aXZlXCI6IFwic3R5bGVzX2lzQWN0aXZlX19UYzEybFwiXG59O1xuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiY2xpY2thYmxlTGlzdENvbnRhaW5lclwiOiBcInN0eWxlc19jbGlja2FibGVMaXN0Q29udGFpbmVyX19iNWRvU1wiLFxuXHRcImxpc3RDb250ZW50XCI6IFwic3R5bGVzX2xpc3RDb250ZW50X18xTEVCeFwiLFxuXHRcImFuaW1hdGVcIjogXCJzdHlsZXNfYW5pbWF0ZV9fM2Jkc0ZcIixcblx0XCJvcGFjaXR5QW5pbWF0aW9uXCI6IFwic3R5bGVzX29wYWNpdHlBbmltYXRpb25fX3A5dVZGXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJmb290ZXItc2VjdGlvblwiOiBcInN0eWxlc19mb290ZXItc2VjdGlvbl9fTU9WRGJcIixcblx0XCJmb290ZXItc2VjdGlvbi1jb250ZW50XCI6IFwic3R5bGVzX2Zvb3Rlci1zZWN0aW9uLWNvbnRlbnRfX3FpSGpDXCIsXG5cdFwiZm9vdGVyLWxheW91dC1jb250YWluZXJcIjogXCJzdHlsZXNfZm9vdGVyLWxheW91dC1jb250YWluZXJfXzJ4eHItXCIsXG5cdFwiY29udGFjdC1hZGRyZXNzXCI6IFwic3R5bGVzX2NvbnRhY3QtYWRkcmVzc19fM3lqMnlcIixcblx0XCJzb2NpYWwtbWVkaWEtaXRlbXNcIjogXCJzdHlsZXNfc29jaWFsLW1lZGlhLWl0ZW1zX18xd0U3WlwiLFxuXHRcImZvb3Rlci1tZW51LXNlY3Rpb25cIjogXCJzdHlsZXNfZm9vdGVyLW1lbnUtc2VjdGlvbl9fMTFURi1cIixcblx0XCJmb290ZXItbWVudS1uYXYtY29sdW1uXCI6IFwic3R5bGVzX2Zvb3Rlci1tZW51LW5hdi1jb2x1bW5fXzNNV1Y4XCIsXG5cdFwibmV3cy1zZWN0aW9uXCI6IFwic3R5bGVzX25ld3Mtc2VjdGlvbl9fMmZFN0VcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIm1lbnUtY29udGFpbmVyXCI6IFwic3R5bGVzX21lbnUtY29udGFpbmVyX18zVFh3VlwiLFxuXHRcIm1lbnUtY29udGVudFwiOiBcInN0eWxlc19tZW51LWNvbnRlbnRfXzJaNk4zXCIsXG5cdFwibG9nb1wiOiBcInN0eWxlc19sb2dvX18yMXZiSVwiLFxuXHRcIm5hdmJhci1jb250YWluZXJcIjogXCJzdHlsZXNfbmF2YmFyLWNvbnRhaW5lcl9fM2g3b01cIixcblx0XCJpcy1tZW51LW9wZW5cIjogXCJzdHlsZXNfaXMtbWVudS1vcGVuX18ycklYQlwiLFxuXHRcIm5hdi1saXN0LWNvbnRhaW5lclwiOiBcInN0eWxlc19uYXYtbGlzdC1jb250YWluZXJfXzFBWm9oXCIsXG5cdFwiYXBwZWFyRnJvbUxlZnRcIjogXCJzdHlsZXNfYXBwZWFyRnJvbUxlZnRfXzJJOF9HXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJkZWZhdWx0TGF5b3V0Q29udGFpbmVyXCI6IFwic3R5bGVzX2RlZmF1bHRMYXlvdXRDb250YWluZXJfXzFpWFk0XCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJyZWNvdXJzZS1jYXJkLWNvbnRhaW5lclwiOiBcIlJlY291cnNlQ2FyZF9yZWNvdXJzZS1jYXJkLWNvbnRhaW5lcl9fMjREUTlcIixcblx0XCJsaW5rXCI6IFwiUmVjb3Vyc2VDYXJkX2xpbmtfXzJscmRYXCIsXG5cdFwicmVjb3Vyc2UtY2FyZC10aXRsZVwiOiBcIlJlY291cnNlQ2FyZF9yZWNvdXJzZS1jYXJkLXRpdGxlX19QcTAwWVwiLFxuXHRcInJlY291cnNlLWNhcmQtaW1hZ2UtY29udGFpbmVyXCI6IFwiUmVjb3Vyc2VDYXJkX3JlY291cnNlLWNhcmQtaW1hZ2UtY29udGFpbmVyX18yaGRRb1wiLFxuXHRcInJlY291cnNlLWNhcmQtY29udGVudFwiOiBcIlJlY291cnNlQ2FyZF9yZWNvdXJzZS1jYXJkLWNvbnRlbnRfXzM3WTlWXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJyZWN1cnNvcy1zZWN0aW9uXCI6IFwiUmVjb3Vyc2VDYXJkTGlzdF9yZWN1cnNvcy1zZWN0aW9uX19SRzh2c1wiLFxuXHRcInJlY3Vyc29zLWxpc3QtY29udGFpbmVyXCI6IFwiUmVjb3Vyc2VDYXJkTGlzdF9yZWN1cnNvcy1saXN0LWNvbnRhaW5lcl9fMmI3M29cIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImJsb2ctc2VjdGlvblwiOiBcInN0eWxlc19ibG9nLXNlY3Rpb25fXzFoX0VLXCIsXG5cdFwiYmxvZy1zZWN0aW9uLWNvbnRlbnRcIjogXCJzdHlsZXNfYmxvZy1zZWN0aW9uLWNvbnRlbnRfXzF1RGtLXCIsXG5cdFwiYmxvZy1zZWN0aW9uLWRlc2NyaXB0aW9uXCI6IFwic3R5bGVzX2Jsb2ctc2VjdGlvbi1kZXNjcmlwdGlvbl9fMm9VVmtcIixcblx0XCJibG9nLXByZXZpZXctY29udGFpbmVyXCI6IFwic3R5bGVzX2Jsb2ctcHJldmlldy1jb250YWluZXJfXzlqMmhNXCIsXG5cdFwiYmx1ZS1jaXJjbGVcIjogXCJzdHlsZXNfYmx1ZS1jaXJjbGVfXzM2QTUwXCIsXG5cdFwiY2FyZC1jb250YWluZXJcIjogXCJzdHlsZXNfY2FyZC1jb250YWluZXJfX0RINTY4XCIsXG5cdFwidG9waWMtcHJldmlldy1jb250YWluZXJcIjogXCJzdHlsZXNfdG9waWMtcHJldmlldy1jb250YWluZXJfXzJYYnZQXCIsXG5cdFwidG9waWMtZGVzY3JpcHRpb25cIjogXCJzdHlsZXNfdG9waWMtZGVzY3JpcHRpb25fXzNfSnkwXCJcbn07XG4iLCIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJleHBlcnRpc2Utc2VjdGlvblwiOiBcInN0eWxlc19leHBlcnRpc2Utc2VjdGlvbl9fMTVKVlBcIixcblx0XCJleHBlcnRpc2Utc2VjdGlvbi1jb250ZW50XCI6IFwic3R5bGVzX2V4cGVydGlzZS1zZWN0aW9uLWNvbnRlbnRfXzFrTnhOXCIsXG5cdFwiZXhwZXJ0aXNlLXNlY3Rpb24tZGVzY3JpcHRpb25cIjogXCJzdHlsZXNfZXhwZXJ0aXNlLXNlY3Rpb24tZGVzY3JpcHRpb25fXzJCN0JTXCIsXG5cdFwiY29tcGFuaWVzLWxvZ29zXCI6IFwic3R5bGVzX2NvbXBhbmllcy1sb2dvc19fMmFRRUhcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImhlcm8tc2VjdGlvblwiOiBcInN0eWxlc19oZXJvLXNlY3Rpb25fXzN5bnhNXCIsXG5cdFwiaGVyby1zZWN0aW9uLWNvbnRlbnRcIjogXCJzdHlsZXNfaGVyby1zZWN0aW9uLWNvbnRlbnRfXzN5M20zXCIsXG5cdFwiaGVyby1zZWN0aW9uLWRlc2NyaXB0aW9uXCI6IFwic3R5bGVzX2hlcm8tc2VjdGlvbi1kZXNjcmlwdGlvbl9fUUNocVpcIixcblx0XCJpbWFnZS1jb250YWluZXJcIjogXCJzdHlsZXNfaW1hZ2UtY29udGFpbmVyX19yWVRTTlwiLFxuXHRcImdvLWJhY2tcIjogXCJzdHlsZXNfZ28tYmFja19fMWRhMGNcIlxufTtcbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInN1Y2Nlc3MtY2FzZXMtc2VjdGlvblwiOiBcInN0eWxlc19zdWNjZXNzLWNhc2VzLXNlY3Rpb25fXzJtellOXCIsXG5cdFwic3VjY2Vzcy1jYXNlcy1zZWN0aW9uLWNvbnRlbnRcIjogXCJzdHlsZXNfc3VjY2Vzcy1jYXNlcy1zZWN0aW9uLWNvbnRlbnRfXzNQZkRXXCIsXG5cdFwic3VjY2Vzcy1jYXNlcy1zZWN0aW9uLWRlc2NyaXB0aW9uXCI6IFwic3R5bGVzX3N1Y2Nlc3MtY2FzZXMtc2VjdGlvbi1kZXNjcmlwdGlvbl9fMkdZWHdcIixcblx0XCJncmF5LWNpcmNsZVwiOiBcInN0eWxlc19ncmF5LWNpcmNsZV9fVUdGMlhcIixcblx0XCJjb2xvcnNcIjogXCJzdHlsZXNfY29sb3JzX18xZVlRM1wiLFxuXHRcImRlcG9pbWVudC1jYXJkXCI6IFwic3R5bGVzX2RlcG9pbWVudC1jYXJkX18yRVM2OFwiLFxuXHRcImRlcG9pbWVudC1jYXJkLWNvbnRlbnRcIjogXCJzdHlsZXNfZGVwb2ltZW50LWNhcmQtY29udGVudF9fMXlpU0hcIixcblx0XCJkZXBvaW1lbnQtY2FyZC1mb290ZXJcIjogXCJzdHlsZXNfZGVwb2ltZW50LWNhcmQtZm9vdGVyX18yQU9DWFwiLFxuXHRcImRlcG9pbWVudC1jYXJkLWF1dGhvclwiOiBcInN0eWxlc19kZXBvaW1lbnQtY2FyZC1hdXRob3JfXzNMMFZzXCJcbn07XG4iLCIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvaW1hZ2UnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2xpZW50L2xpbmsnKVxuIiwiLy8gVEhJUyBGSUxFIElTIEFVVE8gR0VORVJBVEVEXG5pbXBvcnQgeyBHZW5JY29uIH0gZnJvbSAnLi4vbGliJztcbmV4cG9ydCBmdW5jdGlvbiBGaUFjdGl2aXR5IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIgMTIgMTggMTIgMTUgMjEgOSAzIDYgMTIgMiAxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFpcnBsYXkgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNSAxN0g0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2MTBhMiAyIDAgMCAxLTIgMmgtMVwifX0se1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMiAxNSAxNyAyMSA3IDIxIDEyIDE1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQWxlcnRDaXJjbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjE2XCIsXCJ4MlwiOlwiMTIuMDFcIixcInkyXCI6XCIxNlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFsZXJ0T2N0YWdvbiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNy44NiAyIDE2LjE0IDIgMjIgNy44NiAyMiAxNi4xNCAxNi4xNCAyMiA3Ljg2IDIyIDIgMTYuMTQgMiA3Ljg2IDcuODYgMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjE2XCIsXCJ4MlwiOlwiMTIuMDFcIixcInkyXCI6XCIxNlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFsZXJ0VHJpYW5nbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTAuMjkgMy44NkwxLjgyIDE4YTIgMiAwIDAgMCAxLjcxIDNoMTYuOTRhMiAyIDAgMCAwIDEuNzEtM0wxMy43MSAzLjg2YTIgMiAwIDAgMC0zLjQyIDB6XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMTdcIixcIngyXCI6XCIxMi4wMVwiLFwieTJcIjpcIjE3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQWxpZ25DZW50ZXIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMThcIixcInkxXCI6XCIxMFwiLFwieDJcIjpcIjZcIixcInkyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIxXCIsXCJ5MVwiOlwiNlwiLFwieDJcIjpcIjNcIixcInkyXCI6XCI2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIxNFwiLFwieDJcIjpcIjNcIixcInkyXCI6XCIxNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4XCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCI2XCIsXCJ5MlwiOlwiMThcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBbGlnbkp1c3RpZnkgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIxMFwiLFwieDJcIjpcIjNcIixcInkyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIxXCIsXCJ5MVwiOlwiNlwiLFwieDJcIjpcIjNcIixcInkyXCI6XCI2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIxNFwiLFwieDJcIjpcIjNcIixcInkyXCI6XCIxNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIxXCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCIzXCIsXCJ5MlwiOlwiMThcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBbGlnbkxlZnQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTdcIixcInkxXCI6XCIxMFwiLFwieDJcIjpcIjNcIixcInkyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIxXCIsXCJ5MVwiOlwiNlwiLFwieDJcIjpcIjNcIixcInkyXCI6XCI2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIxNFwiLFwieDJcIjpcIjNcIixcInkyXCI6XCIxNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE3XCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCIzXCIsXCJ5MlwiOlwiMThcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBbGlnblJpZ2h0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIxXCIsXCJ5MVwiOlwiMTBcIixcIngyXCI6XCI3XCIsXCJ5MlwiOlwiMTBcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMVwiLFwieTFcIjpcIjZcIixcIngyXCI6XCIzXCIsXCJ5MlwiOlwiNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIxXCIsXCJ5MVwiOlwiMTRcIixcIngyXCI6XCIzXCIsXCJ5MlwiOlwiMTRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMVwiLFwieTFcIjpcIjE4XCIsXCJ4MlwiOlwiN1wiLFwieTJcIjpcIjE4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQW5jaG9yIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCI1XCIsXCJyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIyMlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiOFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTUgMTJIMmExMCAxMCAwIDAgMCAyMCAwaC0zXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQXBlcnR1cmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE0LjMxXCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjIwLjA1XCIsXCJ5MlwiOlwiMTcuOTRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5LjY5XCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjIxLjE3XCIsXCJ5MlwiOlwiOFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjcuMzhcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjEzLjEyXCIsXCJ5MlwiOlwiMi4wNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjkuNjlcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjMuOTVcIixcInkyXCI6XCI2LjA2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTQuMzFcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjIuODNcIixcInkyXCI6XCIxNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE2LjYyXCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIxMC44OFwiLFwieTJcIjpcIjIxLjk0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQXJjaGl2ZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIxIDggMjEgMjEgMyAyMSAzIDhcIn19LHtcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjFcIixcInlcIjpcIjNcIixcIndpZHRoXCI6XCIyMlwiLFwiaGVpZ2h0XCI6XCI1XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTBcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjE0XCIsXCJ5MlwiOlwiMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBcnJvd0Rvd25DaXJjbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiOCAxMiAxMiAxNiAxNiAxMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBcnJvd0Rvd25MZWZ0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE3XCIsXCJ5MVwiOlwiN1wiLFwieDJcIjpcIjdcIixcInkyXCI6XCIxN1wifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTcgMTcgNyAxNyA3IDdcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBcnJvd0Rvd25SaWdodCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI3XCIsXCJ5MVwiOlwiN1wiLFwieDJcIjpcIjE3XCIsXCJ5MlwiOlwiMTdcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE3IDcgMTcgMTcgNyAxN1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFycm93RG93biAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjVcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjE5XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxOSAxMiAxMiAxOSA1IDEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQXJyb3dMZWZ0Q2lyY2xlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMTBcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEyIDggOCAxMiAxMiAxNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE2XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCI4XCIsXCJ5MlwiOlwiMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBcnJvd0xlZnQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTlcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjVcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTIgMTkgNSAxMiAxMiA1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQXJyb3dSaWdodENpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMiAxNiAxNiAxMiAxMiA4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOFwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTZcIixcInkyXCI6XCIxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFycm93UmlnaHQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNVwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTlcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTIgNSAxOSAxMiAxMiAxOVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFycm93VXBDaXJjbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTYgMTIgMTIgOCA4IDEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFycm93VXBMZWZ0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE3XCIsXCJ5MVwiOlwiMTdcIixcIngyXCI6XCI3XCIsXCJ5MlwiOlwiN1wifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNyAxNyA3IDcgMTcgN1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUFycm93VXBSaWdodCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI3XCIsXCJ5MVwiOlwiMTdcIixcIngyXCI6XCIxN1wiLFwieTJcIjpcIjdcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjcgNyAxNyA3IDE3IDE3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQXJyb3dVcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjE5XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCI1XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI1IDEyIDEyIDUgMTkgMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlBdFNpZ24gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTYgOHY1YTMgMyAwIDAgMCA2IDB2LTFhMTAgMTAgMCAxIDAtMy45MiA3Ljk0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQXdhcmQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjhcIixcInJcIjpcIjdcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjguMjEgMTMuODkgNyAyMyAxMiAyMCAxNyAyMyAxNS43OSAxMy44OFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUJhckNoYXJ0MiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxOFwiLFwieTFcIjpcIjIwXCIsXCJ4MlwiOlwiMThcIixcInkyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI2XCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCI2XCIsXCJ5MlwiOlwiMTRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCYXJDaGFydCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjIwXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4XCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCIxOFwiLFwieTJcIjpcIjRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI2XCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCI2XCIsXCJ5MlwiOlwiMTZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCYXR0ZXJ5Q2hhcmdpbmcgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNSAxOEgzYTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDMuMTlNMTUgNmgyYTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAyaC0zLjE5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjNcIixcInkxXCI6XCIxM1wiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMTFcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjExIDYgNyAxMiAxMyAxMiA5IDE4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQmF0dGVyeSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjFcIixcInlcIjpcIjZcIixcIndpZHRoXCI6XCIxOFwiLFwiaGVpZ2h0XCI6XCIxMlwiLFwicnhcIjpcIjJcIixcInJ5XCI6XCIyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjNcIixcInkxXCI6XCIxM1wiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMTFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCZWxsT2ZmIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEzLjczIDIxYTIgMiAwIDAgMS0zLjQ2IDBcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOC42MyAxM0ExNy44OSAxNy44OSAwIDAgMSAxOCA4XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNi4yNiA2LjI2QTUuODYgNS44NiAwIDAgMCA2IDhjMCA3LTMgOS0zIDloMTRcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOCA4YTYgNiAwIDAgMC05LjMzLTVcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCZWxsIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE4IDhBNiA2IDAgMCAwIDYgOGMwIDctMyA5LTMgOWgxOHMtMy0yLTMtOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEzLjczIDIxYTIgMiAwIDAgMS0zLjQ2IDBcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCbHVldG9vdGggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI2LjUgNi41IDE3LjUgMTcuNSAxMiAyMyAxMiAxIDE3LjUgNi41IDYuNSAxNy41XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQm9sZCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk02IDRoOGE0IDQgMCAwIDEgNCA0IDQgNCAwIDAgMS00IDRINnpcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk02IDEyaDlhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEtNCA0SDZ6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQm9va09wZW4gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMiAzaDZhNCA0IDAgMCAxIDQgNHYxNGEzIDMgMCAwIDAtMy0zSDJ6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjIgM2gtNmE0IDQgMCAwIDAtNCA0djE0YTMgMyAwIDAgMSAzLTNoN3pcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCb29rIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTQgMTkuNUEyLjUgMi41IDAgMCAxIDYuNSAxN0gyMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTYuNSAySDIwdjIwSDYuNUEyLjUgMi41IDAgMCAxIDQgMTkuNXYtMTVBMi41IDIuNSAwIDAgMSA2LjUgMnpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCb29rbWFyayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOSAyMWwtNy01LTcgNVY1YTIgMiAwIDAgMSAyLTJoMTBhMiAyIDAgMCAxIDIgMnpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlCb3ggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjIuMDhcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQnJpZWZjYXNlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMlwiLFwieVwiOlwiN1wiLFwid2lkdGhcIjpcIjIwXCIsXCJoZWlnaHRcIjpcIjE0XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNiAyMVY1YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYxNlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNhbGVuZGFyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiNFwiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjJcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMlwiLFwieDJcIjpcIjhcIixcInkyXCI6XCI2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiM1wiLFwieTFcIjpcIjEwXCIsXCJ4MlwiOlwiMjFcIixcInkyXCI6XCIxMFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNhbWVyYU9mZiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMjNcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMSAyMUgzYTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDNtMy0zaDZsMiAzaDRhMiAyIDAgMCAxIDIgMnY5LjM0bS03LjcyLTIuMDZhNCA0IDAgMSAxLTUuNTYtNS41NlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNhbWVyYSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMyAxOWEyIDIgMCAwIDEtMiAySDNhMiAyIDAgMCAxLTItMlY4YTIgMiAwIDAgMSAyLTJoNGwyLTNoNmwyIDNoNGEyIDIgMCAwIDEgMiAyelwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxM1wiLFwiclwiOlwiNFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNhc3QgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMiAxNi4xQTUgNSAwIDAgMSA1LjkgMjBNMiAxMi4wNUE5IDkgMCAwIDEgOS45NSAyME0yIDhWNmEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMmgtNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjJcIixcInkxXCI6XCIyMFwiLFwieDJcIjpcIjIuMDFcIixcInkyXCI6XCIyMFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNoZWNrQ2lyY2xlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIyIDExLjA4VjEyYTEwIDEwIDAgMSAxLTUuOTMtOS4xNFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIgNCAxMiAxNC4wMSA5IDExLjAxXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2hlY2tTcXVhcmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5IDExIDEyIDE0IDIyIDRcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMSAxMnY3YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgxMVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNoZWNrIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjAgNiA5IDE3IDQgMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDaGV2cm9uRG93biAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjYgOSAxMiAxNSAxOCA5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2hldnJvbkxlZnQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNSAxOCA5IDEyIDE1IDZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDaGV2cm9uUmlnaHQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5IDE4IDE1IDEyIDkgNlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNoZXZyb25VcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE4IDE1IDEyIDkgNiAxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNoZXZyb25zRG93biAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjcgMTMgMTIgMTggMTcgMTNcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjcgNiAxMiAxMSAxNyA2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2hldnJvbnNMZWZ0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTEgMTcgNiAxMiAxMSA3XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxOCAxNyAxMyAxMiAxOCA3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2hldnJvbnNSaWdodCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEzIDE3IDE4IDEyIDEzIDdcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjYgMTcgMTEgMTIgNiA3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2hldnJvbnNVcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE3IDExIDEyIDYgNyAxMVwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTcgMTggMTIgMTMgNyAxOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNocm9tZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjEuMTdcIixcInkxXCI6XCI4XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCI4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMy45NVwiLFwieTFcIjpcIjYuMDZcIixcIngyXCI6XCI4LjU0XCIsXCJ5MlwiOlwiMTRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMC44OFwiLFwieTFcIjpcIjIxLjk0XCIsXCJ4MlwiOlwiMTUuNDZcIixcInkyXCI6XCIxNFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2xpcGJvYXJkIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE2IDRoMmEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgyXCJ9fSx7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCI4XCIsXCJ5XCI6XCIyXCIsXCJ3aWR0aFwiOlwiOFwiLFwiaGVpZ2h0XCI6XCI0XCIsXCJyeFwiOlwiMVwiLFwicnlcIjpcIjFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDbG9jayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMiA2IDEyIDEyIDE2IDE0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2xvdWREcml6emxlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIxOVwiLFwieDJcIjpcIjhcIixcInkyXCI6XCIyMVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIxM1wiLFwieDJcIjpcIjhcIixcInkyXCI6XCIxNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE2XCIsXCJ5MVwiOlwiMTlcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjIxXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTZcIixcInkxXCI6XCIxM1wiLFwieDJcIjpcIjE2XCIsXCJ5MlwiOlwiMTVcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjIxXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIyM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjE3XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjAgMTYuNThBNSA1IDAgMCAwIDE4IDdoLTEuMjZBOCA4IDAgMSAwIDQgMTUuMjVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDbG91ZExpZ2h0bmluZyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOSAxNi45QTUgNSAwIDAgMCAxOCA3aC0xLjI2YTggOCAwIDEgMC0xMS42MiA5XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMyAxMSA5IDE3IDE1IDE3IDExIDIzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ2xvdWRPZmYgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjIuNjEgMTYuOTVBNSA1IDAgMCAwIDE4IDEwaC0xLjI2YTggOCAwIDAgMC03LjA1LTZNNSA1YTggOCAwIDAgMCA0IDE1aDlhNSA1IDAgMCAwIDEuNy0uM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjFcIixcInkxXCI6XCIxXCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCIyM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNsb3VkUmFpbiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjEzXCIsXCJ4MlwiOlwiMTZcIixcInkyXCI6XCIyMVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIxM1wiLFwieDJcIjpcIjhcIixcInkyXCI6XCIyMVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjIzXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjAgMTYuNThBNSA1IDAgMCAwIDE4IDdoLTEuMjZBOCA4IDAgMSAwIDQgMTUuMjVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDbG91ZFNub3cgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjAgMTcuNThBNSA1IDAgMCAwIDE4IDhoLTEuMjZBOCA4IDAgMSAwIDQgMTYuMjVcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMTZcIixcIngyXCI6XCI4LjAxXCIsXCJ5MlwiOlwiMTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCI4LjAxXCIsXCJ5MlwiOlwiMjBcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjE4XCIsXCJ4MlwiOlwiMTIuMDFcIixcInkyXCI6XCIxOFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjJcIixcIngyXCI6XCIxMi4wMVwiLFwieTJcIjpcIjIyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTZcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjE2LjAxXCIsXCJ5MlwiOlwiMTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjIwXCIsXCJ4MlwiOlwiMTYuMDFcIixcInkyXCI6XCIyMFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNsb3VkIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE4IDEwaC0xLjI2QTggOCAwIDEgMCA5IDIwaDlhNSA1IDAgMCAwIDAtMTB6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29kZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE2IDE4IDIyIDEyIDE2IDZcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjggNiAyIDEyIDggMThcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDb2RlcGVuIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMiAyIDIyIDguNSAyMiAxNS41IDEyIDIyIDIgMTUuNSAyIDguNSAxMiAyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIyMlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTUuNVwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIgOC41IDEyIDE1LjUgMiA4LjVcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIgMTUuNSAxMiA4LjUgMjIgMTUuNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiOC41XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29kZXNhbmRib3ggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI3LjUgNC4yMSAxMiA2LjgxIDE2LjUgNC4yMVwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNy41IDE5Ljc5IDcuNSAxNC42IDMgMTJcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIxIDEyIDE2LjUgMTQuNiAxNi41IDE5Ljc5XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjIuMDhcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29mZmVlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE4IDhoMWE0IDQgMCAwIDEgMCA4aC0xXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMiA4aDE2djlhNCA0IDAgMCAxLTQgNEg2YTQgNCAwIDAgMS00LTRWOHpcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI2XCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjZcIixcInkyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTBcIixcInkxXCI6XCIxXCIsXCJ4MlwiOlwiMTBcIixcInkyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTRcIixcInkxXCI6XCIxXCIsXCJ4MlwiOlwiMTRcIixcInkyXCI6XCI0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29sdW1ucyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiAzaDdhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAyaC03bTAtMThINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoN20wLTE4djE4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29tbWFuZCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOCAzYTMgMyAwIDAgMC0zIDN2MTJhMyAzIDAgMCAwIDMgMyAzIDMgMCAwIDAgMy0zIDMgMyAwIDAgMC0zLTNINmEzIDMgMCAwIDAtMyAzIDMgMyAwIDAgMCAzIDMgMyAzIDAgMCAwIDMtM1Y2YTMgMyAwIDAgMC0zLTMgMyAzIDAgMCAwLTMgMyAzIDMgMCAwIDAgMyAzaDEyYTMgMyAwIDAgMCAzLTMgMyAzIDAgMCAwLTMtM3pcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDb21wYXNzIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMTBcIn19LHtcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTYuMjQgNy43NiAxNC4xMiAxNC4xMiA3Ljc2IDE2LjI0IDkuODggOS44OCAxNi4yNCA3Ljc2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29weSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjlcIixcInlcIjpcIjlcIixcIndpZHRoXCI6XCIxM1wiLFwiaGVpZ2h0XCI6XCIxM1wiLFwicnhcIjpcIjJcIixcInJ5XCI6XCIyXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNSAxNUg0YTIgMiAwIDAgMS0yLTJWNGEyIDIgMCAwIDEgMi0yaDlhMiAyIDAgMCAxIDIgMnYxXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ29ybmVyRG93bkxlZnQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5IDEwIDQgMTUgOSAyMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwIDR2N2E0IDQgMCAwIDEtNCA0SDRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDb3JuZXJEb3duUmlnaHQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNSAxMCAyMCAxNSAxNSAyMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTQgNHY3YTQgNCAwIDAgMCA0IDRoMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDb3JuZXJMZWZ0RG93biAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE0IDE1IDkgMjAgNCAxNVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwIDRoLTdhNCA0IDAgMCAwLTQgNHYxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNvcm5lckxlZnRVcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE0IDkgOSA0IDQgOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwIDIwaC03YTQgNCAwIDAgMS00LTRWNFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNvcm5lclJpZ2h0RG93biAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEwIDE1IDE1IDIwIDIwIDE1XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNCA0aDdhNCA0IDAgMCAxIDQgNHYxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNvcm5lclJpZ2h0VXAgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMCA5IDE1IDQgMjAgOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTQgMjBoN2E0IDQgMCAwIDAgNC00VjRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDb3JuZXJVcExlZnQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5IDE0IDQgOSA5IDRcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMCAyMHYtN2E0IDQgMCAwIDAtNC00SDRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDb3JuZXJVcFJpZ2h0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTUgMTQgMjAgOSAxNSA0XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNCAyMHYtN2E0IDQgMCAwIDEgNC00aDEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ3B1IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiNFwiLFwieVwiOlwiNFwiLFwid2lkdGhcIjpcIjE2XCIsXCJoZWlnaHRcIjpcIjE2XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjlcIixcInlcIjpcIjlcIixcIndpZHRoXCI6XCI2XCIsXCJoZWlnaHRcIjpcIjZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5XCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjlcIixcInkyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTVcIixcInkxXCI6XCIxXCIsXCJ4MlwiOlwiMTVcIixcInkyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOVwiLFwieTFcIjpcIjIwXCIsXCJ4MlwiOlwiOVwiLFwieTJcIjpcIjIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTVcIixcInkxXCI6XCIyMFwiLFwieDJcIjpcIjE1XCIsXCJ5MlwiOlwiMjNcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMFwiLFwieTFcIjpcIjlcIixcIngyXCI6XCIyM1wiLFwieTJcIjpcIjlcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMFwiLFwieTFcIjpcIjE0XCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCIxNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjFcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiNFwiLFwieTJcIjpcIjlcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMTRcIixcIngyXCI6XCI0XCIsXCJ5MlwiOlwiMTRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlDcmVkaXRDYXJkIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMVwiLFwieVwiOlwiNFwiLFwid2lkdGhcIjpcIjIyXCIsXCJoZWlnaHRcIjpcIjE2XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMTBcIixcIngyXCI6XCIyM1wiLFwieTJcIjpcIjEwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpQ3JvcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk02LjEzIDFMNiAxNmEyIDIgMCAwIDAgMiAyaDE1XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMSA2LjEzTDE2IDZhMiAyIDAgMCAxIDIgMnYxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUNyb3NzaGFpciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjJcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjE4XCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI2XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIyXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjZcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjIyXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaURhdGFiYXNlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJlbGxpcHNlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiNVwiLFwicnhcIjpcIjlcIixcInJ5XCI6XCIzXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTJjMCAxLjY2LTQgMy05IDNzLTktMS4zNC05LTNcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0zIDV2MTRjMCAxLjY2IDQgMyA5IDNzOS0xLjM0IDktM1Y1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRGVsZXRlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIxIDRIOGwtNyA4IDcgOGgxM2EyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTItMnpcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxOFwiLFwieTFcIjpcIjlcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjE1XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiMThcIixcInkyXCI6XCIxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaURpc2MgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaURpdmlkZUNpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjhcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRGl2aWRlU3F1YXJlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjhcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlEaXZpZGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjZcIixcInJcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI1XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIxOVwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjE4XCIsXCJyXCI6XCIyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRG9sbGFyU2lnbiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjFcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjIzXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTcgNUg5LjVhMy41IDMuNSAwIDAgMCAwIDdoNWEzLjUgMy41IDAgMCAxIDAgN0g2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRG93bmxvYWRDbG91ZCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjggMTcgMTIgMjEgMTYgMTdcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIyMVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwLjg4IDE4LjA5QTUgNSAwIDAgMCAxOCA5aC0xLjI2QTggOCAwIDEgMCAzIDE2LjI5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRG93bmxvYWQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNyAxMCAxMiAxNSAxNyAxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlEcmliYmJsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNOC41NiAyLjc1YzQuMzcgNi4wMyA2LjAyIDkuNDIgOC4wMyAxNy43Mm0yLjU0LTE1LjM4Yy0zLjcyIDQuMzUtOC45NCA1LjY2LTE2Ljg4IDUuODVtMTkuNSAxLjljLTMuNS0uOTMtNi42My0uODItOC45NCAwLTIuNTguOTItNS4wMSAyLjg2LTcuNDQgNi4zMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaURyb3BsZXQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTIgMi42OWw1LjY2IDUuNjZhOCA4IDAgMSAxLTExLjMxIDB6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRWRpdDIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTcgM2EyLjgyOCAyLjgyOCAwIDEgMSA0IDRMNy41IDIwLjUgMiAyMmwxLjUtNS41TDE3IDN6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRWRpdDMgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTIgMjBoOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE2LjUgMy41YTIuMTIxIDIuMTIxIDAgMCAxIDMgM0w3IDE5bC00IDEgMS00TDE2LjUgMy41elwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUVkaXQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTEgNEg0YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTguNSAyLjVhMi4xMjEgMi4xMjEgMCAwIDEgMyAzTDEyIDE1bC00IDEgMS00IDkuNS05LjV6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRXh0ZXJuYWxMaW5rIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE4IDEzdjZhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDZcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE1IDMgMjEgMyAyMSA5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTBcIixcInkxXCI6XCIxNFwiLFwieDJcIjpcIjIxXCIsXCJ5MlwiOlwiM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUV5ZU9mZiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNy45NCAxNy45NEExMC4wNyAxMC4wNyAwIDAgMSAxMiAyMGMtNyAwLTExLTgtMTEtOGExOC40NSAxOC40NSAwIDAgMSA1LjA2LTUuOTRNOS45IDQuMjRBOS4xMiA5LjEyIDAgMCAxIDEyIDRjNyAwIDExIDggMTEgOGExOC41IDE4LjUgMCAwIDEtMi4xNiAzLjE5bS02LjcyLTEuMDdhMyAzIDAgMSAxLTQuMjQtNC4yNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjFcIixcInkxXCI6XCIxXCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCIyM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUV5ZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xIDEyczQtOCAxMS04IDExIDggMTEgOC00IDgtMTEgOC0xMS04LTExLTh6XCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRmFjZWJvb2sgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTggMmgtM2E1IDUgMCAwIDAtNSA1djNIN3Y0aDN2OGg0di04aDNsMS00aC00VjdhMSAxIDAgMCAxIDEtMWgzelwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUZhc3RGb3J3YXJkIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMyAxOSAyMiAxMiAxMyA1IDEzIDE5XCJ9fSx7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIgMTkgMTEgMTIgMiA1IDIgMTlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlGZWF0aGVyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwLjI0IDEyLjI0YTYgNiAwIDAgMC04LjQ5LTguNDlMNSAxMC41VjE5aDguNXpcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIyXCIsXCJ5MlwiOlwiMjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNy41XCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCI5XCIsXCJ5MlwiOlwiMTVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlGaWdtYSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk01IDUuNUEzLjUgMy41IDAgMCAxIDguNSAySDEydjdIOC41QTMuNSAzLjUgMCAwIDEgNSA1LjV6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTIgMmgzLjVhMy41IDMuNSAwIDEgMSAwIDdIMTJWMnpcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiAxMi41YTMuNSAzLjUgMCAxIDEgNyAwIDMuNSAzLjUgMCAxIDEtNyAwelwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTUgMTkuNUEzLjUgMy41IDAgMCAxIDguNSAxNkgxMnYzLjVhMy41IDMuNSAwIDEgMS03IDB6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNSAxMi41QTMuNSAzLjUgMCAwIDEgOC41IDlIMTJ2N0g4LjVBMy41IDMuNSAwIDAgMSA1IDEyLjV6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRmlsZU1pbnVzIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4elwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTQgMiAxNCA4IDIwIDhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5XCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCIxNVwiLFwieTJcIjpcIjE1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRmlsZVBsdXMgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjh6XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNCAyIDE0IDggMjAgOFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOVwiLFwieTFcIjpcIjE1XCIsXCJ4MlwiOlwiMTVcIixcInkyXCI6XCIxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUZpbGVUZXh0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4elwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTQgMiAxNCA4IDIwIDhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjEzXCIsXCJ4MlwiOlwiOFwiLFwieTJcIjpcIjEzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTZcIixcInkxXCI6XCIxN1wiLFwieDJcIjpcIjhcIixcInkyXCI6XCIxN1wifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTAgOSA5IDkgOCA5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRmlsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMyAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOXpcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEzIDIgMTMgOSAyMCA5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRmlsbSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjJcIixcInlcIjpcIjJcIixcIndpZHRoXCI6XCIyMFwiLFwiaGVpZ2h0XCI6XCIyMFwiLFwicnhcIjpcIjIuMThcIixcInJ5XCI6XCIyLjE4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiN1wiLFwieTFcIjpcIjJcIixcIngyXCI6XCI3XCIsXCJ5MlwiOlwiMjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxN1wiLFwieTFcIjpcIjJcIixcIngyXCI6XCIxN1wiLFwieTJcIjpcIjIyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMlwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMjJcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjJcIixcInkxXCI6XCI3XCIsXCJ4MlwiOlwiN1wiLFwieTJcIjpcIjdcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyXCIsXCJ5MVwiOlwiMTdcIixcIngyXCI6XCI3XCIsXCJ5MlwiOlwiMTdcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxN1wiLFwieTFcIjpcIjE3XCIsXCJ4MlwiOlwiMjJcIixcInkyXCI6XCIxN1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE3XCIsXCJ5MVwiOlwiN1wiLFwieDJcIjpcIjIyXCIsXCJ5MlwiOlwiN1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUZpbHRlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIgMyAyIDMgMTAgMTIuNDYgMTAgMTkgMTQgMjEgMTQgMTIuNDYgMjIgM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUZsYWcgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNCAxNXMxLTEgNC0xIDUgMiA4IDIgNC0xIDQtMVYzcy0xIDEtNCAxLTUtMi04LTItNCAxLTQgMXpcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI0XCIsXCJ5MVwiOlwiMjJcIixcIngyXCI6XCI0XCIsXCJ5MlwiOlwiMTVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlGb2xkZXJNaW51cyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMiAxOWEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNWwyIDNoOWEyIDIgMCAwIDEgMiAyelwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjlcIixcInkxXCI6XCIxNFwiLFwieDJcIjpcIjE1XCIsXCJ5MlwiOlwiMTRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlGb2xkZXJQbHVzIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIyIDE5YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg1bDIgM2g5YTIgMiAwIDAgMSAyIDJ6XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxMVwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTdcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5XCIsXCJ5MVwiOlwiMTRcIixcIngyXCI6XCIxNVwiLFwieTJcIjpcIjE0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRm9sZGVyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIyIDE5YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg1bDIgM2g5YTIgMiAwIDAgMSAyIDJ6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRnJhbWVyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTUgMTZWOWgxNFYySDVsMTQgMTRoLTdtLTcgMGw3IDd2LTdtLTcgMGg3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpRnJvd24gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE2IDE2cy0xLjUtMi00LTItNCAyLTQgMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjlcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiOS4wMVwiLFwieTJcIjpcIjlcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNVwiLFwieTFcIjpcIjlcIixcIngyXCI6XCIxNS4wMVwiLFwieTJcIjpcIjlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlHaWZ0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjAgMTIgMjAgMjIgNCAyMiA0IDEyXCJ9fSx7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIyXCIsXCJ5XCI6XCI3XCIsXCJ3aWR0aFwiOlwiMjBcIixcImhlaWdodFwiOlwiNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjJcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjdcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiA3SDcuNWEyLjUgMi41IDAgMCAxIDAtNUMxMSAyIDEyIDcgMTIgN3pcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiA3aDQuNWEyLjUgMi41IDAgMCAwIDAtNUMxMyAyIDEyIDcgMTIgN3pcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlHaXRCcmFuY2ggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNlwiLFwieTFcIjpcIjNcIixcIngyXCI6XCI2XCIsXCJ5MlwiOlwiMTVcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjE4XCIsXCJjeVwiOlwiNlwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiNlwiLFwiY3lcIjpcIjE4XCIsXCJyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTggOWE5IDkgMCAwIDEtOSA5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpR2l0Q29tbWl0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEuMDVcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjdcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE3LjAxXCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIyMi45NlwiLFwieTJcIjpcIjEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpR2l0TWVyZ2UgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxOFwiLFwiY3lcIjpcIjE4XCIsXCJyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI2XCIsXCJjeVwiOlwiNlwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTYgMjFWOWE5IDkgMCAwIDAgOSA5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpR2l0UHVsbFJlcXVlc3QgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxOFwiLFwiY3lcIjpcIjE4XCIsXCJyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI2XCIsXCJjeVwiOlwiNlwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEzIDZoM2EyIDIgMCAwIDEgMiAydjdcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI2XCIsXCJ5MVwiOlwiOVwiLFwieDJcIjpcIjZcIixcInkyXCI6XCIyMVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUdpdGh1YiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk05IDE5Yy01IDEuNS01LTIuNS03LTNtMTQgNnYtMy44N2EzLjM3IDMuMzcgMCAwIDAtLjk0LTIuNjFjMy4xNC0uMzUgNi40NC0xLjU0IDYuNDQtN0E1LjQ0IDUuNDQgMCAwIDAgMjAgNC43NyA1LjA3IDUuMDcgMCAwIDAgMTkuOTEgMVMxOC43My42NSAxNiAyLjQ4YTEzLjM4IDEzLjM4IDAgMCAwLTcgMEM2LjI3LjY1IDUuMDkgMSA1LjA5IDFBNS4wNyA1LjA3IDAgMCAwIDUgNC43N2E1LjQ0IDUuNDQgMCAwIDAtMS41IDMuNzhjMCA1LjQyIDMuMyA2LjYxIDYuNDQgN0EzLjM3IDMuMzcgMCAwIDAgOSAxOC4xM1YyMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUdpdGxhYiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMi42NSAxNC4zOUwxMiAyMi4xMyAxLjM1IDE0LjM5YS44NC44NCAwIDAgMS0uMy0uOTRsMS4yMi0zLjc4IDIuNDQtNy41MUEuNDIuNDIgMCAwIDEgNC44MiAyYS40My40MyAwIDAgMSAuNTggMCAuNDIuNDIgMCAwIDEgLjExLjE4bDIuNDQgNy40OWg4LjFsMi40NC03LjUxQS40Mi40MiAwIDAgMSAxOC42IDJhLjQzLjQzIDAgMCAxIC41OCAwIC40Mi40MiAwIDAgMSAuMTEuMThsMi40NCA3LjUxTDIzIDEzLjQ1YS44NC44NCAwIDAgMS0uMzUuOTR6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpR2xvYmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjJcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjIyXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEwelwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUdyaWQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIzXCIsXCJ5XCI6XCIzXCIsXCJ3aWR0aFwiOlwiN1wiLFwiaGVpZ2h0XCI6XCI3XCJ9fSx7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIxNFwiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjdcIixcImhlaWdodFwiOlwiN1wifX0se1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMTRcIixcInlcIjpcIjE0XCIsXCJ3aWR0aFwiOlwiN1wiLFwiaGVpZ2h0XCI6XCI3XCJ9fSx7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIzXCIsXCJ5XCI6XCIxNFwiLFwid2lkdGhcIjpcIjdcIixcImhlaWdodFwiOlwiN1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUhhcmREcml2ZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMlwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMlwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNS40NSA1LjExTDIgMTJ2NmEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJ2LTZsLTMuNDUtNi44OUEyIDIgMCAwIDAgMTYuNzYgNEg3LjI0YTIgMiAwIDAgMC0xLjc5IDEuMTF6XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNlwiLFwieTFcIjpcIjE2XCIsXCJ4MlwiOlwiNi4wMVwiLFwieTJcIjpcIjE2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTBcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjEwLjAxXCIsXCJ5MlwiOlwiMTZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlIYXNoIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjRcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiMjBcIixcInkyXCI6XCI5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNFwiLFwieTFcIjpcIjE1XCIsXCJ4MlwiOlwiMjBcIixcInkyXCI6XCIxNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEwXCIsXCJ5MVwiOlwiM1wiLFwieDJcIjpcIjhcIixcInkyXCI6XCIyMVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE2XCIsXCJ5MVwiOlwiM1wiLFwieDJcIjpcIjE0XCIsXCJ5MlwiOlwiMjFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlIZWFkcGhvbmVzIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTMgMTh2LTZhOSA5IDAgMCAxIDE4IDB2NlwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIxIDE5YTIgMiAwIDAgMS0yIDJoLTFhMiAyIDAgMCAxLTItMnYtM2EyIDIgMCAwIDEgMi0yaDN6TTMgMTlhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMCAyLTJ2LTNhMiAyIDAgMCAwLTItMkgzelwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUhlYXJ0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwLjg0IDQuNjFhNS41IDUuNSAwIDAgMC03Ljc4IDBMMTIgNS42N2wtMS4wNi0xLjA2YTUuNSA1LjUgMCAwIDAtNy43OCA3Ljc4bDEuMDYgMS4wNkwxMiAyMS4yM2w3Ljc4LTcuNzggMS4wNi0xLjA2YTUuNSA1LjUgMCAwIDAgMC03Ljc4elwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUhlbHBDaXJjbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTkuMDkgOWEzIDMgMCAwIDEgNS44MyAxYzAgMi0zIDMtMyAzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxN1wiLFwieDJcIjpcIjEyLjAxXCIsXCJ5MlwiOlwiMTdcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlIZXhhZ29uIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIxIDE2VjhhMiAyIDAgMCAwLTEtMS43M2wtNy00YTIgMiAwIDAgMC0yIDBsLTcgNEEyIDIgMCAwIDAgMyA4djhhMiAyIDAgMCAwIDEgMS43M2w3IDRhMiAyIDAgMCAwIDIgMGw3LTRBMiAyIDAgMCAwIDIxIDE2elwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUhvbWUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMyA5bDktNyA5IDd2MTFhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5IDIyIDkgMTIgMTUgMTIgMTUgMjJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlJbWFnZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjNcIixcInlcIjpcIjNcIixcIndpZHRoXCI6XCIxOFwiLFwiaGVpZ2h0XCI6XCIxOFwiLFwicnhcIjpcIjJcIixcInJ5XCI6XCIyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI4LjVcIixcImN5XCI6XCI4LjVcIixcInJcIjpcIjEuNVwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjEgMTUgMTYgMTAgNSAyMVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUluYm94IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIgMTIgMTYgMTIgMTQgMTUgMTAgMTUgOCAxMiAyIDEyXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNS40NSA1LjExTDIgMTJ2NmEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJ2LTZsLTMuNDUtNi44OUEyIDIgMCAwIDAgMTYuNzYgNEg3LjI0YTIgMiAwIDAgMC0xLjc5IDEuMTF6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpSW5mbyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxNlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIxMi4wMVwiLFwieTJcIjpcIjhcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlJbnN0YWdyYW0gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIyXCIsXCJ5XCI6XCIyXCIsXCJ3aWR0aFwiOlwiMjBcIixcImhlaWdodFwiOlwiMjBcIixcInJ4XCI6XCI1XCIsXCJyeVwiOlwiNVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE2IDExLjM3QTQgNCAwIDEgMSAxMi42MyA4IDQgNCAwIDAgMSAxNiAxMS4zN3pcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNy41XCIsXCJ5MVwiOlwiNi41XCIsXCJ4MlwiOlwiMTcuNTFcIixcInkyXCI6XCI2LjVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlJdGFsaWMgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTlcIixcInkxXCI6XCI0XCIsXCJ4MlwiOlwiMTBcIixcInkyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTRcIixcInkxXCI6XCIyMFwiLFwieDJcIjpcIjVcIixcInkyXCI6XCIyMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE1XCIsXCJ5MVwiOlwiNFwiLFwieDJcIjpcIjlcIixcInkyXCI6XCIyMFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUtleSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMSAybC0yIDJtLTcuNjEgNy42MWE1LjUgNS41IDAgMSAxLTcuNzc4IDcuNzc4IDUuNSA1LjUgMCAwIDEgNy43NzctNy43Nzd6bTAgMEwxNS41IDcuNW0wIDBsMyAzTDIyIDdsLTMtM20tMy41IDMuNUwxOSA0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTGF5ZXJzIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMiAyIDIgNyAxMiAxMiAyMiA3IDEyIDJcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIgMTcgMTIgMjIgMjIgMTdcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIgMTIgMTIgMTcgMjIgMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlMYXlvdXQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIzXCIsXCJ5XCI6XCIzXCIsXCJ3aWR0aFwiOlwiMThcIixcImhlaWdodFwiOlwiMThcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiMjFcIixcInkyXCI6XCI5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOVwiLFwieTFcIjpcIjIxXCIsXCJ4MlwiOlwiOVwiLFwieTJcIjpcIjlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlMaWZlQnVveSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNC45M1wiLFwieTFcIjpcIjQuOTNcIixcIngyXCI6XCI5LjE3XCIsXCJ5MlwiOlwiOS4xN1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE0LjgzXCIsXCJ5MVwiOlwiMTQuODNcIixcIngyXCI6XCIxOS4wN1wiLFwieTJcIjpcIjE5LjA3XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTQuODNcIixcInkxXCI6XCI5LjE3XCIsXCJ4MlwiOlwiMTkuMDdcIixcInkyXCI6XCI0LjkzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTQuODNcIixcInkxXCI6XCI5LjE3XCIsXCJ4MlwiOlwiMTguMzZcIixcInkyXCI6XCI1LjY0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNC45M1wiLFwieTFcIjpcIjE5LjA3XCIsXCJ4MlwiOlwiOS4xN1wiLFwieTJcIjpcIjE0LjgzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTGluazIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTUgN2gzYTUgNSAwIDAgMSA1IDUgNSA1IDAgMCAxLTUgNWgtM20tNiAwSDZhNSA1IDAgMCAxLTUtNSA1IDUgMCAwIDEgNS01aDNcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTGluayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMCAxM2E1IDUgMCAwIDAgNy41NC41NGwzLTNhNSA1IDAgMCAwLTcuMDctNy4wN2wtMS43MiAxLjcxXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTQgMTFhNSA1IDAgMCAwLTcuNTQtLjU0bC0zIDNhNSA1IDAgMCAwIDcuMDcgNy4wN2wxLjcxLTEuNzFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlMaW5rZWRpbiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNiA4YTYgNiAwIDAgMSA2IDZ2N2gtNHYtN2EyIDIgMCAwIDAtMi0yIDIgMiAwIDAgMC0yIDJ2N2gtNHYtN2E2IDYgMCAwIDEgNi02elwifX0se1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMlwiLFwieVwiOlwiOVwiLFwid2lkdGhcIjpcIjRcIixcImhlaWdodFwiOlwiMTJcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjRcIixcImN5XCI6XCI0XCIsXCJyXCI6XCIyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTGlzdCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiNlwiLFwieDJcIjpcIjIxXCIsXCJ5MlwiOlwiNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjIxXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCIyMVwiLFwieTJcIjpcIjE4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiM1wiLFwieTFcIjpcIjZcIixcIngyXCI6XCIzLjAxXCIsXCJ5MlwiOlwiNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjMuMDFcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCIxOFwiLFwieDJcIjpcIjMuMDFcIixcInkyXCI6XCIxOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaUxvYWRlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjJcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjE4XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIyMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjQuOTNcIixcInkxXCI6XCI0LjkzXCIsXCJ4MlwiOlwiNy43NlwiLFwieTJcIjpcIjcuNzZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNi4yNFwiLFwieTFcIjpcIjE2LjI0XCIsXCJ4MlwiOlwiMTkuMDdcIixcInkyXCI6XCIxOS4wN1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjJcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjZcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIyMlwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNC45M1wiLFwieTFcIjpcIjE5LjA3XCIsXCJ4MlwiOlwiNy43NlwiLFwieTJcIjpcIjE2LjI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTYuMjRcIixcInkxXCI6XCI3Ljc2XCIsXCJ4MlwiOlwiMTkuMDdcIixcInkyXCI6XCI0LjkzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTG9jayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjNcIixcInlcIjpcIjExXCIsXCJ3aWR0aFwiOlwiMThcIixcImhlaWdodFwiOlwiMTFcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTcgMTFWN2E1IDUgMCAwIDEgMTAgMHY0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTG9nSW4gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTUgM2g0YTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMmgtNFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTAgMTcgMTUgMTIgMTAgN1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE1XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIzXCIsXCJ5MlwiOlwiMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlMb2dPdXQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNOSAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDRcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE2IDE3IDIxIDEyIDE2IDdcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMVwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiOVwiLFwieTJcIjpcIjEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWFpbCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk00IDRoMTZjMS4xIDAgMiAuOSAyIDJ2MTJjMCAxLjEtLjkgMi0yIDJINGMtMS4xIDAtMi0uOS0yLTJWNmMwLTEuMS45LTIgMi0yelwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIsNiAxMiwxMyAyLDZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlNYXBQaW4gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTBjMCA3LTkgMTMtOSAxM3MtOS02LTktMTNhOSA5IDAgMCAxIDE4IDB6XCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEwXCIsXCJyXCI6XCIzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWFwIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxIDYgMSAyMiA4IDE4IDE2IDIyIDIzIDE4IDIzIDIgMTYgNiA4IDIgMSA2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOFwiLFwieTFcIjpcIjJcIixcIngyXCI6XCI4XCIsXCJ5MlwiOlwiMThcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjZcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjIyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWF4aW1pemUyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTUgMyAyMSAzIDIxIDlcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjkgMjEgMyAyMSAzIDE1XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIzXCIsXCJ4MlwiOlwiMTRcIixcInkyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCIyMVwiLFwieDJcIjpcIjEwXCIsXCJ5MlwiOlwiMTRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlNYXhpbWl6ZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk04IDNINWEyIDIgMCAwIDAtMiAydjNtMTggMFY1YTIgMiAwIDAgMC0yLTJoLTNtMCAxOGgzYTIgMiAwIDAgMCAyLTJ2LTNNMyAxNnYzYTIgMiAwIDAgMCAyIDJoM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1laCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOFwiLFwieTFcIjpcIjE1XCIsXCJ4MlwiOlwiMTZcIixcInkyXCI6XCIxNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjlcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiOS4wMVwiLFwieTJcIjpcIjlcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNVwiLFwieTFcIjpcIjlcIixcIngyXCI6XCIxNS4wMVwiLFwieTJcIjpcIjlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlNZW51IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjIxXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIzXCIsXCJ5MVwiOlwiNlwiLFwieDJcIjpcIjIxXCIsXCJ5MlwiOlwiNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCIxOFwiLFwieDJcIjpcIjIxXCIsXCJ5MlwiOlwiMThcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlNZXNzYWdlQ2lyY2xlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIxIDExLjVhOC4zOCA4LjM4IDAgMCAxLS45IDMuOCA4LjUgOC41IDAgMCAxLTcuNiA0LjcgOC4zOCA4LjM4IDAgMCAxLTMuOC0uOUwzIDIxbDEuOS01LjdhOC4zOCA4LjM4IDAgMCAxLS45LTMuOCA4LjUgOC41IDAgMCAxIDQuNy03LjYgOC4zOCA4LjM4IDAgMCAxIDMuOC0uOWguNWE4LjQ4IDguNDggMCAwIDEgOCA4di41elwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1lc3NhZ2VTcXVhcmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTVhMiAyIDAgMCAxLTIgMkg3bC00IDRWNWEyIDIgMCAwIDEgMi0yaDE0YTIgMiAwIDAgMSAyIDJ6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWljT2ZmIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjFcIixcInkxXCI6XCIxXCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCIyM1wifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTkgOXYzYTMgMyAwIDAgMCA1LjEyIDIuMTJNMTUgOS4zNFY0YTMgMyAwIDAgMC01Ljk0LS42XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTcgMTYuOTVBNyA3IDAgMCAxIDUgMTJ2LTJtMTQgMHYyYTcgNyAwIDAgMS0uMTEgMS4yM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMTlcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOFwiLFwieTFcIjpcIjIzXCIsXCJ4MlwiOlwiMTZcIixcInkyXCI6XCIyM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1pYyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiAxYTMgMyAwIDAgMC0zIDN2OGEzIDMgMCAwIDAgNiAwVjRhMyAzIDAgMCAwLTMtM3pcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOSAxMHYyYTcgNyAwIDAgMS0xNCAwdi0yXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxOVwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMjNcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMjNcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjIzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWluaW1pemUyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNCAxNCAxMCAxNCAxMCAyMFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjAgMTAgMTQgMTAgMTQgNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE0XCIsXCJ5MVwiOlwiMTBcIixcIngyXCI6XCIyMVwiLFwieTJcIjpcIjNcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIzXCIsXCJ5MVwiOlwiMjFcIixcIngyXCI6XCIxMFwiLFwieTJcIjpcIjE0XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWluaW1pemUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNOCAzdjNhMiAyIDAgMCAxLTIgMkgzbTE4IDBoLTNhMiAyIDAgMCAxLTItMlYzbTAgMTh2LTNhMiAyIDAgMCAxIDItMmgzTTMgMTZoM2EyIDIgMCAwIDEgMiAydjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlNaW51c0NpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOFwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTZcIixcInkyXCI6XCIxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1pbnVzU3F1YXJlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMTJcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjEyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTWludXMgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNVwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTlcIixcInkyXCI6XCIxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1vbml0b3IgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIyXCIsXCJ5XCI6XCIzXCIsXCJ3aWR0aFwiOlwiMjBcIixcImhlaWdodFwiOlwiMTRcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIyMVwiLFwieDJcIjpcIjE2XCIsXCJ5MlwiOlwiMjFcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjE3XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIyMVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1vb24gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTIuNzlBOSA5IDAgMSAxIDExLjIxIDMgNyA3IDAgMCAwIDIxIDEyLjc5elwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1vcmVIb3Jpem9udGFsIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMVwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTlcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMVwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiNVwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTW9yZVZlcnRpY2FsIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMVwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCI1XCIsXCJyXCI6XCIxXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjE5XCIsXCJyXCI6XCIxXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTW91c2VQb2ludGVyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTMgM2w3LjA3IDE2Ljk3IDIuNTEtNy4zOSA3LjM5LTIuNTFMMyAzelwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEzIDEzbDYgNlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaU1vdmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI1IDkgMiAxMiA1IDE1XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5IDUgMTIgMiAxNSA1XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNSAxOSAxMiAyMiA5IDE5XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxOSA5IDIyIDEyIDE5IDE1XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMlwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMjJcIixcInkyXCI6XCIxMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMjJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlNdXNpYyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk05IDE4VjVsMTItMnYxM1wifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiNlwiLFwiY3lcIjpcIjE4XCIsXCJyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxOFwiLFwiY3lcIjpcIjE2XCIsXCJyXCI6XCIzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTmF2aWdhdGlvbjIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEyIDIgMTkgMjEgMTIgMTcgNSAyMSAxMiAyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpTmF2aWdhdGlvbiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMyAxMSAyMiAyIDEzIDIxIDExIDEzIDMgMTFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlPY3RhZ29uIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI3Ljg2IDIgMTYuMTQgMiAyMiA3Ljg2IDIyIDE2LjE0IDE2LjE0IDIyIDcuODYgMjIgMiAxNi4xNCAyIDcuODYgNy44NiAyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGFja2FnZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNi41XCIsXCJ5MVwiOlwiOS40XCIsXCJ4MlwiOlwiNy41XCIsXCJ5MlwiOlwiNC4yMVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIxIDE2VjhhMiAyIDAgMCAwLTEtMS43M2wtNy00YTIgMiAwIDAgMC0yIDBsLTcgNEEyIDIgMCAwIDAgMyA4djhhMiAyIDAgMCAwIDEgMS43M2w3IDRhMiAyIDAgMCAwIDIgMGw3LTRBMiAyIDAgMCAwIDIxIDE2elwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMy4yNyA2Ljk2IDEyIDEyLjAxIDIwLjczIDYuOTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjIyLjA4XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVBhcGVyY2xpcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMS40NCAxMS4wNWwtOS4xOSA5LjE5YTYgNiAwIDAgMS04LjQ5LTguNDlsOS4xOS05LjE5YTQgNCAwIDAgMSA1LjY2IDUuNjZsLTkuMiA5LjE5YTIgMiAwIDAgMS0yLjgzLTIuODNsOC40OS04LjQ4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGF1c2VDaXJjbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEwXCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCIxMFwiLFwieTJcIjpcIjlcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNFwiLFwieTFcIjpcIjE1XCIsXCJ4MlwiOlwiMTRcIixcInkyXCI6XCI5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGF1c2UgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCI2XCIsXCJ5XCI6XCI0XCIsXCJ3aWR0aFwiOlwiNFwiLFwiaGVpZ2h0XCI6XCIxNlwifX0se1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMTRcIixcInlcIjpcIjRcIixcIndpZHRoXCI6XCI0XCIsXCJoZWlnaHRcIjpcIjE2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGVuVG9vbCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMiAxOWw3LTcgMyAzLTcgNy0zLTN6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTggMTNsLTEuNS03LjVMMiAybDMuNSAxNC41TDEzIDE4bDUtNXpcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yIDJsNy41ODYgNy41ODZcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjExXCIsXCJjeVwiOlwiMTFcIixcInJcIjpcIjJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQZXJjZW50IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE5XCIsXCJ5MVwiOlwiNVwiLFwieDJcIjpcIjVcIixcInkyXCI6XCIxOVwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiNi41XCIsXCJjeVwiOlwiNi41XCIsXCJyXCI6XCIyLjVcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjE3LjVcIixcImN5XCI6XCIxNy41XCIsXCJyXCI6XCIyLjVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQaG9uZUNhbGwgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTUuMDUgNUE1IDUgMCAwIDEgMTkgOC45NU0xNS4wNSAxQTkgOSAwIDAgMSAyMyA4Ljk0bS0xIDcuOTh2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQaG9uZUZvcndhcmRlZCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE5IDEgMjMgNSAxOSA5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTVcIixcInkxXCI6XCI1XCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCI1XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQaG9uZUluY29taW5nIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTYgMiAxNiA4IDIyIDhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyM1wiLFwieTFcIjpcIjFcIixcIngyXCI6XCIxNlwiLFwieTJcIjpcIjhcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMiAxNi45MnYzYTIgMiAwIDAgMS0yLjE4IDIgMTkuNzkgMTkuNzkgMCAwIDEtOC42My0zLjA3IDE5LjUgMTkuNSAwIDAgMS02LTYgMTkuNzkgMTkuNzkgMCAwIDEtMy4wNy04LjY3QTIgMiAwIDAgMSA0LjExIDJoM2EyIDIgMCAwIDEgMiAxLjcyIDEyLjg0IDEyLjg0IDAgMCAwIC43IDIuODEgMiAyIDAgMCAxLS40NSAyLjExTDguMDkgOS45MWExNiAxNiAwIDAgMCA2IDZsMS4yNy0xLjI3YTIgMiAwIDAgMSAyLjExLS40NSAxMi44NCAxMi44NCAwIDAgMCAyLjgxLjdBMiAyIDAgMCAxIDIyIDE2LjkyelwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVBob25lTWlzc2VkIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIzXCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjE3XCIsXCJ5MlwiOlwiN1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE3XCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiN1wifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIyIDE2LjkydjNhMiAyIDAgMCAxLTIuMTggMiAxOS43OSAxOS43OSAwIDAgMS04LjYzLTMuMDcgMTkuNSAxOS41IDAgMCAxLTYtNiAxOS43OSAxOS43OSAwIDAgMS0zLjA3LTguNjdBMiAyIDAgMCAxIDQuMTEgMmgzYTIgMiAwIDAgMSAyIDEuNzIgMTIuODQgMTIuODQgMCAwIDAgLjcgMi44MSAyIDIgMCAwIDEtLjQ1IDIuMTFMOC4wOSA5LjkxYTE2IDE2IDAgMCAwIDYgNmwxLjI3LTEuMjdhMiAyIDAgMCAxIDIuMTEtLjQ1IDEyLjg0IDEyLjg0IDAgMCAwIDIuODEuN0EyIDIgMCAwIDEgMjIgMTYuOTJ6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGhvbmVPZmYgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTAuNjggMTMuMzFhMTYgMTYgMCAwIDAgMy40MSAyLjZsMS4yNy0xLjI3YTIgMiAwIDAgMSAyLjExLS40NSAxMi44NCAxMi44NCAwIDAgMCAyLjgxLjcgMiAyIDAgMCAxIDEuNzIgMnYzYTIgMiAwIDAgMS0yLjE4IDIgMTkuNzkgMTkuNzkgMCAwIDEtOC42My0zLjA3IDE5LjQyIDE5LjQyIDAgMCAxLTMuMzMtMi42N20tMi42Ny0zLjM0YTE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42M0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyM1wiLFwieTFcIjpcIjFcIixcIngyXCI6XCIxXCIsXCJ5MlwiOlwiMjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQaG9uZU91dGdvaW5nIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjMgNyAyMyAxIDE3IDFcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNlwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIyM1wiLFwieTJcIjpcIjFcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMiAxNi45MnYzYTIgMiAwIDAgMS0yLjE4IDIgMTkuNzkgMTkuNzkgMCAwIDEtOC42My0zLjA3IDE5LjUgMTkuNSAwIDAgMS02LTYgMTkuNzkgMTkuNzkgMCAwIDEtMy4wNy04LjY3QTIgMiAwIDAgMSA0LjExIDJoM2EyIDIgMCAwIDEgMiAxLjcyIDEyLjg0IDEyLjg0IDAgMCAwIC43IDIuODEgMiAyIDAgMCAxLS40NSAyLjExTDguMDkgOS45MWExNiAxNiAwIDAgMCA2IDZsMS4yNy0xLjI3YTIgMiAwIDAgMSAyLjExLS40NSAxMi44NCAxMi44NCAwIDAgMCAyLjgxLjdBMiAyIDAgMCAxIDIyIDE2LjkyelwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVBob25lIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIyIDE2LjkydjNhMiAyIDAgMCAxLTIuMTggMiAxOS43OSAxOS43OSAwIDAgMS04LjYzLTMuMDcgMTkuNSAxOS41IDAgMCAxLTYtNiAxOS43OSAxOS43OSAwIDAgMS0zLjA3LTguNjdBMiAyIDAgMCAxIDQuMTEgMmgzYTIgMiAwIDAgMSAyIDEuNzIgMTIuODQgMTIuODQgMCAwIDAgLjcgMi44MSAyIDIgMCAwIDEtLjQ1IDIuMTFMOC4wOSA5LjkxYTE2IDE2IDAgMCAwIDYgNmwxLjI3LTEuMjdhMiAyIDAgMCAxIDIuMTEtLjQ1IDEyLjg0IDEyLjg0IDAgMCAwIDIuODEuN0EyIDIgMCAwIDEgMjIgMTYuOTJ6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGllQ2hhcnQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEuMjEgMTUuODlBMTAgMTAgMCAxIDEgOCAyLjgzXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjIgMTJBMTAgMTAgMCAwIDAgMTIgMnYxMHpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQbGF5Q2lyY2xlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMTBcIn19LHtcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTAgOCAxNiAxMiAxMCAxNiAxMCA4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGxheSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNSAzIDE5IDEyIDUgMjEgNSAzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUGx1c0NpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCI4XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjE2XCIsXCJ5MlwiOlwiMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQbHVzU3F1YXJlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjE2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOFwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTZcIixcInkyXCI6XCIxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVBsdXMgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCI1XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxOVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjVcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjE5XCIsXCJ5MlwiOlwiMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQb2NrZXQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNCAzaDE2YTIgMiAwIDAgMSAyIDJ2NmExMCAxMCAwIDAgMS0xMCAxMEExMCAxMCAwIDAgMSAyIDExVjVhMiAyIDAgMCAxIDItMnpcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjggMTAgMTIgMTQgMTYgMTBcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlQb3dlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOC4zNiA2LjY0YTkgOSAwIDEgMS0xMi43MyAwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIyXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVByaW50ZXIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI2IDkgNiAyIDE4IDIgMTggOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTYgMThINGEyIDIgMCAwIDEtMi0ydi01YTIgMiAwIDAgMSAyLTJoMTZhMiAyIDAgMCAxIDIgMnY1YTIgMiAwIDAgMS0yIDJoLTJcIn19LHtcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjZcIixcInlcIjpcIjE0XCIsXCJ3aWR0aFwiOlwiMTJcIixcImhlaWdodFwiOlwiOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVJhZGlvIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMlwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE2LjI0IDcuNzZhNiA2IDAgMCAxIDAgOC40OW0tOC40OC0uMDFhNiA2IDAgMCAxIDAtOC40OW0xMS4zMS0yLjgyYTEwIDEwIDAgMCAxIDAgMTQuMTRtLTE0LjE0IDBhMTAgMTAgMCAwIDEgMC0xNC4xNFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVJlZnJlc2hDY3cgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxIDQgMSAxMCA3IDEwXCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIyMyAyMCAyMyAxNCAxNyAxNFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwLjQ5IDlBOSA5IDAgMCAwIDUuNjQgNS42NEwxIDEwbTIyIDRsLTQuNjQgNC4zNkE5IDkgMCAwIDEgMy41MSAxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVJlZnJlc2hDdyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjIzIDQgMjMgMTAgMTcgMTBcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEgMjAgMSAxNCA3IDE0XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMy41MSA5YTkgOSAwIDAgMSAxNC44NS0zLjM2TDIzIDEwTTEgMTRsNC42NCA0LjM2QTkgOSAwIDAgMCAyMC40OSAxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVJlcGVhdCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE3IDEgMjEgNSAxNyA5XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMyAxMVY5YTQgNCAwIDAgMSA0LTRoMTRcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjcgMjMgMyAxOSA3IDE1XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTN2MmE0IDQgMCAwIDEtNCA0SDNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlSZXdpbmQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjExIDE5IDIgMTIgMTEgNSAxMSAxOVwifX0se1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIyMiAxOSAxMyAxMiAyMiA1IDIyIDE5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUm90YXRlQ2N3IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMSA0IDEgMTAgNyAxMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTMuNTEgMTVhOSA5IDAgMSAwIDIuMTMtOS4zNkwxIDEwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpUm90YXRlQ3cgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIyMyA0IDIzIDEwIDE3IDEwXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjAuNDkgMTVhOSA5IDAgMSAxLTIuMTItOS4zNkwyMyAxMFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVJzcyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk00IDExYTkgOSAwIDAgMSA5IDlcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk00IDRhMTYgMTYgMCAwIDEgMTYgMTZcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjVcIixcImN5XCI6XCIxOVwiLFwiclwiOlwiMVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNhdmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTkgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgxMWw1IDV2MTFhMiAyIDAgMCAxLTIgMnpcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE3IDIxIDE3IDEzIDcgMTMgNyAyMVwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiNyAzIDcgOCAxNSA4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU2Npc3NvcnMgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI2XCIsXCJjeVwiOlwiNlwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiNlwiLFwiY3lcIjpcIjE4XCIsXCJyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjBcIixcInkxXCI6XCI0XCIsXCJ4MlwiOlwiOC4xMlwiLFwieTJcIjpcIjE1Ljg4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTQuNDdcIixcInkxXCI6XCIxNC40OFwiLFwieDJcIjpcIjIwXCIsXCJ5MlwiOlwiMjBcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4LjEyXCIsXCJ5MVwiOlwiOC4xMlwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTZWFyY2ggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMVwiLFwiY3lcIjpcIjExXCIsXCJyXCI6XCI4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIyMVwiLFwieDJcIjpcIjE2LjY1XCIsXCJ5MlwiOlwiMTYuNjVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTZW5kIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIyXCIsXCJ5MVwiOlwiMlwiLFwieDJcIjpcIjExXCIsXCJ5MlwiOlwiMTNcIn19LHtcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjIgMiAxNSAyMiAxMSAxMyAyIDkgMjIgMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNlcnZlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjJcIixcInlcIjpcIjJcIixcIndpZHRoXCI6XCIyMFwiLFwiaGVpZ2h0XCI6XCI4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjJcIixcInlcIjpcIjE0XCIsXCJ3aWR0aFwiOlwiMjBcIixcImhlaWdodFwiOlwiOFwiLFwicnhcIjpcIjJcIixcInJ5XCI6XCIyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNlwiLFwieTFcIjpcIjZcIixcIngyXCI6XCI2LjAxXCIsXCJ5MlwiOlwiNlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjZcIixcInkxXCI6XCIxOFwiLFwieDJcIjpcIjYuMDFcIixcInkyXCI6XCIxOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNldHRpbmdzIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE5LjQgMTVhMS42NSAxLjY1IDAgMCAwIC4zMyAxLjgybC4wNi4wNmEyIDIgMCAwIDEgMCAyLjgzIDIgMiAwIDAgMS0yLjgzIDBsLS4wNi0uMDZhMS42NSAxLjY1IDAgMCAwLTEuODItLjMzIDEuNjUgMS42NSAwIDAgMC0xIDEuNTFWMjFhMiAyIDAgMCAxLTIgMiAyIDIgMCAwIDEtMi0ydi0uMDlBMS42NSAxLjY1IDAgMCAwIDkgMTkuNGExLjY1IDEuNjUgMCAwIDAtMS44Mi4zM2wtLjA2LjA2YTIgMiAwIDAgMS0yLjgzIDAgMiAyIDAgMCAxIDAtMi44M2wuMDYtLjA2YTEuNjUgMS42NSAwIDAgMCAuMzMtMS44MiAxLjY1IDEuNjUgMCAwIDAtMS41MS0xSDNhMiAyIDAgMCAxLTItMiAyIDIgMCAwIDEgMi0yaC4wOUExLjY1IDEuNjUgMCAwIDAgNC42IDlhMS42NSAxLjY1IDAgMCAwLS4zMy0xLjgybC0uMDYtLjA2YTIgMiAwIDAgMSAwLTIuODMgMiAyIDAgMCAxIDIuODMgMGwuMDYuMDZhMS42NSAxLjY1IDAgMCAwIDEuODIuMzNIOWExLjY1IDEuNjUgMCAwIDAgMS0xLjUxVjNhMiAyIDAgMCAxIDItMiAyIDIgMCAwIDEgMiAydi4wOWExLjY1IDEuNjUgMCAwIDAgMSAxLjUxIDEuNjUgMS42NSAwIDAgMCAxLjgyLS4zM2wuMDYtLjA2YTIgMiAwIDAgMSAyLjgzIDAgMiAyIDAgMCAxIDAgMi44M2wtLjA2LjA2YTEuNjUgMS42NSAwIDAgMC0uMzMgMS44MlY5YTEuNjUgMS42NSAwIDAgMCAxLjUxIDFIMjFhMiAyIDAgMCAxIDIgMiAyIDIgMCAwIDEtMiAyaC0uMDlhMS42NSAxLjY1IDAgMCAwLTEuNTEgMXpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTaGFyZTIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxOFwiLFwiY3lcIjpcIjVcIixcInJcIjpcIjNcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjZcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMThcIixcImN5XCI6XCIxOVwiLFwiclwiOlwiM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjguNTlcIixcInkxXCI6XCIxMy41MVwiLFwieDJcIjpcIjE1LjQyXCIsXCJ5MlwiOlwiMTcuNDlcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNS40MVwiLFwieTFcIjpcIjYuNTFcIixcIngyXCI6XCI4LjU5XCIsXCJ5MlwiOlwiMTAuNDlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTaGFyZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk00IDEydjhhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0ydi04XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNiA2IDEyIDIgOCA2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIyXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIxNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNoaWVsZE9mZiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOS42OSAxNGE2LjkgNi45IDAgMCAwIC4zMS0yVjVsLTgtMy0zLjE2IDEuMThcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk00LjczIDQuNzNMNCA1djdjMCA2IDggMTAgOCAxMGEyMC4yOSAyMC4yOSAwIDAgMCA1LjYyLTQuMzhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTaGllbGQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTIgMjJzOC00IDgtMTBWNWwtOC0zLTggM3Y3YzAgNiA4IDEwIDggMTB6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU2hvcHBpbmdCYWcgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNNiAyTDMgNnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNmwtMy00elwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjNcIixcInkxXCI6XCI2XCIsXCJ4MlwiOlwiMjFcIixcInkyXCI6XCI2XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTYgMTBhNCA0IDAgMCAxLTggMFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNob3BwaW5nQ2FydCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjlcIixcImN5XCI6XCIyMVwiLFwiclwiOlwiMVwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMjBcIixcImN5XCI6XCIyMVwiLFwiclwiOlwiMVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEgMWg0bDIuNjggMTMuMzlhMiAyIDAgMCAwIDIgMS42MWg5LjcyYTIgMiAwIDAgMCAyLTEuNjFMMjMgNkg2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU2h1ZmZsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE2IDMgMjEgMyAyMSA4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNFwiLFwieTFcIjpcIjIwXCIsXCJ4MlwiOlwiMjFcIixcInkyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIyMSAxNiAyMSAyMSAxNiAyMVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE1XCIsXCJ5MVwiOlwiMTVcIixcIngyXCI6XCIyMVwiLFwieTJcIjpcIjIxXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNFwiLFwieTFcIjpcIjRcIixcIngyXCI6XCI5XCIsXCJ5MlwiOlwiOVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNpZGViYXIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIzXCIsXCJ5XCI6XCIzXCIsXCJ3aWR0aFwiOlwiMThcIixcImhlaWdodFwiOlwiMThcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjlcIixcInkxXCI6XCIzXCIsXCJ4MlwiOlwiOVwiLFwieTJcIjpcIjIxXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU2tpcEJhY2sgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE5IDIwIDkgMTIgMTkgNCAxOSAyMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjVcIixcInkxXCI6XCIxOVwiLFwieDJcIjpcIjVcIixcInkyXCI6XCI1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU2tpcEZvcndhcmQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjUgNCAxNSAxMiA1IDIwIDUgNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE5XCIsXCJ5MVwiOlwiNVwiLFwieDJcIjpcIjE5XCIsXCJ5MlwiOlwiMTlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTbGFjayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNC41IDEwYy0uODMgMC0xLjUtLjY3LTEuNS0xLjV2LTVjMC0uODMuNjctMS41IDEuNS0xLjVzMS41LjY3IDEuNSAxLjV2NWMwIC44My0uNjcgMS41LTEuNSAxLjV6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjAuNSAxMEgxOVY4LjVjMC0uODMuNjctMS41IDEuNS0xLjVzMS41LjY3IDEuNSAxLjUtLjY3IDEuNS0xLjUgMS41elwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTkuNSAxNGMuODMgMCAxLjUuNjcgMS41IDEuNXY1YzAgLjgzLS42NyAxLjUtMS41IDEuNVM4IDIxLjMzIDggMjAuNXYtNWMwLS44My42Ny0xLjUgMS41LTEuNXpcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0zLjUgMTRINXYxLjVjMCAuODMtLjY3IDEuNS0xLjUgMS41UzIgMTYuMzMgMiAxNS41IDIuNjcgMTQgMy41IDE0elwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE0IDE0LjVjMC0uODMuNjctMS41IDEuNS0xLjVoNWMuODMgMCAxLjUuNjcgMS41IDEuNXMtLjY3IDEuNS0xLjUgMS41aC01Yy0uODMgMC0xLjUtLjY3LTEuNS0xLjV6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTUuNSAxOUgxNHYxLjVjMCAuODMuNjcgMS41IDEuNSAxLjVzMS41LS42NyAxLjUtMS41LS42Ny0xLjUtMS41LTEuNXpcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMCA5LjVDMTAgOC42NyA5LjMzIDggOC41IDhoLTVDMi42NyA4IDIgOC42NyAyIDkuNVMyLjY3IDExIDMuNSAxMWg1Yy44MyAwIDEuNS0uNjcgMS41LTEuNXpcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk04LjUgNUgxMFYzLjVDMTAgMi42NyA5LjMzIDIgOC41IDJTNyAyLjY3IDcgMy41IDcuNjcgNSA4LjUgNXpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTbGFzaCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNC45M1wiLFwieTFcIjpcIjQuOTNcIixcIngyXCI6XCIxOS4wN1wiLFwieTJcIjpcIjE5LjA3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU2xpZGVycyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI0XCIsXCJ5MVwiOlwiMjFcIixcIngyXCI6XCI0XCIsXCJ5MlwiOlwiMTRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI0XCIsXCJ5MVwiOlwiMTBcIixcIngyXCI6XCI0XCIsXCJ5MlwiOlwiM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjFcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCI4XCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjBcIixcInkxXCI6XCIyMVwiLFwieDJcIjpcIjIwXCIsXCJ5MlwiOlwiMTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMFwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMjBcIixcInkyXCI6XCIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMVwiLFwieTFcIjpcIjE0XCIsXCJ4MlwiOlwiN1wiLFwieTJcIjpcIjE0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOVwiLFwieTFcIjpcIjhcIixcIngyXCI6XCIxNVwiLFwieTJcIjpcIjhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxN1wiLFwieTFcIjpcIjE2XCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCIxNlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVNtYXJ0cGhvbmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCI1XCIsXCJ5XCI6XCIyXCIsXCJ3aWR0aFwiOlwiMTRcIixcImhlaWdodFwiOlwiMjBcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCIxMi4wMVwiLFwieTJcIjpcIjE4XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU21pbGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjEyXCIsXCJyXCI6XCIxMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTggMTRzMS41IDIgNCAyIDQtMiA0LTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5XCIsXCJ5MVwiOlwiOVwiLFwieDJcIjpcIjkuMDFcIixcInkyXCI6XCI5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTVcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiMTUuMDFcIixcInkyXCI6XCI5XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU3BlYWtlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjRcIixcInlcIjpcIjJcIixcIndpZHRoXCI6XCIxNlwiLFwiaGVpZ2h0XCI6XCIyMFwiLFwicnhcIjpcIjJcIixcInJ5XCI6XCIyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjE0XCIsXCJyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCI2XCIsXCJ4MlwiOlwiMTIuMDFcIixcInkyXCI6XCI2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU3F1YXJlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTdGFyIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMiAyIDE1LjA5IDguMjYgMjIgOS4yNyAxNyAxNC4xNCAxOC4xOCAyMS4wMiAxMiAxNy43NyA1LjgyIDIxLjAyIDcgMTQuMTQgMiA5LjI3IDguOTEgOC4yNiAxMiAyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU3RvcENpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCI5XCIsXCJ5XCI6XCI5XCIsXCJ3aWR0aFwiOlwiNlwiLFwiaGVpZ2h0XCI6XCI2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpU3VuIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiM1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjFcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjIzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNC4yMlwiLFwieTFcIjpcIjQuMjJcIixcIngyXCI6XCI1LjY0XCIsXCJ5MlwiOlwiNS42NFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4LjM2XCIsXCJ5MVwiOlwiMTguMzZcIixcIngyXCI6XCIxOS43OFwiLFwieTJcIjpcIjE5Ljc4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMVwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiM1wiLFwieTJcIjpcIjEyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIxMlwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMTJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI0LjIyXCIsXCJ5MVwiOlwiMTkuNzhcIixcIngyXCI6XCI1LjY0XCIsXCJ5MlwiOlwiMTguMzZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxOC4zNlwiLFwieTFcIjpcIjUuNjRcIixcIngyXCI6XCIxOS43OFwiLFwieTJcIjpcIjQuMjJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTdW5yaXNlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE3IDE4YTUgNSAwIDAgMC0xMCAwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIyXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCI5XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNC4yMlwiLFwieTFcIjpcIjEwLjIyXCIsXCJ4MlwiOlwiNS42NFwiLFwieTJcIjpcIjExLjY0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMVwiLFwieTFcIjpcIjE4XCIsXCJ4MlwiOlwiM1wiLFwieTJcIjpcIjE4XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjFcIixcInkxXCI6XCIxOFwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMThcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxOC4zNlwiLFwieTFcIjpcIjExLjY0XCIsXCJ4MlwiOlwiMTkuNzhcIixcInkyXCI6XCIxMC4yMlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIzXCIsXCJ5MVwiOlwiMjJcIixcIngyXCI6XCIxXCIsXCJ5MlwiOlwiMjJcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjggNiAxMiAyIDE2IDZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlTdW5zZXQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTcgMThhNSA1IDAgMCAwLTEwIDBcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjlcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI0LjIyXCIsXCJ5MVwiOlwiMTAuMjJcIixcIngyXCI6XCI1LjY0XCIsXCJ5MlwiOlwiMTEuNjRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMThcIixcIngyXCI6XCIzXCIsXCJ5MlwiOlwiMThcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMVwiLFwieTFcIjpcIjE4XCIsXCJ4MlwiOlwiMjNcIixcInkyXCI6XCIxOFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4LjM2XCIsXCJ5MVwiOlwiMTEuNjRcIixcIngyXCI6XCIxOS43OFwiLFwieTJcIjpcIjEwLjIyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjNcIixcInkxXCI6XCIyMlwiLFwieDJcIjpcIjFcIixcInkyXCI6XCIyMlwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTYgNSAxMiA5IDggNVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVRhYmxldCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjRcIixcInlcIjpcIjJcIixcIndpZHRoXCI6XCIxNlwiLFwiaGVpZ2h0XCI6XCIyMFwiLFwicnhcIjpcIjJcIixcInJ5XCI6XCIyXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxOFwiLFwieDJcIjpcIjEyLjAxXCIsXCJ5MlwiOlwiMThcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUYWcgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjAuNTkgMTMuNDFsLTcuMTcgNy4xN2EyIDIgMCAwIDEtMi44MyAwTDIgMTJWMmgxMGw4LjU5IDguNTlhMiAyIDAgMCAxIDAgMi44MnpcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI3XCIsXCJ5MVwiOlwiN1wiLFwieDJcIjpcIjcuMDFcIixcInkyXCI6XCI3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVGFyZ2V0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTJcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiMTBcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjZcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUZXJtaW5hbCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjQgMTcgMTAgMTEgNCA1XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTJcIixcInkxXCI6XCIxOVwiLFwieDJcIjpcIjIwXCIsXCJ5MlwiOlwiMTlcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUaGVybW9tZXRlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNCAxNC43NlYzLjVhMi41IDIuNSAwIDAgMC01IDB2MTEuMjZhNC41IDQuNSAwIDEgMCA1IDB6XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVGh1bWJzRG93biAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMCAxNXY0YTMgMyAwIDAgMCAzIDNsNC05VjJINS43MmEyIDIgMCAwIDAtMiAxLjdsLTEuMzggOWEyIDIgMCAwIDAgMiAyLjN6bTctMTNoMi42N0EyLjMxIDIuMzEgMCAwIDEgMjIgNHY3YTIuMzEgMi4zMSAwIDAgMS0yLjMzIDJIMTdcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUaHVtYnNVcCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNCA5VjVhMyAzIDAgMCAwLTMtM2wtNCA5djExaDExLjI4YTIgMiAwIDAgMCAyLTEuN2wxLjM4LTlhMiAyIDAgMCAwLTItMi4zek03IDIySDRhMiAyIDAgMCAxLTItMnYtN2EyIDIgMCAwIDEgMi0yaDNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUb2dnbGVMZWZ0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMVwiLFwieVwiOlwiNVwiLFwid2lkdGhcIjpcIjIyXCIsXCJoZWlnaHRcIjpcIjE0XCIsXCJyeFwiOlwiN1wiLFwicnlcIjpcIjdcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjhcIixcImN5XCI6XCIxMlwiLFwiclwiOlwiM1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVRvZ2dsZVJpZ2h0IChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiMVwiLFwieVwiOlwiNVwiLFwid2lkdGhcIjpcIjIyXCIsXCJoZWlnaHRcIjpcIjE0XCIsXCJyeFwiOlwiN1wiLFwicnlcIjpcIjdcIn19LHtcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjE2XCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUb29sIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE0LjcgNi4zYTEgMSAwIDAgMCAwIDEuNGwxLjYgMS42YTEgMSAwIDAgMCAxLjQgMGwzLjc3LTMuNzdhNiA2IDAgMCAxLTcuOTQgNy45NGwtNi45MSA2LjkxYTIuMTIgMi4xMiAwIDAgMS0zLTNsNi45MS02LjkxYTYgNiAwIDAgMSA3Ljk0LTcuOTRsLTMuNzYgMy43NnpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUcmFzaDIgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIzIDYgNSA2IDIxIDZcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xOSA2djE0YTIgMiAwIDAgMS0yIDJIN2EyIDIgMCAwIDEtMi0yVjZtMyAwVjRhMiAyIDAgMCAxIDItMmg0YTIgMiAwIDAgMSAyIDJ2MlwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEwXCIsXCJ5MVwiOlwiMTFcIixcIngyXCI6XCIxMFwiLFwieTJcIjpcIjE3XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTRcIixcInkxXCI6XCIxMVwiLFwieDJcIjpcIjE0XCIsXCJ5MlwiOlwiMTdcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUcmFzaCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjMgNiA1IDYgMjEgNlwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNm0zIDBWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVHJlbGxvIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjdcIixcInlcIjpcIjdcIixcIndpZHRoXCI6XCIzXCIsXCJoZWlnaHRcIjpcIjlcIn19LHtcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjE0XCIsXCJ5XCI6XCI3XCIsXCJ3aWR0aFwiOlwiM1wiLFwiaGVpZ2h0XCI6XCI1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVHJlbmRpbmdEb3duIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjMgMTggMTMuNSA4LjUgOC41IDEzLjUgMSA2XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNyAxOCAyMyAxOCAyMyAxMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVRyZW5kaW5nVXAgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIyMyA2IDEzLjUgMTUuNSA4LjUgMTAuNSAxIDE4XCJ9fSx7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNyA2IDIzIDYgMjMgMTJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUcmlhbmdsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xMC4yOSAzLjg2TDEuODIgMThhMiAyIDAgMCAwIDEuNzEgM2gxNi45NGEyIDIgMCAwIDAgMS43MS0zTDEzLjcxIDMuODZhMiAyIDAgMCAwLTMuNDIgMHpcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlUcnVjayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjFcIixcInlcIjpcIjNcIixcIndpZHRoXCI6XCIxNVwiLFwiaGVpZ2h0XCI6XCIxM1wifX0se1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxNiA4IDIwIDggMjMgMTEgMjMgMTYgMTYgMTYgMTYgOFwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiNS41XCIsXCJjeVwiOlwiMTguNVwiLFwiclwiOlwiMi41XCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxOC41XCIsXCJjeVwiOlwiMTguNVwiLFwiclwiOlwiMi41XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVHYgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIyXCIsXCJ5XCI6XCI3XCIsXCJ3aWR0aFwiOlwiMjBcIixcImhlaWdodFwiOlwiMTVcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTcgMiAxMiA3IDcgMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVR3aXRjaCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMSAySDN2MTZoNXY0bDQtNGg1bDQtNFYyem0tMTAgOVY3bTUgNFY3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVHdpdHRlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMyAzYTEwLjkgMTAuOSAwIDAgMS0zLjE0IDEuNTMgNC40OCA0LjQ4IDAgMCAwLTcuODYgM3YxQTEwLjY2IDEwLjY2IDAgMCAxIDMgNHMtNCA5IDUgMTNhMTEuNjQgMTEuNjQgMCAwIDEtNyAyYzkgNSAyMCAwIDIwLTExLjVhNC41IDQuNSAwIDAgMC0uMDgtLjgzQTcuNzIgNy43MiAwIDAgMCAyMyAzelwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVR5cGUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI0IDcgNCA0IDIwIDQgMjAgN1wifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjlcIixcInkxXCI6XCIyMFwiLFwieDJcIjpcIjE1XCIsXCJ5MlwiOlwiMjBcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjRcIixcIngyXCI6XCIxMlwiLFwieTJcIjpcIjIwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVW1icmVsbGEgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjMgMTJhMTEuMDUgMTEuMDUgMCAwIDAtMjIgMHptLTUgN2EzIDMgMCAwIDEtNiAwdi03XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVW5kZXJsaW5lIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTYgM3Y3YTYgNiAwIDAgMCA2IDYgNiA2IDAgMCAwIDYtNlYzXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiNFwiLFwieTFcIjpcIjIxXCIsXCJ4MlwiOlwiMjBcIixcInkyXCI6XCIyMVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVVubG9jayAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicmVjdFwiLFwiYXR0clwiOntcInhcIjpcIjNcIixcInlcIjpcIjExXCIsXCJ3aWR0aFwiOlwiMThcIixcImhlaWdodFwiOlwiMTFcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTcgMTFWN2E1IDUgMCAwIDEgOS45LTFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlVcGxvYWRDbG91ZCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE2IDE2IDEyIDEyIDggMTZcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxMlwiLFwieTFcIjpcIjEyXCIsXCJ4MlwiOlwiMTJcIixcInkyXCI6XCIyMVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIwLjM5IDE4LjM5QTUgNSAwIDAgMCAxOCA5aC0xLjI2QTggOCAwIDEgMCAzIDE2LjNcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjE2IDE2IDEyIDEyIDggMTZcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlVcGxvYWQgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTcgOCAxMiAzIDcgOFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiM1wiLFwieDJcIjpcIjEyXCIsXCJ5MlwiOlwiMTVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlVc2VyQ2hlY2sgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MlwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiOC41XCIsXCJjeVwiOlwiN1wiLFwiclwiOlwiNFwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTcgMTEgMTkgMTMgMjMgOVwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVVzZXJNaW51cyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI4LjVcIixcImN5XCI6XCI3XCIsXCJyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjNcIixcInkxXCI6XCIxMVwiLFwieDJcIjpcIjE3XCIsXCJ5MlwiOlwiMTFcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlVc2VyUGx1cyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI4LjVcIixcImN5XCI6XCI3XCIsXCJyXCI6XCI0XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMjBcIixcInkxXCI6XCI4XCIsXCJ4MlwiOlwiMjBcIixcInkyXCI6XCIxNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIzXCIsXCJ5MVwiOlwiMTFcIixcIngyXCI6XCIxN1wiLFwieTJcIjpcIjExXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVXNlclggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MlwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiOC41XCIsXCJjeVwiOlwiN1wiLFwiclwiOlwiNFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4XCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMTNcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyM1wiLFwieTFcIjpcIjhcIixcIngyXCI6XCIxOFwiLFwieTJcIjpcIjEzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVXNlciAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCIxMlwiLFwiY3lcIjpcIjdcIixcInJcIjpcIjRcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlVc2VycyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNyAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXCJ9fSx7XCJ0YWdcIjpcImNpcmNsZVwiLFwiYXR0clwiOntcImN4XCI6XCI5XCIsXCJjeVwiOlwiN1wiLFwiclwiOlwiNFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODdcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNiAzLjEzYTQgNCAwIDAgMSAwIDcuNzVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlWaWRlb09mZiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xNiAxNnYxYTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yVjdhMiAyIDAgMCAxIDItMmgybTUuNjYgMEgxNGEyIDIgMCAwIDEgMiAydjMuMzRsMSAxTDIzIDd2MTBcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxXCIsXCJ5MVwiOlwiMVwiLFwieDJcIjpcIjIzXCIsXCJ5MlwiOlwiMjNcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlWaWRlbyAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMjMgNyAxNiAxMiAyMyAxNyAyMyA3XCJ9fSx7XCJ0YWdcIjpcInJlY3RcIixcImF0dHJcIjp7XCJ4XCI6XCIxXCIsXCJ5XCI6XCI1XCIsXCJ3aWR0aFwiOlwiMTVcIixcImhlaWdodFwiOlwiMTRcIixcInJ4XCI6XCIyXCIsXCJyeVwiOlwiMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVZvaWNlbWFpbCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjUuNVwiLFwiY3lcIjpcIjExLjVcIixcInJcIjpcIjQuNVwifX0se1widGFnXCI6XCJjaXJjbGVcIixcImF0dHJcIjp7XCJjeFwiOlwiMTguNVwiLFwiY3lcIjpcIjExLjVcIixcInJcIjpcIjQuNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjUuNVwiLFwieTFcIjpcIjE2XCIsXCJ4MlwiOlwiMTguNVwiLFwieTJcIjpcIjE2XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVm9sdW1lMSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTEgNSA2IDkgMiA5IDIgMTUgNiAxNSAxMSAxOSAxMSA1XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTUuNTQgOC40NmE1IDUgMCAwIDEgMCA3LjA3XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVm9sdW1lMiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicG9seWdvblwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTEgNSA2IDkgMiA5IDIgMTUgNiAxNSAxMSAxOSAxMSA1XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTkuMDcgNC45M2ExMCAxMCAwIDAgMSAwIDE0LjE0TTE1LjU0IDguNDZhNSA1IDAgMCAxIDAgNy4wN1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVZvbHVtZVggKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjExIDUgNiA5IDIgOSAyIDE1IDYgMTUgMTEgMTkgMTEgNVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjIzXCIsXCJ5MVwiOlwiOVwiLFwieDJcIjpcIjE3XCIsXCJ5MlwiOlwiMTVcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxN1wiLFwieTFcIjpcIjlcIixcIngyXCI6XCIyM1wiLFwieTJcIjpcIjE1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpVm9sdW1lIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMSA1IDYgOSAyIDkgMiAxNSA2IDE1IDExIDE5IDExIDVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlXYXRjaCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjdcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjEyIDkgMTIgMTIgMTMuNSAxMy41XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTYuNTEgMTcuMzVsLS4zNSAzLjgzYTIgMiAwIDAgMS0yIDEuODJIOS44M2EyIDIgMCAwIDEtMi0xLjgybC0uMzUtMy44M20uMDEtMTAuN2wuMzUtMy44M0EyIDIgMCAwIDEgOS44MyAxaDQuMzVhMiAyIDAgMCAxIDIgMS44MmwuMzUgMy44M1wifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVdpZmlPZmYgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMVwiLFwieTFcIjpcIjFcIixcIngyXCI6XCIyM1wiLFwieTJcIjpcIjIzXCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMTYuNzIgMTEuMDZBMTAuOTQgMTAuOTQgMCAwIDEgMTkgMTIuNTVcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk01IDEyLjU1YTEwLjk0IDEwLjk0IDAgMCAxIDUuMTctMi4zOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEwLjcxIDUuMDVBMTYgMTYgMCAwIDEgMjIuNTggOVwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTEuNDIgOWExNS45MSAxNS45MSAwIDAgMSA0LjctMi44OFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTguNTMgMTYuMTFhNiA2IDAgMCAxIDYuOTUgMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCIxMi4wMVwiLFwieTJcIjpcIjIwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpV2lmaSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk01IDEyLjU1YTExIDExIDAgMCAxIDE0LjA4IDBcIn19LHtcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk0xLjQyIDlhMTYgMTYgMCAwIDEgMjEuMTYgMFwifX0se1widGFnXCI6XCJwYXRoXCIsXCJhdHRyXCI6e1wiZFwiOlwiTTguNTMgMTYuMTFhNiA2IDAgMCAxIDYuOTUgMFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjEyXCIsXCJ5MVwiOlwiMjBcIixcIngyXCI6XCIxMi4wMVwiLFwieTJcIjpcIjIwXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpV2luZCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwicGF0aFwiLFwiYXR0clwiOntcImRcIjpcIk05LjU5IDQuNTlBMiAyIDAgMSAxIDExIDhIMm0xMC41OSAxMS40MUEyIDIgMCAxIDAgMTQgMTZIMm0xNS43My04LjI3QTIuNSAyLjUgMCAxIDEgMTkuNSAxMkgyXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpWENpcmNsZSAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjEyXCIsXCJjeVwiOlwiMTJcIixcInJcIjpcIjEwXCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMTVcIixcInkxXCI6XCI5XCIsXCJ4MlwiOlwiOVwiLFwieTJcIjpcIjE1XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiOVwiLFwieTFcIjpcIjlcIixcIngyXCI6XCIxNVwiLFwieTJcIjpcIjE1XCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpWE9jdGFnb24gKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlnb25cIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjcuODYgMiAxNi4xNCAyIDIyIDcuODYgMjIgMTYuMTQgMTYuMTQgMjIgNy44NiAyMiAyIDE2LjE0IDIgNy44NiA3Ljg2IDJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNVwiLFwieTFcIjpcIjlcIixcIngyXCI6XCI5XCIsXCJ5MlwiOlwiMTVcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5XCIsXCJ5MVwiOlwiOVwiLFwieDJcIjpcIjE1XCIsXCJ5MlwiOlwiMTVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlYU3F1YXJlIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJyZWN0XCIsXCJhdHRyXCI6e1wieFwiOlwiM1wiLFwieVwiOlwiM1wiLFwid2lkdGhcIjpcIjE4XCIsXCJoZWlnaHRcIjpcIjE4XCIsXCJyeFwiOlwiMlwiLFwicnlcIjpcIjJcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI5XCIsXCJ5MVwiOlwiOVwiLFwieDJcIjpcIjE1XCIsXCJ5MlwiOlwiMTVcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIxNVwiLFwieTFcIjpcIjlcIixcIngyXCI6XCI5XCIsXCJ5MlwiOlwiMTVcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlYIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjE4XCIsXCJ5MVwiOlwiNlwiLFwieDJcIjpcIjZcIixcInkyXCI6XCIxOFwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjZcIixcInkxXCI6XCI2XCIsXCJ4MlwiOlwiMThcIixcInkyXCI6XCIxOFwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVlvdXR1YmUgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJNMjIuNTQgNi40MmEyLjc4IDIuNzggMCAwIDAtMS45NC0yQzE4Ljg4IDQgMTIgNCAxMiA0cy02Ljg4IDAtOC42LjQ2YTIuNzggMi43OCAwIDAgMC0xLjk0IDJBMjkgMjkgMCAwIDAgMSAxMS43NWEyOSAyOSAwIDAgMCAuNDYgNS4zM0EyLjc4IDIuNzggMCAwIDAgMy40IDE5YzEuNzIuNDYgOC42LjQ2IDguNi40NnM2Ljg4IDAgOC42LS40NmEyLjc4IDIuNzggMCAwIDAgMS45NC0yIDI5IDI5IDAgMCAwIC40Ni01LjI1IDI5IDI5IDAgMCAwLS40Ni01LjMzelwifX0se1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCI5Ljc1IDE1LjAyIDE1LjUgMTEuNzUgOS43NSA4LjQ4IDkuNzUgMTUuMDJcIn19XX0pKHByb3BzKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlaYXBPZmYgKHByb3BzKSB7XG4gIHJldHVybiBHZW5JY29uKHtcInRhZ1wiOlwic3ZnXCIsXCJhdHRyXCI6e1widmlld0JveFwiOlwiMCAwIDI0IDI0XCIsXCJmaWxsXCI6XCJub25lXCIsXCJzdHJva2VcIjpcImN1cnJlbnRDb2xvclwiLFwic3Ryb2tlV2lkdGhcIjpcIjJcIixcInN0cm9rZUxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2VMaW5lam9pblwiOlwicm91bmRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBvbHlsaW5lXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMi40MSA2Ljc1IDEzIDIgMTAuNTcgNC45MlwifX0se1widGFnXCI6XCJwb2x5bGluZVwiLFwiYXR0clwiOntcInBvaW50c1wiOlwiMTguNTcgMTIuOTEgMjEgMTAgMTUuNjYgMTBcIn19LHtcInRhZ1wiOlwicG9seWxpbmVcIixcImF0dHJcIjp7XCJwb2ludHNcIjpcIjggOCAzIDE0IDEyIDE0IDExIDIyIDE2IDE2XCJ9fSx7XCJ0YWdcIjpcImxpbmVcIixcImF0dHJcIjp7XCJ4MVwiOlwiMVwiLFwieTFcIjpcIjFcIixcIngyXCI6XCIyM1wiLFwieTJcIjpcIjIzXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpWmFwIChwcm9wcykge1xuICByZXR1cm4gR2VuSWNvbih7XCJ0YWdcIjpcInN2Z1wiLFwiYXR0clwiOntcInZpZXdCb3hcIjpcIjAgMCAyNCAyNFwiLFwiZmlsbFwiOlwibm9uZVwiLFwic3Ryb2tlXCI6XCJjdXJyZW50Q29sb3JcIixcInN0cm9rZVdpZHRoXCI6XCIyXCIsXCJzdHJva2VMaW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlTGluZWpvaW5cIjpcInJvdW5kXCJ9LFwiY2hpbGRcIjpbe1widGFnXCI6XCJwb2x5Z29uXCIsXCJhdHRyXCI6e1wicG9pbnRzXCI6XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwifX1dfSkocHJvcHMpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaVpvb21JbiAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjExXCIsXCJjeVwiOlwiMTFcIixcInJcIjpcIjhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMVwiLFwieTFcIjpcIjIxXCIsXCJ4MlwiOlwiMTYuNjVcIixcInkyXCI6XCIxNi42NVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjExXCIsXCJ5MVwiOlwiOFwiLFwieDJcIjpcIjExXCIsXCJ5MlwiOlwiMTRcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCI4XCIsXCJ5MVwiOlwiMTFcIixcIngyXCI6XCIxNFwiLFwieTJcIjpcIjExXCJ9fV19KShwcm9wcyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpWm9vbU91dCAocHJvcHMpIHtcbiAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2VXaWR0aFwiOlwiMlwiLFwic3Ryb2tlTGluZWNhcFwiOlwicm91bmRcIixcInN0cm9rZUxpbmVqb2luXCI6XCJyb3VuZFwifSxcImNoaWxkXCI6W3tcInRhZ1wiOlwiY2lyY2xlXCIsXCJhdHRyXCI6e1wiY3hcIjpcIjExXCIsXCJjeVwiOlwiMTFcIixcInJcIjpcIjhcIn19LHtcInRhZ1wiOlwibGluZVwiLFwiYXR0clwiOntcIngxXCI6XCIyMVwiLFwieTFcIjpcIjIxXCIsXCJ4MlwiOlwiMTYuNjVcIixcInkyXCI6XCIxNi42NVwifX0se1widGFnXCI6XCJsaW5lXCIsXCJhdHRyXCI6e1wieDFcIjpcIjhcIixcInkxXCI6XCIxMVwiLFwieDJcIjpcIjE0XCIsXCJ5MlwiOlwiMTFcIn19XX0pKHByb3BzKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkljb25CYXNlID0gZXhwb3J0cy5HZW5JY29uID0gdm9pZCAwO1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIGljb25Db250ZXh0XzEgPSByZXF1aXJlKFwiLi9pY29uQ29udGV4dFwiKTtcbmZ1bmN0aW9uIFRyZWUyRWxlbWVudCh0cmVlKSB7XG4gICAgcmV0dXJuIHRyZWUgJiYgdHJlZS5tYXAoZnVuY3Rpb24gKG5vZGUsIGkpIHsgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZS50YWcsIF9fYXNzaWduKHsga2V5OiBpIH0sIG5vZGUuYXR0ciksIFRyZWUyRWxlbWVudChub2RlLmNoaWxkKSk7IH0pO1xufVxuZnVuY3Rpb24gR2VuSWNvbihkYXRhKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbkJhc2UsIF9fYXNzaWduKHsgYXR0cjogX19hc3NpZ24oe30sIGRhdGEuYXR0cikgfSwgcHJvcHMpLCBUcmVlMkVsZW1lbnQoZGF0YS5jaGlsZCkpKTsgfTtcbn1cbmV4cG9ydHMuR2VuSWNvbiA9IEdlbkljb247XG5mdW5jdGlvbiBJY29uQmFzZShwcm9wcykge1xuICAgIHZhciBlbGVtID0gZnVuY3Rpb24gKGNvbmYpIHtcbiAgICAgICAgdmFyIGF0dHIgPSBwcm9wcy5hdHRyLCBzaXplID0gcHJvcHMuc2l6ZSwgdGl0bGUgPSBwcm9wcy50aXRsZSwgc3ZnUHJvcHMgPSBfX3Jlc3QocHJvcHMsIFtcImF0dHJcIiwgXCJzaXplXCIsIFwidGl0bGVcIl0pO1xuICAgICAgICB2YXIgY29tcHV0ZWRTaXplID0gc2l6ZSB8fCBjb25mLnNpemUgfHwgXCIxZW1cIjtcbiAgICAgICAgdmFyIGNsYXNzTmFtZTtcbiAgICAgICAgaWYgKGNvbmYuY2xhc3NOYW1lKVxuICAgICAgICAgICAgY2xhc3NOYW1lID0gY29uZi5jbGFzc05hbWU7XG4gICAgICAgIGlmIChwcm9wcy5jbGFzc05hbWUpXG4gICAgICAgICAgICBjbGFzc05hbWUgPSAoY2xhc3NOYW1lID8gY2xhc3NOYW1lICsgJyAnIDogJycpICsgcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgX19hc3NpZ24oeyBzdHJva2U6IFwiY3VycmVudENvbG9yXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIHN0cm9rZVdpZHRoOiBcIjBcIiB9LCBjb25mLmF0dHIsIGF0dHIsIHN2Z1Byb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBzdHlsZTogX19hc3NpZ24oX19hc3NpZ24oeyBjb2xvcjogcHJvcHMuY29sb3IgfHwgY29uZi5jb2xvciB9LCBjb25mLnN0eWxlKSwgcHJvcHMuc3R5bGUpLCBoZWlnaHQ6IGNvbXB1dGVkU2l6ZSwgd2lkdGg6IGNvbXB1dGVkU2l6ZSwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9KSxcbiAgICAgICAgICAgIHRpdGxlICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCBudWxsLCB0aXRsZSksXG4gICAgICAgICAgICBwcm9wcy5jaGlsZHJlbikpO1xuICAgIH07XG4gICAgcmV0dXJuIGljb25Db250ZXh0XzEuSWNvbkNvbnRleHQgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoaWNvbkNvbnRleHRfMS5JY29uQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKGNvbmYpIHsgcmV0dXJuIGVsZW0oY29uZik7IH0pXG4gICAgICAgIDogZWxlbShpY29uQ29udGV4dF8xLkRlZmF1bHRDb250ZXh0KTtcbn1cbmV4cG9ydHMuSWNvbkJhc2UgPSBJY29uQmFzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JY29uQ29udGV4dCA9IGV4cG9ydHMuRGVmYXVsdENvbnRleHQgPSB2b2lkIDA7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5leHBvcnRzLkRlZmF1bHRDb250ZXh0ID0ge1xuICAgIGNvbG9yOiB1bmRlZmluZWQsXG4gICAgc2l6ZTogdW5kZWZpbmVkLFxuICAgIGNsYXNzTmFtZTogdW5kZWZpbmVkLFxuICAgIHN0eWxlOiB1bmRlZmluZWQsXG4gICAgYXR0cjogdW5kZWZpbmVkLFxufTtcbmV4cG9ydHMuSWNvbkNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0ICYmIFJlYWN0LmNyZWF0ZUNvbnRleHQoZXhwb3J0cy5EZWZhdWx0Q29udGV4dCk7XG4iLCJtb2R1bGUuZXhwb3J0cy5JY29uc01hbmlmZXN0ID0gW1xuICB7XG4gICAgXCJpZFwiOiBcImZhXCIsXG4gICAgXCJuYW1lXCI6IFwiRm9udCBBd2Vzb21lXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9mb250YXdlc29tZS5jb20vXCIsXG4gICAgXCJsaWNlbnNlXCI6IFwiQ0MgQlkgNC4wIExpY2Vuc2VcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvNC4wL1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaW9cIixcbiAgICBcIm5hbWVcIjogXCJJb25pY29ucyA0XCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9pb25pY29ucy5jb20vXCIsXG4gICAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gICAgXCJsaWNlbnNlVXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2lvbmljLXRlYW0vaW9uaWNvbnMvYmxvYi9tYXN0ZXIvTElDRU5TRVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaW81XCIsXG4gICAgXCJuYW1lXCI6IFwiSW9uaWNvbnMgNVwiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vaW9uaWNvbnMuY29tL1wiLFxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICAgIFwibGljZW5zZVVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljb25zL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1kXCIsXG4gICAgXCJuYW1lXCI6IFwiTWF0ZXJpYWwgRGVzaWduIGljb25zXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cDovL2dvb2dsZS5naXRodWIuaW8vbWF0ZXJpYWwtZGVzaWduLWljb25zL1wiLFxuICAgIFwibGljZW5zZVwiOiBcIkFwYWNoZSBMaWNlbnNlIFZlcnNpb24gMi4wXCIsXG4gICAgXCJsaWNlbnNlVXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9tYXRlcmlhbC1kZXNpZ24taWNvbnMvYmxvYi9tYXN0ZXIvTElDRU5TRVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGlcIixcbiAgICBcIm5hbWVcIjogXCJUeXBpY29uc1wiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHA6Ly9zLWluZ3MuY29tL3R5cGljb25zL1wiLFxuICAgIFwibGljZW5zZVwiOiBcIkNDIEJZLVNBIDMuMFwiLFxuICAgIFwibGljZW5zZVVybFwiOiBcImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAvXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnb1wiLFxuICAgIFwibmFtZVwiOiBcIkdpdGh1YiBPY3RpY29ucyBpY29uc1wiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vb2N0aWNvbnMuZ2l0aHViLmNvbS9cIixcbiAgICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vcHJpbWVyL29jdGljb25zL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZpXCIsXG4gICAgXCJuYW1lXCI6IFwiRmVhdGhlclwiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vZmVhdGhlcmljb25zLmNvbS9cIixcbiAgICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZmVhdGhlcmljb25zL2ZlYXRoZXIvYmxvYi9tYXN0ZXIvTElDRU5TRVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ2lcIixcbiAgICBcIm5hbWVcIjogXCJHYW1lIEljb25zXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9nYW1lLWljb25zLm5ldC9cIixcbiAgICBcImxpY2Vuc2VcIjogXCJDQyBCWSAzLjBcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwid2lcIixcbiAgICBcIm5hbWVcIjogXCJXZWF0aGVyIEljb25zXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9lcmlrZmxvd2Vycy5naXRodWIuaW8vd2VhdGhlci1pY29ucy9cIixcbiAgICBcImxpY2Vuc2VcIjogXCJTSUwgT0ZMIDEuMVwiLFxuICAgIFwibGljZW5zZVVybFwiOiBcImh0dHA6Ly9zY3JpcHRzLnNpbC5vcmcvT0ZMXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkaVwiLFxuICAgIFwibmFtZVwiOiBcIkRldmljb25zXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly92b3JpbGxhei5naXRodWIuaW8vZGV2aWNvbnMvXCIsXG4gICAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gICAgXCJsaWNlbnNlVXJsXCI6IFwiaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFpXCIsXG4gICAgXCJuYW1lXCI6IFwiQW50IERlc2lnbiBJY29uc1wiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hbnQtZGVzaWduL2FudC1kZXNpZ24taWNvbnNcIixcbiAgICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYnNcIixcbiAgICBcIm5hbWVcIjogXCJCb290c3RyYXAgSWNvbnNcIixcbiAgICBcInByb2plY3RVcmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdHdicy9pY29uc1wiLFxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICAgIFwibGljZW5zZVVybFwiOiBcImh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyaVwiLFxuICAgIFwibmFtZVwiOiBcIlJlbWl4IEljb25cIixcbiAgICBcInByb2plY3RVcmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vUmVtaXgtRGVzaWduL1JlbWl4SWNvblwiLFxuICAgIFwibGljZW5zZVwiOiBcIkFwYWNoZSBMaWNlbnNlIFZlcnNpb24gMi4wXCIsXG4gICAgXCJsaWNlbnNlVXJsXCI6IFwiaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZmNcIixcbiAgICBcIm5hbWVcIjogXCJGbGF0IENvbG9yIEljb25zXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2ljb25zOC9mbGF0LWNvbG9yLWljb25zXCIsXG4gICAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gICAgXCJsaWNlbnNlVXJsXCI6IFwiaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdyXCIsXG4gICAgXCJuYW1lXCI6IFwiR3JvbW1ldC1JY29uc1wiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9ncm9tbWV0L2dyb21tZXQtaWNvbnNcIixcbiAgICBcImxpY2Vuc2VcIjogXCJBcGFjaGUgTGljZW5zZSBWZXJzaW9uIDIuMFwiLFxuICAgIFwibGljZW5zZVVybFwiOiBcImh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImhpXCIsXG4gICAgXCJuYW1lXCI6IFwiSGVyb2ljb25zXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RhaWx3aW5kbGFicy9oZXJvaWNvbnNcIixcbiAgICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2lcIixcbiAgICBcIm5hbWVcIjogXCJTaW1wbGUgSWNvbnNcIixcbiAgICBcInByb2plY3RVcmxcIjogXCJodHRwczovL3NpbXBsZWljb25zLm9yZy9cIixcbiAgICBcImxpY2Vuc2VcIjogXCJDQzAgMS4wIFVuaXZlcnNhbFwiLFxuICAgIFwibGljZW5zZVVybFwiOiBcImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJpbVwiLFxuICAgIFwibmFtZVwiOiBcIkljb01vb24gRnJlZVwiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9LZXlhbW9vbi9JY29Nb29uLUZyZWVcIixcbiAgICBcImxpY2Vuc2VcIjogXCJDQyBCWSA0LjAgTGljZW5zZVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYmlcIixcbiAgICBcIm5hbWVcIjogXCJCb3hJY29uc1wiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hdGlzYXdkL2JveGljb25zXCIsXG4gICAgXCJsaWNlbnNlXCI6IFwiQ0MgQlkgNC4wIExpY2Vuc2VcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNnXCIsXG4gICAgXCJuYW1lXCI6IFwiY3NzLmdnXCIsXG4gICAgXCJwcm9qZWN0VXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FzdHJpdC9jc3MuZ2dcIixcbiAgICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgICBcImxpY2Vuc2VVcmxcIjogXCJodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidnNjXCIsXG4gICAgXCJuYW1lXCI6IFwiVlMgQ29kZSBJY29uc1wiLFxuICAgIFwicHJvamVjdFVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvdnNjb2RlLWNvZGljb25zXCIsXG4gICAgXCJsaWNlbnNlXCI6IFwiQ0MgQlkgNC4wXCIsXG4gICAgXCJsaWNlbnNlVXJsXCI6IFwiaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzQuMC9cIlxuICB9XG5dIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaWNvbnNNYW5pZmVzdFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaWNvbkJhc2VcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2ljb25Db250ZXh0XCIpLCBleHBvcnRzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL2ltYWdlLWNvbmZpZy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL21pdHQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyLWNvbnRleHQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcXVlcnlzdHJpbmcuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLXJlZ2V4LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3RvLWJhc2UtNjQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdXRpbHMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiLCIvKiAoaWdub3JlZCkgKi8iXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiSW1hZ2UxIiwiX3JlYWN0IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfaGVhZCIsIl90b0Jhc2U2NCIsIl9pbWFnZUNvbmZpZyIsIl91c2VJbnRlcnNlY3Rpb24iLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfX2VzTW9kdWxlIiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImNvbmNhdCIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImZvckVhY2giLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJleGNsdWRlZCIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwic291cmNlU3ltYm9sS2V5cyIsImluZGV4T2YiLCJwcm90b3R5cGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImNhbGwiLCJzb3VyY2VLZXlzIiwibG9hZGVkSW1hZ2VVUkxzIiwiU2V0IiwiZ2xvYmFsIiwiX19ORVhUX0lNQUdFX0lNUE9SVEVEIiwiVkFMSURfTE9BRElOR19WQUxVRVMiLCJ1bmRlZmluZWQiLCJsb2FkZXJzIiwiTWFwIiwiZGVmYXVsdExvYWRlciIsImltZ2l4TG9hZGVyIiwiY2xvdWRpbmFyeUxvYWRlciIsImFrYW1haUxvYWRlciIsImN1c3RvbUxvYWRlciIsIlZBTElEX0xBWU9VVF9WQUxVRVMiLCJpc1N0YXRpY1JlcXVpcmUiLCJzcmMiLCJpc1N0YXRpY0ltYWdlRGF0YSIsImlzU3RhdGljSW1wb3J0IiwiZGV2aWNlU2l6ZXMiLCJjb25maWdEZXZpY2VTaXplcyIsImltYWdlU2l6ZXMiLCJjb25maWdJbWFnZVNpemVzIiwibG9hZGVyIiwiY29uZmlnTG9hZGVyIiwicGF0aCIsImNvbmZpZ1BhdGgiLCJkb21haW5zIiwiY29uZmlnRG9tYWlucyIsInByb2Nlc3MiLCJlbnYiLCJfX05FWFRfSU1BR0VfT1BUUyIsImltYWdlQ29uZmlnRGVmYXVsdCIsImFsbFNpemVzIiwic29ydCIsImEiLCJiIiwiZ2V0V2lkdGhzIiwid2lkdGgiLCJsYXlvdXQiLCJzaXplcyIsInZpZXdwb3J0V2lkdGhSZSIsInBlcmNlbnRTaXplcyIsIm1hdGNoIiwiZXhlYyIsInB1c2giLCJwYXJzZUludCIsInNtYWxsZXN0UmF0aW8iLCJNYXRoIiwibWluIiwid2lkdGhzIiwicyIsImtpbmQiLCJtYXAiLCJ3IiwiZmluZCIsInAiLCJnZW5lcmF0ZUltZ0F0dHJzIiwidW5vcHRpbWl6ZWQiLCJxdWFsaXR5Iiwic3JjU2V0IiwibGFzdCIsImpvaW4iLCJnZXRJbnQiLCJ4IiwiZGVmYXVsdEltYWdlTG9hZGVyIiwibG9hZGVyUHJvcHMiLCJsb2FkIiwiZ2V0Iiwicm9vdCIsIkVycm9yIiwiVkFMSURfTE9BREVSUyIsImhhbmRsZUxvYWRpbmciLCJpbWciLCJwbGFjZWhvbGRlciIsIm9uTG9hZGluZ0NvbXBsZXRlIiwiaGFuZGxlTG9hZCIsInN0YXJ0c1dpdGgiLCJkZWNvZGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNhdGNoIiwidGhlbiIsInN0eWxlIiwiYmFja2dyb3VuZFNpemUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJhZGQiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwicmVmIiwicGFyZW50RWxlbWVudCIsInBhcmVudCIsImdldENvbXB1dGVkU3R5bGUiLCJkaXNwbGF5IiwiY29uc29sZSIsIndhcm4iLCJwb3NpdGlvbiIsImNvbXBsZXRlIiwib25sb2FkIiwiX3BhcmFtIiwicHJpb3JpdHkiLCJsb2FkaW5nIiwibGF6eUJvdW5kYXJ5IiwiY2xhc3NOYW1lIiwiaGVpZ2h0Iiwib2JqZWN0Rml0Iiwib2JqZWN0UG9zaXRpb24iLCJibHVyRGF0YVVSTCIsImFsbCIsInJlc3QiLCJzdGF0aWNTcmMiLCJzdGF0aWNJbWFnZURhdGEiLCJKU09OIiwic3RyaW5naWZ5Iiwid2lkdGhJbnQiLCJoZWlnaHRJbnQiLCJxdWFsaXR5SW50IiwiaXNMYXp5IiwiaGFzIiwiaW5jbHVkZXMiLCJTdHJpbmciLCJpc05hTiIsIlZBTElEX0JMVVJfRVhUIiwicmFuZCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJzZXRSZWYiLCJpc0ludGVyc2VjdGVkIiwidXNlSW50ZXJzZWN0aW9uIiwicm9vdE1hcmdpbiIsImRpc2FibGVkIiwiaXNWaXNpYmxlIiwid3JhcHBlclN0eWxlIiwic2l6ZXJTdHlsZSIsInNpemVyU3ZnIiwiaW1nU3R5bGUiLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJib3hTaXppbmciLCJwYWRkaW5nIiwiYm9yZGVyIiwibWFyZ2luIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsImJsdXJTdHlsZSIsImJhY2tncm91bmRQb3NpdGlvbiIsIm92ZXJmbG93IiwicXVvdGllbnQiLCJwYWRkaW5nVG9wIiwiaW1nQXR0cmlidXRlcyIsInNyY1N0cmluZyIsImNyZWF0ZUVsZW1lbnQiLCJhbHQiLCJ0b0Jhc2U2NCIsImFzc2lnbiIsImRlY29kaW5nIiwicmVsIiwiYXMiLCJocmVmIiwiaW1hZ2VzcmNzZXQiLCJpbWFnZXNpemVzIiwibm9ybWFsaXplU3JjIiwic2xpY2UiLCJ1cmwiLCJVUkwiLCJwYXJhbXMiLCJzZWFyY2hQYXJhbXMiLCJzZXQiLCJwYXJhbXNTdHJpbmciLCJtaXNzaW5nVmFsdWVzIiwicGFyc2VkU3JjIiwiZXJyIiwiZXJyb3IiLCJob3N0bmFtZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIl9yb3V0ZXIiLCJfcm91dGVyMSIsInByZWZldGNoZWQiLCJwcmVmZXRjaCIsInJvdXRlciIsIm9wdGlvbnMiLCJpc0xvY2FsVVJMIiwiY3VyTG9jYWxlIiwibG9jYWxlIiwiaXNNb2RpZmllZEV2ZW50IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwibWV0YUtleSIsImN0cmxLZXkiLCJzaGlmdEtleSIsImFsdEtleSIsIm5hdGl2ZUV2ZW50Iiwid2hpY2giLCJsaW5rQ2xpY2tlZCIsImUiLCJyZXBsYWNlIiwic2hhbGxvdyIsInNjcm9sbCIsIm5vZGVOYW1lIiwicHJldmVudERlZmF1bHQiLCJMaW5rIiwicHJvcHMiLCJjcmVhdGVQcm9wRXJyb3IiLCJhcmdzIiwiZXhwZWN0ZWQiLCJhY3R1YWwiLCJyZXF1aXJlZFByb3BzR3VhcmQiLCJyZXF1aXJlZFByb3BzIiwiXyIsIm9wdGlvbmFsUHJvcHNHdWFyZCIsInBhc3NIcmVmIiwib3B0aW9uYWxQcm9wcyIsInZhbFR5cGUiLCJoYXNXYXJuZWQiLCJ1c2VSZWYiLCJjdXJyZW50IiwidXNlUm91dGVyIiwidXNlTWVtbyIsInJlc29sdmVkSHJlZiIsInJlc29sdmVkQXMiLCJyZXNvbHZlSHJlZiIsImNoaWxkcmVuIiwiY2hpbGQiLCJDaGlsZHJlbiIsIm9ubHkiLCJjaGlsZFJlZiIsInNldEludGVyc2VjdGlvblJlZiIsInVzZUNhbGxiYWNrIiwiZWwiLCJ1c2VFZmZlY3QiLCJzaG91bGRQcmVmZXRjaCIsImlzUHJlZmV0Y2hlZCIsImNoaWxkUHJvcHMiLCJvbkNsaWNrIiwiZGVmYXVsdFByZXZlbnRlZCIsIm9uTW91c2VFbnRlciIsInR5cGUiLCJsb2NhbGVEb21haW4iLCJpc0xvY2FsZURvbWFpbiIsImdldERvbWFpbkxvY2FsZSIsImxvY2FsZXMiLCJkb21haW5Mb2NhbGVzIiwiYWRkQmFzZVBhdGgiLCJhZGRMb2NhbGUiLCJkZWZhdWx0TG9jYWxlIiwiY2xvbmVFbGVtZW50IiwiX2RlZmF1bHQiLCJyZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCIsIm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoIiwiZW5kc1dpdGgiLCJfX05FWFRfVFJBSUxJTkdfU0xBU0giLCJ0ZXN0IiwicmVxdWVzdElkbGVDYWxsYmFjayIsImNhbmNlbElkbGVDYWxsYmFjayIsInNlbGYiLCJiaW5kIiwid2luZG93IiwiY2IiLCJzdGFydCIsIkRhdGUiLCJub3ciLCJzZXRUaW1lb3V0IiwiZGlkVGltZW91dCIsInRpbWVSZW1haW5pbmciLCJtYXgiLCJpZCIsImNsZWFyVGltZW91dCIsIm1hcmtBc3NldEVycm9yIiwiaXNBc3NldEVycm9yIiwiZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCIsImNyZWF0ZVJvdXRlTG9hZGVyIiwiX2dldEFzc2V0UGF0aEZyb21Sb3V0ZSIsIl9yZXF1ZXN0SWRsZUNhbGxiYWNrIiwiTVNfTUFYX0lETEVfREVMQVkiLCJ3aXRoRnV0dXJlIiwiZ2VuZXJhdG9yIiwiZW50cnkiLCJmdXR1cmUiLCJyZXNvbHZlciIsInByb20iLCJoYXNQcmVmZXRjaCIsImxpbmsiLCJkb2N1bWVudCIsIk1TSW5wdXRNZXRob2RDb250ZXh0IiwiZG9jdW1lbnRNb2RlIiwicmVsTGlzdCIsInN1cHBvcnRzIiwiY2FuUHJlZmV0Y2giLCJwcmVmZXRjaFZpYURvbSIsInJlcyIsInJlaiIsInF1ZXJ5U2VsZWN0b3IiLCJjcm9zc09yaWdpbiIsIl9fTkVYVF9DUk9TU19PUklHSU4iLCJvbmVycm9yIiwiaGVhZCIsImFwcGVuZENoaWxkIiwiQVNTRVRfTE9BRF9FUlJPUiIsIlN5bWJvbCIsImFwcGVuZFNjcmlwdCIsInNjcmlwdCIsInJlamVjdCIsImJvZHkiLCJkZXZCdWlsZFByb21pc2UiLCJyZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0IiwibXMiLCJjYW5jZWxsZWQiLCJyIiwiX19CVUlMRF9NQU5JRkVTVCIsIm9uQnVpbGRNYW5pZmVzdCIsIl9fQlVJTERfTUFOSUZFU1RfQ0IiLCJnZXRGaWxlc0ZvclJvdXRlIiwiYXNzZXRQcmVmaXgiLCJyb3V0ZSIsInNjcmlwdHMiLCJlbmNvZGVVUkkiLCJjc3MiLCJtYW5pZmVzdCIsImFsbEZpbGVzIiwidiIsImVudHJ5cG9pbnRzIiwibG9hZGVkU2NyaXB0cyIsInN0eWxlU2hlZXRzIiwicm91dGVzIiwibWF5YmVFeGVjdXRlU2NyaXB0IiwiZmV0Y2hTdHlsZVNoZWV0IiwiZmV0Y2giLCJvayIsInRleHQiLCJjb250ZW50Iiwid2hlbkVudHJ5cG9pbnQiLCJvbkVudHJ5cG9pbnQiLCJleGVjdXRlIiwiZm4iLCJjb21wb25lbnQiLCJpbnB1dCIsIm9sZCIsImxvYWRSb3V0ZSIsInJvdXRlRmlsZXNQcm9taXNlIiwiZW50cnlwb2ludCIsInN0eWxlcyIsImZpbmFsbHkiLCJjbiIsIm5hdmlnYXRvciIsImNvbm5lY3Rpb24iLCJzYXZlRGF0YSIsImVmZmVjdGl2ZVR5cGUiLCJvdXRwdXQiLCJfd2l0aFJvdXRlciIsImNyZWF0ZVJvdXRlciIsIm1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZSIsIl9yb3V0ZXJDb250ZXh0Iiwic2luZ2xldG9uUm91dGVyIiwicmVhZHlDYWxsYmFja3MiLCJyZWFkeSIsInVybFByb3BlcnR5RmllbGRzIiwicm91dGVyRXZlbnRzIiwiY29yZU1ldGhvZEZpZWxkcyIsImV2ZW50cyIsImZpZWxkIiwiZ2V0Um91dGVyIiwib24iLCJldmVudEZpZWxkIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJfc2luZ2xldG9uUm91dGVyIiwibWVzc2FnZSIsInN0YWNrIiwidXNlQ29udGV4dCIsIlJvdXRlckNvbnRleHQiLCJpbnN0YW5jZSIsInByb3BlcnR5IiwiQXJyYXkiLCJpc0FycmF5IiwiaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImlzRGlzYWJsZWQiLCJ1bm9ic2VydmUiLCJ2aXNpYmxlIiwic2V0VmlzaWJsZSIsInVzZVN0YXRlIiwidGFnTmFtZSIsIm9ic2VydmUiLCJpZGxlQ2FsbGJhY2siLCJlbGVtZW50IiwiY2FsbGJhY2siLCJvYnNlcnZlciIsImVsZW1lbnRzIiwiY3JlYXRlT2JzZXJ2ZXIiLCJkZWxldGUiLCJzaXplIiwiZGlzY29ubmVjdCIsIm9ic2VydmVycyIsImVudHJpZXMiLCJpc0ludGVyc2VjdGluZyIsImludGVyc2VjdGlvblJhdGlvIiwid2l0aFJvdXRlciIsIkNvbXBvc2VkQ29tcG9uZW50IiwiV2l0aFJvdXRlcldyYXBwZXIiLCJnZXRJbml0aWFsUHJvcHMiLCJvcmlnR2V0SW5pdGlhbFByb3BzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwiZGVsTG9jYWxlIiwiaGFzQmFzZVBhdGgiLCJkZWxCYXNlUGF0aCIsImludGVycG9sYXRlQXMiLCJfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCIsIl9yb3V0ZUxvYWRlciIsIl9kZW5vcm1hbGl6ZVBhZ2VQYXRoIiwiX25vcm1hbGl6ZUxvY2FsZVBhdGgiLCJfbWl0dCIsIl91dGlscyIsIl9pc0R5bmFtaWMiLCJfcGFyc2VSZWxhdGl2ZVVybCIsIl9xdWVyeXN0cmluZyIsIl9yZXNvbHZlUmV3cml0ZXMiLCJfcm91dGVNYXRjaGVyIiwiX3JvdXRlUmVnZXgiLCJkZXRlY3REb21haW5Mb2NhbGUiLCJfX05FWFRfSTE4Tl9TVVBQT1JUIiwiYmFzZVBhdGgiLCJfX05FWFRfUk9VVEVSX0JBU0VQQVRIIiwiYnVpbGRDYW5jZWxsYXRpb25FcnJvciIsImFkZFBhdGhQcmVmaXgiLCJwcmVmaXgiLCJwYXRoTm9RdWVyeUhhc2giLCJub3JtYWxpemVMb2NhbGVQYXRoIiwiZGV0ZWN0ZWRMb2NhbGUiLCJkZXRlY3RlZERvbWFpbiIsImh0dHAiLCJkb21haW4iLCJwYXRobmFtZSIsInBhdGhMb3dlciIsInRvTG93ZXJDYXNlIiwibG9jYWxlTG93ZXIiLCJzdWJzdHIiLCJxdWVyeUluZGV4IiwiaGFzaEluZGV4IiwibG9jYXRpb25PcmlnaW4iLCJnZXRMb2NhdGlvbk9yaWdpbiIsInJlc29sdmVkIiwib3JpZ2luIiwiYXNQYXRobmFtZSIsInF1ZXJ5IiwiaW50ZXJwb2xhdGVkUm91dGUiLCJkeW5hbWljUmVnZXgiLCJnZXRSb3V0ZVJlZ2V4IiwiZHluYW1pY0dyb3VwcyIsImdyb3VwcyIsImR5bmFtaWNNYXRjaGVzIiwiZ2V0Um91dGVNYXRjaGVyIiwiZXZlcnkiLCJwYXJhbSIsInJlcGVhdCIsIm9wdGlvbmFsIiwicmVwbGFjZWQiLCJzZWdtZW50IiwicmVzdWx0Iiwib21pdFBhcm1zRnJvbVF1ZXJ5IiwiZmlsdGVyZWRRdWVyeSIsInJlc29sdmVBcyIsImJhc2UiLCJ1cmxBc1N0cmluZyIsImZvcm1hdFdpdGhWYWxpZGF0aW9uIiwidXJsUHJvdG9NYXRjaCIsInVybEFzU3RyaW5nTm9Qcm90byIsInVybFBhcnRzIiwic3BsaXQiLCJub3JtYWxpemVkVXJsIiwibm9ybWFsaXplUmVwZWF0ZWRTbGFzaGVzIiwiYXNQYXRoIiwiZmluYWxVcmwiLCJpbnRlcnBvbGF0ZWRBcyIsImlzRHluYW1pY1JvdXRlIiwic2VhcmNoUGFyYW1zVG9VcmxRdWVyeSIsImhhc2giLCJzdHJpcE9yaWdpbiIsInByZXBhcmVVcmxBcyIsImhyZWZIYWRPcmlnaW4iLCJhc0hhZE9yaWdpbiIsInByZXBhcmVkVXJsIiwicHJlcGFyZWRBcyIsInJlc29sdmVEeW5hbWljUm91dGUiLCJwYWdlcyIsImNsZWFuUGF0aG5hbWUiLCJkZW5vcm1hbGl6ZVBhZ2VQYXRoIiwic29tZSIsInBhZ2UiLCJyZSIsIm1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uIiwiX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTiIsImhpc3RvcnkiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwibiIsIlNTR19EQVRBX05PVF9GT1VORCIsImZldGNoUmV0cnkiLCJhdHRlbXB0cyIsImNyZWRlbnRpYWxzIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJub3RGb3VuZCIsImZldGNoTmV4dERhdGEiLCJkYXRhSHJlZiIsImlzU2VydmVyUmVuZGVyIiwiUm91dGVyIiwiY29uc3RydWN0b3IiLCJwYXRobmFtZTEiLCJxdWVyeTEiLCJhczEiLCJpbml0aWFsUHJvcHMiLCJwYWdlTG9hZGVyIiwiQXBwIiwid3JhcEFwcCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudDEiLCJlcnIxIiwic3Vic2NyaXB0aW9uIiwiaXNGYWxsYmFjayIsImlzUHJldmlldyIsInNkYyIsInNkciIsIl9pZHgiLCJvblBvcFN0YXRlIiwic3RhdGUiLCJjaGFuZ2VTdGF0ZSIsImdldFVSTCIsIl9fTiIsImZvcmNlZFNjcm9sbCIsImlkeCIsInBhZ2VYT2Zmc2V0IiwieSIsInBhZ2VZT2Zmc2V0IiwiZ2V0SXRlbSIsInBhcnNlIiwicGFyc2VSZWxhdGl2ZVVybCIsImlzU3NyIiwiX2JwcyIsImNoYW5nZSIsIl9zaGFsbG93IiwiY29tcG9uZW50cyIsImluaXRpYWwiLCJfX05fU1NHIiwiX19OX1NTUCIsImF1dG9FeHBvcnREeW5hbWljIiwiX19ORVhUX0RBVEFfXyIsImF1dG9FeHBvcnQiLCJzdWIiLCJjbGMiLCJfd3JhcEFwcCIsImlzUmVhZHkiLCJnc3NwIiwiZ2lwIiwiYXBwR2lwIiwiZ3NwIiwibG9jYXRpb24iLCJzZWFyY2giLCJfX05FWFRfSEFTX1JFV1JJVEVTIiwiX3Nob3VsZFJlc29sdmVIcmVmIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjcm9sbFJlc3RvcmF0aW9uIiwicmVsb2FkIiwiYmFjayIsIm1ldGhvZCIsInNob3VsZFJlc29sdmVIcmVmIiwiX2giLCJwcmV2TG9jYWxlIiwicGFyc2VkQXMiLCJsb2NhbGVQYXRoUmVzdWx0IiwiZGlkTmF2aWdhdGUiLCJhc05vQmFzZVBhdGgiLCJTVCIsInBlcmZvcm1hbmNlIiwibWFyayIsInJvdXRlUHJvcHMiLCJfaW5GbGlnaHRSb3V0ZSIsImFib3J0Q29tcG9uZW50TG9hZCIsImNsZWFuZWRBcyIsImxvY2FsZUNoYW5nZSIsIm9ubHlBSGFzaENoYW5nZSIsImVtaXQiLCJzY3JvbGxUb0hhc2giLCJub3RpZnkiLCJwYXJzZWQiLCJyZXdyaXRlcyIsImdldFBhZ2VMaXN0IiwiX19yZXdyaXRlcyIsInVybElzTmV3IiwicmV3cml0ZXNSZXN1bHQiLCJtYXRjaGVkUGFnZSIsInJvdXRlUmVnZXgiLCJyb3V0ZU1hdGNoIiwic2hvdWxkSW50ZXJwb2xhdGUiLCJtaXNzaW5nUGFyYW1zIiwicmVmMSIsInJvdXRlSW5mbyIsImdldFJvdXRlSW5mbyIsInBhZ2VQcm9wcyIsIl9fTl9SRURJUkVDVCIsImRlc3RpbmF0aW9uIiwicGFyc2VkSHJlZiIsIm5ld1VybCIsIm5ld0FzIiwiX19OX1BSRVZJRVciLCJub3RGb3VuZFJvdXRlIiwiZmV0Y2hDb21wb25lbnQiLCJhcHBDb21wIiwibmV4dCIsImlzUHJlcmVuZGVyZWQiLCJzdGF0dXNDb2RlIiwiaXNWYWxpZFNoYWxsb3dSb3V0ZSIsIl9zY3JvbGwiLCJzaG91bGRTY3JvbGwiLCJyZXNldFNjcm9sbCIsImRvY3VtZW50RWxlbWVudCIsImxhbmciLCJoYW5kbGVSb3V0ZUluZm9FcnJvciIsImxvYWRFcnJvckZhaWwiLCJnaXBFcnIiLCJyb3V0ZUluZm9FcnIiLCJleGlzdGluZ1JvdXRlSW5mbyIsImNhY2hlZFJvdXRlSW5mbyIsIm1vZCIsImlzVmFsaWRFbGVtZW50VHlwZSIsImdldERhdGFIcmVmIiwiX2dldERhdGEiLCJfZ2V0U3RhdGljRGF0YSIsIl9nZXRTZXJ2ZXJEYXRhIiwiZXJyMiIsImJlZm9yZVBvcFN0YXRlIiwib2xkVXJsTm9IYXNoIiwib2xkSGFzaCIsIm5ld1VybE5vSGFzaCIsIm5ld0hhc2giLCJzY3JvbGxUbyIsImlkRWwiLCJnZXRFbGVtZW50QnlJZCIsInNjcm9sbEludG9WaWV3IiwibmFtZUVsIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJwYXRobmFtZTIiLCJfaXNTc2ciLCJpc1NzZyIsImNhbmNlbCIsImNvbXBvbmVudFJlc3VsdCIsImxvYWRQYWdlIiwiY2FjaGVLZXkiLCJyZXNvdXJjZUtleSIsImN0eCIsIkFwcDEiLCJBcHBUcmVlIiwibG9hZEdldEluaXRpYWxQcm9wcyIsIkJyZWFkY3J1bWJJdGVtIiwibGFiZWwiLCJCcmVhZGNydW1iIiwiaXRlbXMiLCJmb3J3YXJkUmVmIiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsIkZpWCIsIkNvbnRhY3RGb3JtIiwic2V0SXNWaXNpYmxlIiwic2V0TG9hZGluZyIsIm9wZW5Db250YWN0Rm9ybSIsImNsb3NlQ29udGFjdEZvcm0iLCJjb250YWN0Rm9ybUNvbnRhaW5lciIsImNsb3NlQnV0dG9uIiwiQnV0dG9uIiwiYmFja2dyb3VuZCIsImlzT3V0bGluZWQiLCJidXR0b25Db250YWluZXIiLCJIZWFkIiwiU0VPIiwidGFiTmFtZSIsIkxpc3RPcHRpb25zIiwiYWN0aXZlSXRlbSIsImxhYmVscyIsIm9uSXRlbUNsaWNrIiwibGlzdE9wdGlvbnNDb250YWluZXIiLCJsaXN0T3B0aW9uIiwiaXNBY3RpdmUiLCJDbGlja2FibGVMaXN0Iiwic2V0QWN0aXZlSXRlbSIsImFwcGx5QW5pbWF0aW9uIiwic2V0QXBwbHlBbmltYXRpb24iLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImNsaWNrYWJsZUxpc3RDb250YWluZXIiLCJsaXN0Q29udGVudCIsImFuaW1hdGUiLCJmaW5kSW5kZXgiLCJGb290ZXIiLCJNZW51IiwiYnJlYWRjcnVtYiIsImNvbnRhY3RGb3JtUmVmIiwiaXNNZW51T3BlbiIsInNldElzTWVudU9wZW4iLCJhY3RpdmVNZW51Iiwic2V0QWN0aXZlTWVudSIsImhhbmRsZU1lbnVBY3RpdmUiLCJvcHRpb24iLCJsb2dvIiwiRGVmYXVsdExheW91dCIsImRlZmF1bHRMYXlvdXRDb250YWluZXIiLCJIb21lVmlldyIsIkhvbWUiLCJnZXRTdGF0aWNQcm9wcyIsIlJlY291cnNlQ2FyZCIsIml0ZW0iLCJjYXRlZ29yeSIsImNyZWF0ZWRBdCIsInRpdGxlIiwicmVzdW1lIiwiUmVjb3Vyc2VMaXN0IiwiaW5kZXgiLCJyZWNvdXJzZUl0ZW1zIiwiQmxvZyIsIkltYWdlIiwiRXhwZXJ0aXNlQnJpbm92IiwiSGVybyIsInNjcm9sbFRvRm9vdGVyIiwiYmVoYXZpb3IiLCJTdWNjZXNzQ2FzZXNEZXBvaW1lbnRzIiwiU3VjY2Vzc0Nhc2VzIiwiQW9zIiwiaW5pdCIsImR1cmF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==