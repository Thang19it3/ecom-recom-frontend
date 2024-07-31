import axios from "axios";


const getProvince = async () => {
    try {
         const accessToken = "be71f110-8f9c-11ee-96dc-de6f804954c9";
         const response = await axios.get(
             'https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                 headers: {  
                        token: accessToken,
                 },
             }
         );
          if (response.data) {
              return response.data;
          } else {
              throw new Error('No data received');
          }
    } catch (error) {
        throw new error
    }
};

const getDistrict = async (provinceId) => {
    try {
         const accessToken = "be71f110-8f9c-11ee-96dc-de6f804954c9";
         const response = await axios.get(
             'https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                 headers: {  
                        token: accessToken,
                 },
                 params: {
                     province_id: provinceId,
                 },
             }
         );
          if (response.data) {
              return response.data;
          } else {
              throw new Error('No data received');
          }
    } catch (error) {
        throw new error
    }
};

const getWard = async (districtId) => {
    try {
        const accessToken = "be71f110-8f9c-11ee-96dc-de6f804954c9";
        const response = await axios.get(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                headers: {
                    token: accessToken,
                },
                params: {
                    district_id: districtId,
                },
            }
        );
        if (response.data) {
            return response.data;
        } else {
            throw new Error('No data received');
        }
    } catch (error) {
        throw new error
    }
};

const getServices = async (fromDistrict, toDistrict) => {
    try {
        const accessToken = "be71f110-8f9c-11ee-96dc-de6f804954c9";
        const shopId = 4735274;
        const response = await axios.get(
            'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
                headers: {
                    token: accessToken,
                },
                params: {
                    shop_id: shopId,
                    from_district: fromDistrict,
                    to_district: toDistrict
                },
            }
        );
        if (response.data) {
            return response.data;
        } else {
            throw new Error('No data received');
        }
    } catch (error) {
        throw new error
    }
};

const getShipping = async (serviceId, insuranceValue, fromDistrict, toDistrict, toWard, height, length, weight, width) => {
    try {
        const accessToken = "be71f110-8f9c-11ee-96dc-de6f804954c9";
        const response = await axios.get(
            'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
                headers: {
                    token: accessToken,
                },
                params: {
                    service_id: serviceId,
                    insurance_value: insuranceValue,
                    coupon: null,
                    from_district_id: fromDistrict,
                    to_district_id: toDistrict,
                    to_ward_code: toWard,
                    height: height,
                    length: length,
                    weight: weight,
                    width: width,
                },
            }
        );
        if (response.data) {
            return response.data;
        } else {
            throw new Error('No data received');
        }
    } catch (error) {
        throw new error
    }
};







export const ghtkService = {
    getProvince,
    getDistrict,
    getWard,
    getServices,
    getShipping
}