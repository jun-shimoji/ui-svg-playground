import { v4 as uuidv4 } from 'uuid'

import Vuex from "vuex";
import SpecificProperty from '../components/atoms/SpecificProperty.vue'
// import { store } from "../store/modules/all_nodes.js"

/* コンポーネントの設定 */
export default {
    title: 'SpecificProperty',    // ナビゲーションパネルでの表示名となる
    component: SpecificProperty,  // 対象となるコンポーネントを定義する
  };

/* story記述 */
// default
export const Default = () => {    // 変数名がナビゲーションパネルでの表示名となる
//  const mockStore = new Vuex.Store(store)
  const mockStore = new Vuex.Store(
    {
      state: {
        property: {
          id: uuidv4(),
          name    : 'storybookのメッセージ',
          sender: 'user',
          type    : 'text',
          body    : 'こんにちは',          
          gen: 0,
          items   :[
            {text:'文字', value:'text'},
            {text:'画像', value:'picture'},
            {text:'確認型テンプレート', value:'template_confirm'},
            {text:'ボタン型テンプレート', value:'template_button'},
            {text:'カルーセル型テンプレート', value:'template_carousel'},
           ],
           items_action: ["メッセージ",
           "URI",
           "ポストバック",
           "日時選択",
           "位置情報"],    
        }
      },
      getters: {
        property: state => state.property
      }
    }
  )
  return{
    components: { SpecificProperty },  // 対象となるコンポーネントを指定する
    store: mockStore,
    template: '<SpecificProperty />',  // レンダリングするhtmlを記述する
  }  
// 返り値で new Vuex.Storeをやると失敗する
//    store: new Vuex.Store({
//      namespaced: true,
//      state: {
//        property: {
//          id: 1,
//          gen: 2,
//          sender: 'user'
//        }
//      },
//      getters: {
//        property: state => state.property
//      }
//    })
};
