function Badge({ variante = "neutre", children }) {
  
  const classe = variante === "neutre" ? "badge" : `badge badge-${variante}`;

  return <span className={classe}>{children}</span>;
}

export default Badge;
