/**
 * Block dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { Component } = wp.element;
const { getColorClassName } = wp.blockEditor;

export default class Save extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { 
			attributes } = this.props;

		const { 
            dimensions,
            visible,
            alignment,
            ariaLabel,
            backgroundColor,
            customBackgroundColor } = attributes;

        // Dimension
        const {
            width,
            height } = dimensions;
        // Visibility
        const {
            desktop: visDesktop,
            laptop: visLaptop,
            tablet: visTablet,
            smartphone: visSmartphone } = visible;
        // Alignment
        const {
            desktop: alignDesktop,
            laptop: alignLaptop,
            tablet: alignTablet,
            smartphone: alignSmartphone } = alignment;

        const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );

        return (
            <hr
                aria-hidden="true"
                aria-label={ ariaLabel ? escape( ariaLabel ) : null }
                className={ classnames(
                    {
                        'has-background': backgroundColor || customBackgroundColor,
                        [ backgroundColorClass ]: backgroundColorClass
                    },
                    alignDesktop ? `hrz-align-dk-${ alignDesktop }` : null,
                    alignLaptop ? `hrz-align-lp-${ alignLaptop }` : null,
                    alignTablet ? `hrz-align-tb-${ alignTablet }` : null,
                    alignSmartphone ? `hrz-align-sp-${ alignSmartphone }` : null,
                    visDesktop ? 'hide-dk' : null,
                    visLaptop ? 'hide-lp' : null,
                    visTablet ? 'hide-tb' : null,
                    visSmartphone ? 'hide-sp' : null
                ) }
                style={ { 
                    width,
                    height,
                    backgroundColor: backgroundColorClass  ?  undefined  :  customBackgroundColor
                } }
            />
        );
	}
};