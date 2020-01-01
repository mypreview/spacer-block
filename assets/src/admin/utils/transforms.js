/**
 * Internal libraries
 */
const { createBlock } = wp.blocks;

const transforms = {
    
    from: [
            {
                type: 'block',
                blocks: [ 'core/spacer' ],
                transform: ( { height } ) => {
                    return createBlock( 'mypreview/spacer', { dimensions: {
                        width: 300,
                        height
                    } } );
                },
            },
            {
                type: 'raw',
                selector: 'div.wp-block-mypreview-spacer',
                schema: {
                    div: {
                        classes: [ 'wp-block-mypreview-spacer' ]
                    },
                },
            }
        ],
    to: [
            {
                type: 'block',
                blocks: [ 'core/spacer' ],
                transform: ( { dimensions } ) => {
                    return createBlock( 'core/spacer', { 
                        height: dimensions.height
                    } );
                },
            }
        ] 
};

export default transforms;