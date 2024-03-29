import exp from "constants"
import {ref } from "vue"
import { createGoodsSkusCard,updateGoodsSkusCard,deleteGoodsSkusCard } from "~/api/goods.js"

import {useArrayMoveUp,useArrayMoveDown} from "~/composables/util"
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
//添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent(){
    btnLoading.value = true
    createGoodsSkusCard({
        goods_id:goodsId.value,
        name:"规格选项",
        order:50,
        type:0
    }).then(res=>{
          sku_card_list.value.push({
            ...res,
            text:res.name,
            loading:false,
            goodsSkusCardValue:[]
          })
    }).finally(()=>{

        btnLoading.value = false
    })
}
//修改规格选项
export function handleUpdate(item){
    item.loading = true
    updateGoodsSkusCard(item.id,{
        "goods_id":item.goods_id,
        "name":item.text,
        "order":item.order,
        "type":0
    }).then(res=>{
         item.name = item.text
    }).catch(err=>{
         item.text = item.name
    }).finally(()=>{
      item.loading = false
    })
}
//删除规格选项
export function handleDelete(item){
    item.loading = true
    deleteGoodsSkusCard(item.id).then(res=>{
        const i = sku_card_list.value.findIndex(o=>o.id==item.id)
        if(i!=-1){
            sku_card_list.value.splice(i,1)
        }
    })
}

//排序规格选项
export function sortCard(action,index){
    if(action=="up"){
        useArrayMoveUp(sku_card_list.value,index)
    }else{
        useArrayMoveDown(sku_card_list.value,index)
    }
    
}
//初始化规格的值
export function initSkusCardItem(id){
    const item = sku_card_list.value.find(o=> o.id==id)
    return{
        item
    }
    
}

