
import { carts } from "../../config/data.ts";

export const getCart = async(value:any)=>{
	const list = await carts.find({transID:{$eq:value}})
	return list;
}