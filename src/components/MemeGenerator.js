import React, {Component} from "react"

class MemeGenerator extends Component {

    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const selectImage = this.state.allMemeImgs[randomNumber].url
        this.setState({
        randomImg: selectImage })
    }


    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <label for="topText">Top Text</label>
                    <input type="text" name="topText" value={this.state.topText} placeholder="Top text" onChange={this.handleChange}/>
                    <label for="bottomText">Bottom Text</label>
                    <input type="text" name="bottomText" value={this.state.bottomText} placeholder="Bottom text" onChange={this.handleChange}/>
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }

}

export default MemeGenerator