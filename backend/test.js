const json = {
  imageurls: [
    '{"href":"https://d18-a.sdn.cz/d_18/c_img_gZ_R/q2oanm.jpeg?fl=res,400,300,3|shr,,20|jpg,90"}',
    '{"href":"https://d18-a.sdn.cz/d_18/c_img_gS_R/oVvLDz.jpeg?fl=res,400,300,3|shr,,20|jpg,90"}',
    '{"href":"https://d18-a.sdn.cz/d_18/c_img_gY_Q/TyOaoO.jpeg?fl=res,400,300,3|shr,,20|jpg,90"}',
    '{"href":"https://d18-a.sdn.cz/d_18/c_img_gU_Q/pK501c.jpeg?fl=res,400,300,3|shr,,20|jpg,90"}',
    '{"href":"https://d18-a.sdn.cz/d_18/c_img_gX_Q/srZa2f.jpeg?fl=res,400,300,3|shr,,20|jpg,90"}',
    '{"href":"https://d18-a.sdn.cz/d_18/c_img_gV_P/zUD06P.jpeg?fl=res,400,300,3|shr,,20|jpg,90"}',
  ],
};

// Extract the href values
const hrefs = json.imageurls.map((imageUrl) => {
  const parsedImageUrl = JSON.parse(imageUrl);
  return parsedImageUrl.href;
});

console.log(hrefs);
