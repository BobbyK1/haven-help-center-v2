const GoogleSlideEmbed = ({ link }) => {

    return (
        <iframe style={{ marginBottom: "20px" }} src={link} frameBorder="0" width="100%" height="400" allowFullScreen="true" mozAllowFullScreen="true" webkitAllowFullScreen="true"></iframe>
    )
}

export default GoogleSlideEmbed;