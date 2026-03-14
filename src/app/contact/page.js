import Wrapper from "@/components/Wrapper";
import InputItem from "@/components/InputItem";

const Contact = () => {
  return (
    <Wrapper>
      <div className="radial h-150 rounded-[20px] flex flex-col w-full px-20 py-16.5 justify-between">
        <div className="flex flex-col gap-4.5">
          <h1 className="text-white">CВЯЗАТЬСЯ С НАМИ</h1>
          <div className="flex flex-col w-full max-w-122 gap-3.75 text-[15px]">
            <span className="text-white">
              Мы будем рады любым предложениям по данному проекту. Напишите нам
              сами или оставьте свою почту ниже для получения обратной связи от
              нашей команды.
            </span>
          </div>
        </div>
        <form className="flex gap-6 items-center">
          <InputItem
            placeholder="Ваша почта"
            type="email"
            className="w-137.5"
          />
          <button type="submit">
            <svg
              width="29"
              height="41"
              viewBox="0 0 29 41"
              fill="none"
              className="text-white/60 hover:text-white"
            >
              <path
                d="M3.5 3.5L23 21L3.5 37"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Contact;
