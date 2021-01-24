import NavIcon from '../components/atoms/NavIcon.vue'

/* コンポーネントの設定 */
export default {
    title: 'NavIcon',    // ナビゲーションパネルでの表示名となる
    component: NavIcon,  // 対象となるコンポーネントを定義する
  };
  
/* story記述 */
// default
export const Default = () => ({    // 変数名がナビゲーションパネルでの表示名となる
    components: { NavIcon },  // 対象となるコンポーネントを指定する
    template: '<NavIcon />'  // レンダリングするhtmlを記述する
  });