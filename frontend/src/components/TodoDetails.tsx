import { TodoTypes } from "../types/interface"
import AppBar from "./AppBar"

const TodoDetails = ({ todo }: { todo: TodoTypes }) => {
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-bold">
                            {todo.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            post on {todo.createdAt.toString().split('T')[0]}
                        </div>
                        <div className="pt-4">
                            {todo.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {todo.createdBy || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TodoDetails;
