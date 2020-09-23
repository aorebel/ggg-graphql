import { res } from "./index.ts";
import { prices } from "../../config/data.ts";

export const newPrice = async(
	productID: any,
	stockID: any,
	barcode: any,
	QR: any,
	unitPrice: any,
	)=>{
	const { $oid: id } = await prices.insertOne({
		productID,
		stockID,
		barcode,
		QR,
		unitPrice,
	});
	const list = await prices.findOne({ _id: { $oid: id } });
	if (list) {
		return await res(list);
	} else {
		return false;
	}
}



export const editPrice = async (
	id: any,
	unitPrice: any,
) => {
	const lists = await prices.updateOne(
		{
			_id: { $oid: id },
		},
		{
			$set: {
				unitPrice: unitPrice,
			},
		},
	);
	const list = await prices.findOne({ _id: { $oid: id } });
	if (list) {
		return await res(list);
	} else {
		return false;
	}
}