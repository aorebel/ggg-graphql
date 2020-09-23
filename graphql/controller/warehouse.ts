import { warehouses } from "../../config/data.ts";
import { res } from './index.ts';

export const editWarehouse = async(id:any, name: any, inventoryID:any)=>{
	const lists = await warehouses.updateOne(
		{
			_id: {
				$oid: id,
			},
		},
		{
			$set: {
				name: name,
				inventoryID: inventoryID,
			},
		},
	);
	const list = await warehouses.findOne({ _id: { $oid: id } });
	if (list) {
		return { ...list, id: list._id.$oid };
	} else {
		return false;
	}
}

export const newWarehouse = async (name: any, inventoryID: any) =>{
	const { $oid: id } = await warehouses.insertOne({
		name,
		inventoryID,
	});
	return {
		id,
		name,
		inventoryID,
	};
}
export const getWarehouse = async (id: any) => {
	const lists = await warehouses.findOne({ _id: { $oid: id } });
	return lists;
};