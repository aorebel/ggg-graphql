import { res } from "./index.ts";
import {
	products
} from "../../config/data.ts";

export const editProduct = async(id:any,category:any, item:any,brand:any,name:any,color:any,size:any,volume:any,material:any,weight:any,desc:any,status:any)=>{
	const lists = await products.updateOne(
		{
			_id: { $oid: id },
		},
		{
			$set: {
				category,
				item,
				brand,
				name,
				color,
				size,
				volume,
				material,
				weight,
				desc,
				status,
			},
		},
	);
	const list = await products.findOne({ _id: { $oid: id } });
	if (list) {
		return { ...list, id: list._id.$oid };
	} else {
		return false;
	}
}

export const newProduct = async (category:any,
	item: any,
	brand: any,
	name:any,
	model:any,
	serial: any,
	color: any,
	size: any,
	volume: any,
	material: any,
	weight: any,
	desc: any,
	status: any,) => {
	const { $oid: id } = await products.insertOne({
		category,
		item,
		brand,
		name,
		model,
		serial,
		color,
		size,
		volume,
		material,
		weight,
		desc,
		status,
	});
	const list = await products.findOne({ _id: { $oid: id } });
	if (list) {
		return { ...list, id: list._id.$oid };
	} else {
		return false;
	}
}