import { Dialog, Transition } from '@headlessui/react';
import ModalsContext from '../../../../context/Modals/ModalsContext';
import AuthContext from '../../../../context/Auth/AuthContext';
import { PasswordField, InputField } from '../../../Common';
import { Fragment, useContext, useState } from 'react';
import { useApiHelper } from '../../../../utility';

export interface ISignInModal extends React.ComponentPropsWithoutRef<'div'> { }

const SignInModal: React.FC<ISignInModal> = ({ className, ...divProps }) => {
  const { signInModalShow, toggleSignInModal, toggleSignUpModal } =
    useContext(ModalsContext);

  const [formData, setFormData] = useState({});

  const api = useApiHelper();
  const gContext = useContext(AuthContext);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    api
      .login(formData)
      .then((response) => {
        gContext.loginSuccessCB(response);
        toggleSignInModal();
      })
      .catch((err) => {
        gContext.validationErrorCB(err);
      });
  };

  return (
    <>
      <Transition appear show={signInModalShow} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleSignInModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
                  <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-bold leading-6 tracking-tight text-gray-900 md:text-2xl"
                          >
                            Sing In
                          </Dialog.Title>
                          <form
                            className="grid grid-cols-1 gap-5 text-left"
                            action="/"
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            <InputField
                              label="Your Email"
                              type="email"
                              name="email"
                              id="email"
                              placeholder="jondoe@example.com"
                              onChange={handleChange}
                              required
                            />

                            <PasswordField
                              name="password"
                              id="password"
                              placeholder="Your Password"
                              onChange={handleChange}
                            />

                            <button
                              type="submit"
                              className="w-full text-primary-600 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              Sign In
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don't have an account?{' '}
                              <a
                                href="#"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  toggleSignInModal();
                                  toggleSignUpModal();
                                }}
                              >
                                Sign Up here
                              </a>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignInModal;
