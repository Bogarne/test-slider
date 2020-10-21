const API = {};

API.getSliderData = (callback) => {
  // MOQ
  const data = [
    {
      title: "image/P_Versa_lockup.png",
      price: "image/P_Versa_price.png",
      variations: [
        {
          image: "image/P_Versa_Pink.png",
          iconOn: "image/P_Versa_Pink_on.png",
          iconOff: "image/P_Versa_Pink_off.png",
        },
        {
          image: "image/P_Versa_Grey.png",
          iconOn: "image/P_Versa_Grey_on.png",
          iconOff: "image/P_Versa_Grey_off.png",
        },
        {
          image: "image/P_Versa_Black.png",
          iconOn: "image/P_Versa_Black_on.png",
          iconOff: "image/P_Versa_Black_off.png",
        },
      ],
    },
    {
      title: "image/P_Charge3_lockup.png",
      price: "image/P_Charge3_price.png",
      variations: [
        {
          image: "image/P_Charge3_Lilac.png",
          iconOn: "image/P_Charge3_Lilac_on.png",
          iconOff: "image/P_Charge3_Lilac_off.png",
        },
        {
          image: "image/P_Charge3_Black.png",
          iconOn: "image/P_Charge3_Black_on.png",
          iconOff: "image/P_Charge3_Black_off.png",
        },
        {
          image: "image/P_Charge3_Blue.png",
          iconOn: "image/P_Charge3_Blue_on.png",
          iconOff: "image/P_Charge3_Blue_off.png",
        },
      ],
    },
    {
      title: "image/P_HR_lockup.png",
      price: "image/P_HR_price.png",
      variations: [
        {
          image: "image/P_HR_White.png",
          iconOn: "image/P_HR_White_on.png",
          iconOff: "image/P_HR_White_off.png",
        },
        {
          image: "image/P_HR_Lilac.png",
          iconOn: "image/P_HR_Lilac_on.png",
          iconOff: "image/P_HR_Lilac_off.png",
        },
        {
          image: "image/P_HR_Black.png",
          iconOn: "image/P_HR_Black_on.png",
          iconOff: "image/P_HR_Black_off.png",
        },
      ],
    },
  ];

  // MOQ Loading...
  setTimeout(() => {
    callback(data);
  }, 100);
};
