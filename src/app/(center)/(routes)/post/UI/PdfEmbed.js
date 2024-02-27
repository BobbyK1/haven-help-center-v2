

export default function PdfEmbed({ embedLink }) {

    return <iframe src={embedLink} style={{ width: "100%", height: "1000px", marginBottom: "20px"}} />
}