import './main.less'
import Button from '../Button/Button'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios';



const Main = ({fileList, setFileList, ...props}) => {
    const fp = props.fp
    const [disableBtns, setDisableBtns] = useState(false)
    const [currentFile, setCurrentFile] = useState('')
    const filePicker = useRef(null);

    const upload = async (event) => {
        const file = event.target.files[0]
        const formdata = new FormData();
        formdata.append('fp', fp)
        formdata.append('file', file)
        const response = await axios.post('http://190.115.29.135/fileapi/file/', formdata,
        {headers: {
            'Content-Type': 'application/vnd.api+json'
        }})
        const resp = await axios.post('http://190.115.29.135/fileapi/file/downloaddelete/', {
            fp: fp,
            delete: 'no',
            link: ''
        })
        setFileList(Object.entries(resp.data.response))
    }

    const download = () => {
        if(currentFile) {
            let i = ''
            for(i in fileList){
                if(fileList[i][0] === currentFile){
                    window.open(fileList[i][1])
                }
            }
        }
    }

    const deleteFile = async () => {
        if(currentFile) {
            let i = ''
            for(i in fileList){
                if(fileList[i][0] === currentFile){
                    const response = await axios.post('http://190.115.29.135/fileapi/file/downloaddelete/',{
                        fp: fp,
                        delete: 'yes',
                        link: fileList[i][1]
                    })
                    const resp = await axios.post('http://190.115.29.135/fileapi/file/downloaddelete/', {
                        fp: fp,
                        delete: 'no',
                        link: ''
                    })
                    setFileList(Object.entries(resp.data.response))
                }
            }
        }
    }

    const handleClick = () => {
        filePicker.current.click();
    }

    const dragHandler = (e) => {
        e.preventDefault();
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
    }

    const dropHandler = async (e) => {
        e.preventDefault();
        let file = e.dataTransfer.files[0]
        const formdata = new FormData();
        formdata.append('fp', fp)
        formdata.append('file', file)
        const response = await axios.post('http://190.115.29.135/fileapi/file/', formdata,
        {headers: {
            'Content-Type': 'application/vnd.api+json'
        }})
        const resp = await axios.post('http://190.115.29.135/fileapi/file/downloaddelete/', {
            fp: fp,
            delete: 'no',
            link: ''
        })
        setFileList(Object.entries(resp.data.response))
    }

    return (
        <div className="main_wrap"
        onDragStart={e => dragHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragHandler(e)}
        onDrop={e => dropHandler(e)}>
            <div className="disk_buttons">
                <input name="file" type="file" id="input__file" className="hiden" onChange={upload} ref={filePicker}/>
                <Button className="disk_button" disabled={disableBtns} onClick={handleClick}>загрузить</Button>
                <Button className="disk_button" disabled={disableBtns} onClick={download}>скачать</Button>
                <Button className="disk_button delete_button" disabled={disableBtns} onClick={deleteFile}>удалить</Button>
            </div>
            <div className="file_list">
                {fileList.map((file) =>
                <div className={['file', currentFile === file[0] ? 'current' : ''].join(' ')} key={file[0]} onClick={() => setCurrentFile(file[0])}>
                    <p className="filename">{file[0]}</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default Main