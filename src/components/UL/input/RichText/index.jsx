import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import { useEffect } from "react";
// import 'froala-editor/js/plugins/image.min.js';
// import { _convertHtmlToPlainText } from "../../../utils/htmlToPlainText";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

const config = (setValue, getValues) => ({
    enter: Froalaeditor.ENTER_BR,
    tableStyles: {
        "no-border": "No border"
    },
    charCounterCount: true,
    useClasses: false,
    attribution: false,
    heightMin: 220,
    heightMax: 592,
    widthMax: '100%',
    placeholderText: false,
    linkInsertButtons: [],
    pastePlain: true,
    imageResize: true,
    imageDefaultWidth: '100%',
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    videoResponsive: true,
    toolbarSticky: true,
    toolbarInline: false,
    toolbarVisibleWithoutSelection: true,
    imageManagerDeleteMethod: false,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    toolbarButtons: {
        'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
        },
        'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
        },
        'moreRich': {
            'buttons': ['insertLink', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
        },
        'moreMisc': {
            'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
            'align': 'right',
            'buttonsVisible': 2
        }
    },

    // 'insertImage', 'insertVideo',
    events: {
        initialized: function () {
            replyEditor = this;
        },
        blur: () => {
            // console.log(replyEditor.html.get(true));
        },
        // 'image.beforeUpload': function (e) {
        //     toast.promise(new Promise((resolve, reject) => {
        //         try {
        //             const fd = new FormData()
        //             fd.append('image', e[0])
        //             axios.post(`${import.meta.env.VITE_STORE_API}/upload/image`, fd, {
        //                 headers: {
        //                     "Access-Control-Allow-Origin": "*",
        //                     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        //                 }
        //             })
        //                 .then(res => {
        //                     if (res.data?.url) {
        //                         replyEditor.image.insert(String(res?.data?.url), false, null, replyEditor.image.get())
        //                         resolve('')
        //                     } else {
        //                         reject('')
        //                     }
        //                 })
        //         } catch (error) {
        //             reject(error)
        //         }
        //     }), {
        //         loading: 'Идёт загрузка картинки...',
        //         success: 'Картинка успешно загружена',
        //         error: 'Что-то пошло не так во время загрузки картинки'
        //     })
        // },
        // 'image.inserted': function (img) {
        //     console.log(locale);
        //     const values = getValues()
        //     let descImg = values?.[locale]?.descImg || []
        //     descImg?.push(img?.[0]?.src)
        //     setValue(`${locale}.descImg`, descImg)
        // },
        // 'image.removed': (img) => {
        //     const values = getValues()
        //     let descImg = values?.[locale]?.descImg || []
        //     descImg = descImg?.filter(e => e !== img?.[0]?.currentSrc)
        //     setValue(`${locale}.descImg`, descImg)
        //     axios.delete(`${import.meta.env.VITE_STORE_API}/remove`, { data: { url: img[0]?.currentSrc } })
        // },
        'image.error': () => {

        },
        // 'video.beforeUpload': (e) => {
        //     const file = e[0];
        //     const fd = new FormData()
        //     fd.append('video', file)

        //     axios.post(`${import.meta.env.VITE_STORE_API}/upload/video`, fd, {
        //         headers: {
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        //         }
        //     }).then(res => replyEditor.video.insert(String(res?.data?.url), null, null, replyEditor.video.get()))
        // },
        'paste.beforeCleanup': function (html) {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const elements = temp.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, ul');
            elements.forEach(el => {
                el.removeAttribute('style');
            });
            return temp.innerHTML;
        },

    }
})

let replyEditor = "";
let locale = ''

const RichText = ({
    register,
    setValue = () => { },
    getValues = () => { },

    name = '',
    onChange = () => { },
}) => {
    useEffect(() => {
        // if (import.meta.env.PROD) {
        import('./removeLisence.scss')
        // }
    }, [])
    locale = name?.split('.')?.[0]
    return (
        <>
            {/* <Toaster /> */}
            <FroalaEditor

                onModelChange={(model) => onChange(model)}
                config={config(setValue, getValues)}
                {...register}
            />
        </>
    );
}

export default RichText;