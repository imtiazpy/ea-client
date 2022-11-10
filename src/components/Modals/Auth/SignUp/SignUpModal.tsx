import { Dialog, Transition } from '@headlessui/react';
import ModalsContext from '../../../../context/Modals/ModalsContext';
import { PasswordField, InputField } from '../../../Common';
import { Fragment, useContext, useState } from 'react';
import { useApiHelper } from '../../../../utility';
import { useRouter } from 'next/router';
import AuthContext from '../../../../context/Auth/AuthContext';
import { toast } from 'react-toastify';

export interface ISignUpModal extends React.ComponentPropsWithoutRef<'div'> { }

export interface IFormData {
  name: string;
  email: string;
  type: string;
  password: string;
  re_password: string;
}

const SignUpModal: React.FC<ISignUpModal> = ({ className, ...divProps }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'JOB_SEEKER',
    password: '',
    re_password: '',
  });
  const [errorData, setErrorData] = useState('');

  const { signUpModalShow, toggleSignUpModal, toggleSignInModal } =
    useContext(ModalsContext);
  const gContext = useContext(AuthContext);
  const api = useApiHelper();
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    api
      .signUp({ ...formData })
      .then((response) => {
        gContext.handleSignUpSuccess();
        toggleSignUpModal();
      })
      .catch((err) => {
        gContext.validationErrorCB(err);
      });
  };

  return (
    <>
      <Transition appear show={signUpModalShow} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleSignUpModal}>
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
                            Create an account
                          </Dialog.Title>

                          <form
                            className="grid grid-cols-1 gap-5 text-left"
                            action="/"
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            <InputField
                              label="Your Name"
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Your Name..."
                              onChange={handleChange}
                              required
                            />

                            <InputField
                              label="Your Email"
                              type="text"
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

                            <PasswordField
                              name="re_password"
                              id="password"
                              placeholder="Your Password"
                              onChange={handleChange}
                            />

                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="terms"
                                  aria-describedby="terms"
                                  type="checkbox"
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                  required
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="terms"
                                  className="font-light text-gray-500 dark:text-gray-300"
                                >
                                  I accept the{' '}
                                  <a
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    href="#"
                                  >
                                    Terms and Conditions
                                  </a>
                                </label>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="w-full text-primary-600 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Already have an account?{' '}
                              <a
                                href="#"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  toggleSignUpModal();
                                  toggleSignInModal();
                                }}
                              >
                                Login here
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

export default SignUpModal;
