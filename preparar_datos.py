"""Crea una copia CSV sin UID, sin nombre original de cuenta y con columnas mínimas.
Uso: python preparar_datos.py archivo_original.csv data/archivo_destino.csv
No vuelve lícita una redistribución que requiera permiso de terceros.
"""
import csv
import hashlib
import secrets
import sys
from pathlib import Path

FIELDS = ['account', 'banner_type', 'pull_number', 'datetime', 'item_name', 'item_category', 'rarity', 'item_id', 'banner_code']

def main():
    if len(sys.argv) != 3:
        raise SystemExit('Uso: python preparar_datos.py ORIGEN.csv DESTINO.csv')
    source, dest = Path(sys.argv[1]), Path(sys.argv[2]); salt=secrets.token_hex(16)
    if source.resolve() == dest.resolve():
        raise SystemExit('No sobrescribas el original: el destino debe ser distinto.')
    dest.parent.mkdir(parents=True,exist_ok=True)
    n=0
    with source.open('r',encoding='utf-8-sig',newline='') as inp, dest.open('w',encoding='utf-8',newline='') as out:
        reader=csv.DictReader(inp)
        if not reader.fieldnames or 'rarity' not in reader.fieldnames:
            raise SystemExit('Formato no compatible: falta rarity')
        writer=csv.DictWriter(out,fieldnames=FIELDS,extrasaction='ignore');writer.writeheader()
        for row in reader:
            identity=str(row.get('uid') or row.get('account') or row.get('profile_key') or 'desconocida')
            # Etiqueta irreversible dentro de esta preparación, sin UID visible.
            row['account']='cuenta_'+hashlib.sha256((salt+'|'+identity).encode()).hexdigest()[:12]
            writer.writerow({f:row.get(f,'') for f in FIELDS});n+=1
    print(f'Preparado: {dest} ({n} registros). Revisar permiso de redistribución antes de publicar.')
if __name__=='__main__':main()
