<template>
    <v-container>
        <div>メッセージID: {{property_id}}</div>
        <div>世代: {{property.gen}}</div>
        <div>送信者: {{property.sender}}</div><br/>
        <v-text-field
            v-model="name_changed"
            label="メッセージ名"
        ></v-text-field>
        <v-textarea
            v-model="body_changed"
            label="本文"
            rows="3"
            v-show="property.gen%2 == 0 ? false : true"
        ></v-textarea>
        <v-select
            label="メッセージ種別"
            v-model="type_changed"
            :items="property.items"
        ></v-select>
        <v-select
            label="ボタン数"
            v-model="branch_changed"
            :items="branch"
            v-show="is_template"
        ></v-select>
        <div v-for="(num, idx) in branch" :key="idx"
             v-show="is_template"> 
            ボタン{{num}}
            <div class="ml-4">
                <v-select
                    label="アクション"
                    :items="property.items_action"
                ></v-select>
                <v-text-field
                    label="ラベル/テキスト"
                ></v-text-field>
            </div>
        </div>
    </v-container>

</template>

<script>
export default {
    name: 'SpecifiedProperty',
    data: () => ({
        branch: [1, 2, 3, 4],
    }),
    computed: {
        property: {
            get() {
                return this.$store.getters.property
            }
        },
        property_id: { // idの文字数を少なくして表示
            get() {
                let _id = this.property.id
                return _id ? _id.substr(0,8) + '...' : ''
            }
        },
        name_changed: {
            get() {
                return this.$store.getters.property.name
            },
            set(name){ //名前が変更された場合
                this.change_property()
                this.$store.dispatch('set_work_name', {name: name})
            }
        },
        body_changed: {
            get() {
                return this.$store.getters.property.body
            },
            set(body){ //本文が変更された場合
                this.change_property()
                this.$store.dispatch('set_work_body', {body: body})
            }
        },
        type_changed: {
            get() {
                return this.$store.getters.property.type
            },
            set(type){ //メッセージ種別が変更された場合
                // テンプレート型かどうかチェック            
                let _is_template = /^template/.test(type) ? "true" : "" //ボタン表示設定
                this.$store.dispatch('is_template', {bool: _is_template})

                switch(type) {
                    case 'text' || 'picture':
                        this.branch = [1]
                        break
                    case 'template_confirm':
                        this.branch = [1, 2]
                        break
                    case 'template_button':
                        this.branch = [1, 2, 3, 4]
                        break
                    case 'template_carousel':
                        this.branch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                       11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                       21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                        break
                    default:
                        this.branch = []
                }
                // this.change_property()
                this.$store.dispatch('set_work_type', {type: type})
            }
        },
        branch_changed: {
            get() {
                return this.$store.getters.property.branch
            },
            set(branch) {
                this.change_property()
                this.$store.dispatch('set_work_branch', {branch: branch})
            }
        },
        is_template: {
            get() {
                return this.$store.getters.is_template
            }
        },

    }
}
</script>
