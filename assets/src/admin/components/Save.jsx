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
                        [ backgroundColorClass ]: backgroundColorClass,
                        'has-background': backgroundColor || customBackgroundColor,
                        [`hrz-align-dk-${ alignDesktop }`]: alignDesktop,
                        [`hrz-align-lp-${ alignLaptop }`]: alignLaptop,
                        [`hrz-align-tb-${ alignTablet }`]: alignTablet,
                        [`hrz-align-sp-${ alignSmartphone }`]: alignSmartphone,
                        'hide-dk': !! visDesktop,
                        'hide-lp': !! visLaptop,
                        'hide-tb': !! visTablet,
                        'hide-sp': !! visSmartphone
                    }
                ) }
                style={ { 
                    width,
                    height,
                    backgroundColor: backgroundColorClass ? undefined : customBackgroundColor
                } }
            />
        );
	}
};