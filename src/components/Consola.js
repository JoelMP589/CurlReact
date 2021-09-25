import React, { useEffect, useState } from 'react';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import '../assets/css/Terminal.css'
import { useTranslation } from 'react-i18next';
import { CURLParser } from 'parse-curl-js'
import PeticionesService from '../service/PeticionesService';
import { GenerarPDF } from './GenerarPDF';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

export const Consola = () => {

    //Objeto para el PDF
    const [objectTerminal, setObjectTerminal] = useState({});


    //constante para uso de traductor
    const { t } = useTranslation(["translation"]);

    //service para peticiones
    const peticionesService = new PeticionesService();

    const consolaHandler = (text) => {
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'curl':
                const cURLParser = new CURLParser(`${text}`)
                if (cURLParser.parse().method === 'GET') {
                    peticionesService.metodoGet(cURLParser.parse().url).
                        then(res => {
                            TerminalService.emit('response', JSON.stringify(res))
                            setObjectTerminal(res)
                        })
                }
                if (cURLParser.parse().method === 'POST') {
                    peticionesService.metodoPost(cURLParser.parse().url, cURLParser.parse().body.data).then(res => {
                        TerminalService.emit('response', JSON.stringify(res))
                        setObjectTerminal(res)
                    });
                } if (cURLParser.parse().method === 'PUT') {
                    peticionesService.metodoPut(cURLParser.parse().url, cURLParser.parse().body.data).then(res => {
                        TerminalService.emit('response', JSON.stringify(res))
                        setObjectTerminal(res)
                    });
                } if (cURLParser.parse().method === 'DELETE') {
                    peticionesService.metodoDelete(cURLParser.parse().url, cURLParser.parse().body.data).then(res => {
                        TerminalService.emit('response', JSON.stringify(res))
                        setObjectTerminal(res)
                    });
                } else {
                    TerminalService.emit('response', t("Terminal.errormetodo"))
                }

                break;

            case 'clear':
                TerminalService.emit('clear');
                break;

            default:
                TerminalService.emit('response', t("Terminal.error") + command);
                break;
        }
    }

    useEffect(() => {
        TerminalService.on('command', consolaHandler);


        return () => {
            TerminalService.off('command', consolaHandler);
        }
    }, [])

    const isObjEmpty = (obj) => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }

        return true;
    }

    const rightFooterAgregar = (

        <div className="p-inputgroup">
            <div className="p-text-center">
                {isObjEmpty(objectTerminal) ? <></> : <GenerarPDF objectTerminal={objectTerminal} />}
            </div>
        </div>
    );
    const leftFooterLimpiar = (<><Button className="p-mr-2" tooltip={t("boton.limpiar")} onClick={() => setObjectTerminal({})} type="reset" label="Limpiar"> </Button></>);


    const toolbar = <Toolbar left={leftFooterLimpiar} right={rightFooterAgregar}></Toolbar>;

    return (
        <div className="terminal-oitic">
            <div className="card">
                <p>{t("Terminal.instrucciones")} "<strong>{t("Terminal.curl")}</strong>"</p>
                <br />
                <p>{t("Terminal.ejemplo")}</p>
                <Terminal welcomeMessage={t("Terminal.bienvenida")} prompt="JNS $" />
                <div className="p-field  p-col-12 p-md-12">{toolbar}</div>
            </div>
        </div>
    )
}

