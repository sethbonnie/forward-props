module.exports = function( receiver, props, provider ) {
  props.forEach(function( prop ) {
    var leProvider;

    if ( typeof provider === 'string' ) {
      leProvider = receiver[provider];

      if ( typeof leProvider[prop] === 'function' ) {
        receiver[prop] = function() {
          leProvider = receiver[provider];
          return leProvider[prop].apply( leProvider, arguments );
        }
      }
      else {
        receiver[prop] = function() {
          leProvider = receiver[provider];
          return leProvider[prop];
        }
      }
    }
    else if ( typeof provider === 'object' ) {
      leProvider = provider;

      if ( typeof leProvider[prop] === 'function' ) {
        receiver[prop] = function() {
          return leProvider[prop].apply( leProvider, arguments );
        }
      }
      else {
        receiver[prop] = function() {
          return leProvider[prop];
        }
      }
    }

    
  });
};