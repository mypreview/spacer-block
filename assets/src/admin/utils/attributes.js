const attributes = {
    
    backgroundColor: {
        type: 'string'
    },
    customBackgroundColor: {
        type: 'string'
    },
    ariaLabel: {
        type: 'string'
    },
    dimensions: {
        type: 'object',
        default: {
            width: 300,
            height: 50
        }
    },
    visible: {
        type: 'object',
        default: {
            desktop: false,
            laptop: false,
            tablet: false,
            smartphone: false
        }
    },
    alignment: {
        type: 'object',
        default: {
            desktop: undefined,
            laptop: undefined,
            tablet: undefined,
            smartphone: undefined
        }
    }
    
};

export default attributes;