import { ElNotification,ElMessageBox} from 'element-plus'
import nProgress from 'nprogress'


//成功提示
export function toast(message,type="success",dangerouslyUseHTMLString=true ){

    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration:3000,
        
      })

}

export function showMoldal(content="提示内容",type="warning",title=""){
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText:"确认",
      cancelButtonText:"取消",
      type, 
    }
  )
}

//弹出输入框
export function showPrompt(tip,value=''){
  return  ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
})

}


//显示全屏loading

export function showFullLoading(){
  nProgress.start()
}

export function hideFullLoading(){
  nProgress.done()
}