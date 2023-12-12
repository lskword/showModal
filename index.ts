import {h, render} from "vue";

interface IModal {
    title?: string
    content: string
    isShowCancel?: boolean
    confirmText?: string
    cancelText?: string
    onSuccess?: () => void
    onCancel?: () => void
}

export function showModal({title = '提示', content, isShowCancel = true, confirmText = '确认', cancelText = '取消', onSuccess, onCancel}: IModal) {
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
        class: 'btn success', onClick: () => {
            if (onSuccess) { onSuccess() }
            close()
        }
    }, {default: () => confirmText})]
    // 是否添加取消按钮
    if (isShowCancel) {
        btns.unshift(h('div', {
            class: 'btn cancel', onClick: () => {
                if (onCancel) { onCancel() }
                close()
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