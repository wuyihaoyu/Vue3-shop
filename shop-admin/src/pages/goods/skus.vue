<template >
    <FormDrawer title="设置商品规格" @submit="submit" destroy-on-close ref="formDrawerRef" size="70%">
        <el-form :model="form">
            <el-form-item label="规格类型">
                <el-radio-group v-model="form.sku_type">
                    <el-radio :label="0">单规格</el-radio>
                    <el-radio :label="1">多规格</el-radio>
                </el-radio-group>
            </el-form-item>
            <template v-if="form.sku_type === 0">
                <el-form-item label="市场价格">
                    <el-input v-model="form.sku_value.oprice" style="35%">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="销售价格">
                    <el-input v-model="form.sku_value.pprice" style="35%">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="成本价格">
                    <el-input v-model="form.sku_value.cprice" style="35%">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="form.sku_value.weight" style="35%">
                        <template #append>公斤</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品体积">
                    <el-input v-model="form.sku_value.volume" style="35%">
                        <template #append>立方米</template>
                    </el-input>
                </el-form-item>
            </template>
            <template v-else>
                <SkuCard />
            </template>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { ref, reactive } from "vue"
import FormDrawer from "~/components/FormDrawer.vue";
import { readGoods, updateGoodsSkus } from "~/api/goods"
import { toast } from "~/composables/util"
import SkuCard from "./components/SkuCard.vue"
import { initSkuCardList, goodsId } from "~/composables/useSku.js"

const formDrawerRef = ref(null)

const form = reactive({
    sku_type: 0,
    "sku_value": {
        "oprice": 0,
        "pprice": 0,
        "cprice": 0,
        "weight": 0,
        "volume": 0
    }
})



const open = (row) => {
    goodsId.value = row.id
    row.skusLoading = true
    readGoods(goodsId.value).then(res => {
        form.sku_type = res.sku_type
        form.sku_value = res.sku_value || {
            "oprice": 0,
            "pprice": 0,
            "cprice": 0,
            "weight": 0,
            "volume": 0
        }
        initSkuCardList(res)
        formDrawerRef.value.open()
    }).finally(() => {
        row.skusLoading = false
    })

}

const emit = defineEmits(["reloadData"])
const submit = () => {
    formDrawerRef.value.showLoading()
    updateGoodsSkus(goodsId.value, form).then(res => {
        toast("设置商品规格成功")
        formDrawerRef.value.close()
        emit("reloadData")

    }).finally(() => {
        formDrawerRef.value.hideLoading()
    })
}

defineExpose({
    open
})
</script>