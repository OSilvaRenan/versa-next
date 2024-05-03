import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import axios from "axios";
import { useState } from "react";
import { EditoraDTO } from "./EditoraDTO";
import { Button } from "@/components/ui/button";
import { FormEditora } from "./FormEditora";
import { FilePenLine, Pencil } from "lucide-react";

interface Props {
    codeditora?: number;
    className?: React.ComponentProps<"form">;
    setAtualizaLista?: (value: boolean) => void;
    atualizaLista?: boolean;
}

export function DialogCadastroEditora({ codeditora }: Props) {

    const [open, setOpen] = useState(false);
    const [editora, setEditora] = useState<EditoraDTO>();

    const buscaDadosEditora = async () => {

        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/produto/editora/${codeditora}`).then(response => {
            setEditora(response.data);
            setOpen(true);
        });
    };


    function OpenDialog() {

        if (open == false) {
            if (codeditora || codeditora == 0) {
                buscaDadosEditora();
            } else {
                setOpen(true);
            }
        } else {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={OpenDialog} modal={true}>
            <DialogTrigger asChild>
            {codeditora || codeditora == 0 ? 

                <Button className="p-2" variant="ghost"> 
               <Pencil className="p-1"/> 
               </Button>
                :
                <Button className=" min-w-[100px] w-[100px] max-w-[100px]" variant="secondary"> 
               Nova
                </Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={event => event.preventDefault()}>
                <DialogHeader>
                    <DialogTitle> {codeditora || codeditora == 0 ? "Editora " + editora?.Nomeditora : "Nova Editora"} </DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <FormEditora item={editora} />
            </DialogContent>
        </Dialog>
    )
}