import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea !bg-white"
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type={"outline"}
            title={"Asking AI..."}
            customStyles={"text-xs"}
          />
        ) : (
          <>
            <CustomButton
              type={"outline"}
              title={"AI Logo"}
              handleClick={() => handleSubmit("logo")}
              customStyles={"text-xs bg-white py-1"}
            />
            <CustomButton
              type={"filled"}
              title={"AI Full"}
              handleClick={() => handleSubmit("full")}
              customStyles={"text-xs py-1"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
