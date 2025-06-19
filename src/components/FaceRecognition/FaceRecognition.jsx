import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {


    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' src={imageUrl ? imageUrl : null} alt="" width='500px' height='auto'/>
                <div className="bounding-box"
                    style={{
                        right: box.rightCol,
                        left: box.leftCol,
                        bottom: box.bottomRow,
                        top: box.topRow
                    }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;