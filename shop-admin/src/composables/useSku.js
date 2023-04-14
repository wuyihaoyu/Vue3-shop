import {ref } from "vue"

export const goodsId = ref(0)

export const sku_card_list = ref([])

export function initSkuCardList(d){
    sku_card_list.value = d.goodsSkusCard.map(item =>{
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v=>{
            v.text = v.value || "属性值"
            return v
        })
        return item
    })
}

//初始化规格的值
export function initSkusCardItem(id){
    const item = sku_card_list.value.find(o=> o.id==id)
    return{
        item
    }
    
}