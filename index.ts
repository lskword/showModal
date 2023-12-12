import {h, render} from "vue";
enum modelType {
    title = '提示',
    isShowCancel = 1,
    cancelColor = '#000',
    confirmColor = '#527486',
    confirmText = '确认',
    cancelText = '取消',
    content = '请输入内容'
}

interface IModal {
    title?: string
    content: string
    isShowCancel?: boolean | number
    confirmText?: string
    confirmColor?: string
    cancelText?: string
    cancelColor?: string
    onSuccess?: () => void
    onCancel?: () => void
}

export function showModal({title = modelType.title, content = modelType.content, isShowCancel = modelType.isShowCancel, confirmText = modelType.confirmText, confirmColor = modelType.confirmColor, cancelText = modelType.cancelText, cancelColor = modelType.cancelColor, onSuccess, onCancel}: IModal ) {
    const nameId: string = ('my_phone_model_' + Math.random()).replace('.', '')
    const children = [
        h('div', {class: 'title'}, title),
        h('div', {class: 'content'}, content),
    ]
    const close = () => {
        const element = document.getElementById(nameId);
        if (element) {
            element.parentNode?.removeChild(element);
        }
    }

    let btns: any = [h('div', {
        class: 'btn success',
        style: {color: confirmColor},
        onClick: () => {
            close()
            if (onSuccess) { onSuccess() }
        }
    }, {default: () => confirmText})]
    // 是否添加取消按钮
    if (isShowCancel) {
        btns.unshift(h('div', {
            class: 'btn cancel',
            style: {color: cancelColor},
            onClick: () => {
                close()
                if (onCancel) { onCancel() }
            }
        }, {default: () => cancelText}))
    }
    children.push(h('div', {class: 'btns'}, btns));
    const vnode = h(
        'div',
        {class: 'show_model_box', id: nameId},
        [h('div', {class: 'show_model_content'}, children)]
    )
    render(vnode, document.getElementById('app'))
}