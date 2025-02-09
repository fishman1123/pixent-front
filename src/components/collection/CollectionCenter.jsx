import { Summarychart } from "../result/SummaryChart.jsx";

export const CollectionCenter = ({ data }) => {
  const firstUser = data.user_report[0];

  return (
    <div>
      <Summarychart
        inputCitrus={firstUser.citrus}
        inputFloral={firstUser.floral}
        inputWoody={firstUser.woody}
        inputMusk={firstUser.musk}
        inputFresh={firstUser.fruity} // Assuming fruity represents fresh
        inputSpicy={firstUser.spicy}
      />
    </div>
  );
};
