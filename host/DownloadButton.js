import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

const mapStateToProps = ({ participants, page }) => ({
  participants,
  page
})

class DownloadButton extends Comment {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { participants, page } = this.props
    const fileName = "time_discount_rate.csv"
    const list=[
      ["時間割引率"],
      ["実験日", new Date()],
      ["登録者数", Object.keys(participants).length]
    ]
    const style = { marginLeft: '2%' }
    const disabled = page != "result"
    return (
      <FloatingActionButton
        style={style}
        disabled={disabled}
        onClick={() => {
          var content = list.map(line => line.join(',')).join("\n")
          
          var blob = new Blob([content], {type: 'text/csv'});
          var url = window.URL || window.webkitURL;
          var blobURL = url.createObjectURL(blob);
    
          if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(blob, fileName)
          }
          else{
            var a = document.createElement('a');
            a.download = fileName;
            a.href = blobURL;
            a.click();  
          }
        }
        }
      >
        <FileFileDownload />
      </FloatingActionButton>
    )
  }
}
  
export default connect(mapStateToProps)(DownloadButton) 