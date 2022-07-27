import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";

const RequestFriend = () => {
  return (
    <div>
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mt-5">
        Pending requests
      </h2>

      <div className={" grid lg:grid-cols-3 md:grid-cols-1  gap-4 pt-4"}>
        <div className=" p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pouetozorusrex</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">sa liste de checkbox de ces morts</p>

          <div className={"w-full"}>
            <PrimaryButton>Accept</PrimaryButton>
            <SecondaryButton>Decline</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFriend;
