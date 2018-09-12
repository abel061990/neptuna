import pandas as pd
import os

#fonction pour lire les fichiers avec pandas
def read_file(name,file):
    split=os.path.basename(name).split('.')
    if len(split)>1:
        ext=split[1]
        if ext=='csv':

            df = pd.read_csv(file)
        elif ext=='json':
            df = pd.read_json(file)
        elif ext=='sas':
            df = pd.read_sas(file)
        elif ext=='hdf':
            df = pd.read_hdf(file)
        elif ext=='clipboard':
            df = pd.read_clipboard(file)
        elif ext=='stata':
            df = pd.read_stata(file)
        elif ext=='pickle':
            df = pd.read_pickle(file)
        else:
            df = pd.read_excel(file)
    else:
        df=pd.read_table(file)
    return df