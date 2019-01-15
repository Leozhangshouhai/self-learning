export default {
    rnative: /^[^{]+\{\s*\[native \w/,

    native( target ) {
        return typeof target !== "undefined" && this.rnative.test( target );
    }
};
