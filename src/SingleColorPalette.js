import React, { Component } from 'react'
import Navbar from "./Navbar"
import PaletteFooter from "./PaletteFooter"
import ColorBox from "./ColorBox"
import { Link } from 'react-router-dom';
import styles from "./styles/PaletteStyles"
import { withStyles } from "@material-ui/styles"

class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: "hex" };
        this.changeFormat = this.changeFormat.bind(this);
        console.log(this._shades);
    }
    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        // return all shades of given color
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({ format: val });
    }
    render() {
        const { format } = this.state; 
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]}
                showingFullPalette={false} 
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar 
                    handleChange={this.changeFormat} 
                    showingAllColors={false} 
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter 
                    paletteName={paletteName} 
                    emoji={emoji} 
                />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);