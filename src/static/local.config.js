import { v4 as uuidv4 } from 'uuid'

const w = 200
const h = 50
const x_root = 10
const y_root = 250 - h

export const node_default = {
    id      : uuidv4(),
    name    : '最初のメッセージ',
    x       : x_root,
    y       : y_root,
    sender  : 'user',
    type    : 'text',
    body    : 'こんにちは',
    gen     :0,
    active  : false, //クリック状態かどうか
    branch  : 1,
    line    : [{x_srt: x_root + w,
                y_srt: y_root + h/2,
                x_end: x_root + w,
                y_end: y_root + h/2}],
    is_show : true,
    px      : x_root,
    py      : y_root,
    fline   : [0],  //family line 血統
    px_x_2  : x_root*2,
    items   :[
        {text:'文字', value:'text'},
        {text:'画像', value:'picture'},
        {text:'確認型テンプレート', value:'template_confirm'},
        {text:'ボタン型テンプレート', value:'template_button'},
        {text:'カルーセル型テンプレート', value:'template_carousel'},
       ]
}
