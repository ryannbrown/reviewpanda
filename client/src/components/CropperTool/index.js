import ReactDOM from 'react-dom';
import React, {Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.css'

// import './App.css';

export default class CropperTool extends Component {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      aspect: 2/3,
    },
    filename: null,
    croppedImage: []
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result })
        console.log(reader.result)
        this.dataURLtoFile(reader.result, `${this.props.currentUser}.jpg`)
      }
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
      console.log("the crop", crop)
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };


  dataURLtoFile(dataurl, filename) {
      console.log("url", dataurl)
        console.log("filename", filename);
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, {type:mime})
    // this.setState({filename: filename });
    console.log("cropped Image", croppedImage)
    this.setState({croppedImage: croppedImage }) 
}
  

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        `cropped.jpeg`
      );
      this.setState({ croppedImageUrl });
      console.log("the new url", croppedImageUrl)
    }
  }

  getCroppedImg(image, crop, fileName) {
    //   console.log(fileName)
    //   this.setState({
    //       filename: fileName
    //   })
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }

        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            this.dataURLtoFile(reader.result, `${this.props.currentUser}.jpg`)
        }


        console.log("blob", blob)
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
        console.log(this.fileUrl)
    }
      , 'image/jpeg');

     
    });
  }


  handleSubmit = (event) => {
      if (this.state.croppedImage && this.props.currentUser) {
 
      
    event.preventDefault()
    const user = this.props.currentUser
 
    const thisFormData = new FormData()


    thisFormData.append('user', user)
   thisFormData.append('element1', this.state.croppedImage)
   

    var requestOptions = {
        method: 'POST',
        body: thisFormData,
        redirect: 'follow'
    };

    fetch("/api/upload/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    const postItem = () => {
        console.log("posting to DB")
        // POST TO DB
        fetch('/api/addimg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: user + '.jpg',
                uuid: user
            })
        }).then(response => {
            console.log("hey i did it")
            console.log(response)
            if (response.status == '200') {
                this.setState({
                    itemPosted: true
                })
                // possibly better way to do this, but aws link needs to refresh to new one
                // window.location.reload();
                // this.props.toggleCropModal();
            }
        })

    }
    postItem()
      }
}


  componentDidUpdate() {
    //   console.log(this.state)
    //   console.log(this.props)
  }

  componentDidMount() {
    //   console.log("props", this.props)
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="cropper">
        {/* <div> */}
            <div className="crop-back" onClick={this.props.toggleCropModal}><i class="lni lni-arrow-left"> </i>  Back to Profile</div>
            <label for='input-file'><div className="login-btn btn">Upload</div></label>
            <form onSubmit={this.handleSubmit}>
          <input id="input-file" style={{display:'none'}} type="file" accept="image/*" onChange={this.onSelectFile} />
           
        {/* </div> */}
        <div className="cropper-tools">
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
            <div className="crop-container">
                <img className="cropped-img" alt="Crop" style={{borderRadius:'25px' }} src={croppedImageUrl} />
                <button className="login-btn btn" type="submit">Save</button>

            </div>
        )}
        </div>
        </form>
      </div>
    );
  }
}