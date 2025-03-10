import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { CustomButton, AIPicker, ColorPicker, FilePicker, Tab } from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const handleClick = (tabName) => {
    if (activeEditorTab === tabName) {
      setActiveEditorTab(null); // Close the tab if it's already active
    } else {
      setActiveEditorTab(tabName); // Otherwise, set it as the active tab
    }
  };

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  // function for AI Picker for generating image
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch("https://api.edenai.run/v2/image/generation", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${import.meta.env.VITE_EDENAI_API_KEY}`,
        },
        body: JSON.stringify({
          response_as_dict: true,
          attributes_as_list: false,
          show_base_64: true,
          show_original_response: false,
          num_images: 1,
          // providers: 'stabilityai,replicate,openai,amazon,leonardo',
          providers: "stabilityai",
          text: prompt,
          resolution: "512x512",
        }),
      });

      const data = await response.json();

      console.log(data.stabilityai.items[0].image);

      handleDecals(type, `data:image/png;base64,${data.stabilityai.items[0].image}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  // 2nd
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  // 3rd
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // Update the activeFilterTab state 4th
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  // 1st
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);

      if (type === "logo") {
        state.isLogoTexture = true;
      } else {
        state.isFullTexture = true;
      }
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div className="absolute top-0 left-0 z-10" {...slideAnimation("left")} key="custom">
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => handleClick(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type={"filled"}
              title={"Go Back"}
              customStyles={"w-fit px-4 py-2.5 font-bold text-sm"}
              handleClick={() => (state.intro = true)}
            />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
            <button className="download-btn" onClick={downloadCanvasToImage}>
              <img src={download} alt="download_image" className="w-3/5 h-3/5 object-contain" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
