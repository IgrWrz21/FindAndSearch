import AddNewQuestion from "./AddNewQuestion";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useRef } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { postNewGame } from "../../store/newGameStore/newGamesActions";
import { useDispatch } from "react-redux";
import { newMapDataActions } from "../../store/newMapStore/newMapData";
import { newGameDataActions } from "../../store/newGameStore/newGameData";
import AddNewGameSection from "./AddNewGameSection";

export default function NewGame() {
  const dispatch = useDispatch();
  const gameIdRef = useRef();
  const newGameQuestions = useSelector(
    (state) => state.newGame.newGameQuestions
  );
  const newQuestionsModalRef = useRef();
  const confirmModalRef = useRef();

  function openModalHandler(modalRef) {
    modalRef.current.open();
    dispatch(newMapDataActions.toogleModal());
  }
  function closeModalHandler(modalRef) {
    modalRef.current.close();

    dispatch(newGameDataActions.onCloseModalResets());
    dispatch(newMapDataActions.toogleModal());
  }

  async function addGameToDbHandler() {
    const game = {
      id: gameIdRef.current.value,
      questions: newGameQuestions,
    };

    try {
      closeModalHandler(confirmModalRef);
      await dispatch(postNewGame(game));

      gameIdRef.current.value = "";
    } catch (error) {
      console.error("Failed to post new game:", error);
    }
  }

  return (
    <>
      <Modal ref={newQuestionsModalRef}>
        <button
          className="absolute lg:top-5 lg:right-5 top-2 right-2"
          onClick={() => closeModalHandler(newQuestionsModalRef)}
        >
          <FaRegCircleXmark className="text-3xl text-red-500" />
        </button>
        <AddNewQuestion
          onCloseModal={() => closeModalHandler(newQuestionsModalRef)}
          title="Add New Question"
          editedQuestion={null}
        />
      </Modal>
      <Modal ref={confirmModalRef}>
        <div className="flex flex-wrap justify-center gap-6">
          <h2 className="text-2xl text-center basis-full ">
            Are you sure you want to create a new game with{" "}
            {newGameQuestions.length} questions?
          </h2>
          <Button onClick={addGameToDbHandler}>Yes</Button>
          <Button
            className="bg-red-500 border-none"
            onClick={() => closeModalHandler(confirmModalRef)}
            type="button"
          >
            No
          </Button>
        </div>
      </Modal>
      <AddNewGameSection
        openModalHandler={openModalHandler}
        newQuestionsModalRef={newQuestionsModalRef}
        confirmModalRef={confirmModalRef}
        ref={gameIdRef}
      />
    </>
  );
}
